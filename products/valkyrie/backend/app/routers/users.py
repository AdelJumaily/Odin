from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any
import json
import os
from datetime import datetime
import uuid

router = APIRouter()

# Configuration for external SSD
EXTERNAL_SSD_PATH = "/Volumes"  # macOS default external drive mount point
USER_DATA_DIR = "valkyrie_user_data"

class UserData(BaseModel):
    name: str
    organization: str
    email: str
    masterPassword: str
    apiKeys: Dict[str, str]
    setupDate: str
    id: str

def get_external_ssd_path():
    """Find the external SSD mount point"""
    if os.path.exists(EXTERNAL_SSD_PATH):
        # Look for mounted drives
        drives = [d for d in os.listdir(EXTERNAL_SSD_PATH) 
                 if os.path.isdir(os.path.join(EXTERNAL_SSD_PATH, d))]
        
        # Prefer drives with 'SSD' in the name, or use the first available
        ssd_drives = [d for d in drives if 'SSD' in d.upper()]
        if ssd_drives:
            return os.path.join(EXTERNAL_SSD_PATH, ssd_drives[0])
        elif drives:
            return os.path.join(EXTERNAL_SSD_PATH, drives[0])
    
    # Fallback to a local directory if no external drive found
    fallback_path = os.path.join(os.getcwd(), "user_data")
    os.makedirs(fallback_path, exist_ok=True)
    return fallback_path

def ensure_user_data_directory():
    """Ensure the user data directory exists on the external SSD"""
    ssd_path = get_external_ssd_path()
    user_data_path = os.path.join(ssd_path, USER_DATA_DIR)
    os.makedirs(user_data_path, exist_ok=True)
    return user_data_path

@router.post("/save-user-data")
async def save_user_data(user_data: UserData):
    """Save user data to external SSD"""
    try:
        # Ensure directory exists
        user_data_dir = ensure_user_data_directory()
        
        # Create user-specific directory
        user_dir = os.path.join(user_data_dir, user_data.id)
        os.makedirs(user_dir, exist_ok=True)
        
        # Save user data
        user_file = os.path.join(user_dir, "user_info.json")
        with open(user_file, 'w') as f:
            json.dump(user_data.dict(), f, indent=2)
        
        # Create user's file storage directory
        files_dir = os.path.join(user_dir, "files")
        os.makedirs(files_dir, exist_ok=True)
        
        # Create user's projects directory
        projects_dir = os.path.join(user_dir, "projects")
        os.makedirs(projects_dir, exist_ok=True)
        
        # Save API keys separately for easy access
        keys_file = os.path.join(user_dir, "api_keys.json")
        with open(keys_file, 'w') as f:
            json.dump(user_data.apiKeys, f, indent=2)
        
        return {
            "success": True,
            "message": "User data saved successfully to external SSD",
            "user_id": user_data.id,
            "storage_path": user_dir
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save user data: {str(e)}"
        )

@router.get("/user-data/{user_id}")
async def get_user_data(user_id: str):
    """Retrieve user data from external SSD"""
    try:
        user_data_dir = ensure_user_data_directory()
        user_dir = os.path.join(user_data_dir, user_id)
        user_file = os.path.join(user_dir, "user_info.json")
        
        if not os.path.exists(user_file):
            raise HTTPException(status_code=404, detail="User not found")
        
        with open(user_file, 'r') as f:
            user_data = json.load(f)
        
        return user_data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve user data: {str(e)}"
        )

@router.get("/storage-info")
async def get_storage_info():
    """Get information about external SSD storage"""
    try:
        ssd_path = get_external_ssd_path()
        user_data_dir = ensure_user_data_directory()
        
        # Get disk usage
        total, used, free = os.statvfs(ssd_path)[:3]
        total_gb = (total * 4) / (1024**3)
        used_gb = ((total - free) * 4) / (1024**3)
        free_gb = (free * 4) / (1024**3)
        
        # Count users
        user_count = 0
        if os.path.exists(user_data_dir):
            user_count = len([d for d in os.listdir(user_data_dir) 
                            if os.path.isdir(os.path.join(user_data_dir, d))])
        
        return {
            "ssd_path": ssd_path,
            "user_data_directory": user_data_dir,
            "disk_usage": {
                "total_gb": round(total_gb, 2),
                "used_gb": round(used_gb, 2),
                "free_gb": round(free_gb, 2),
                "usage_percentage": round((used_gb / total_gb) * 100, 2)
            },
            "user_count": user_count
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get storage info: {str(e)}"
        )

@router.post("/upload-file/{user_id}")
async def upload_file(user_id: str, file_data: dict):
    """Upload a file to user's directory on external SSD"""
    try:
        user_data_dir = ensure_user_data_directory()
        user_dir = os.path.join(user_data_dir, user_id, "files")
        
        # Create file path
        filename = file_data.get("filename")
        file_path = os.path.join(user_dir, filename)
        
        # Save file content (in real implementation, you'd handle file uploads properly)
        with open(file_path, 'w') as f:
            f.write(file_data.get("content", ""))
        
        return {
            "success": True,
            "message": f"File {filename} uploaded successfully",
            "file_path": file_path
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload file: {str(e)}"
        )
