#!/usr/bin/env python3
"""
Database initialization script for Valkyrie
Creates tables and initial data for PostgreSQL
"""

import os
import sys
import asyncio
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.db import Base, get_db
from app.models import User, Project, ProjectMembership, File, Folder
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database URL from environment or default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://valkyrie:valkyrie123@localhost:5432/valkyrie")

async def init_database():
    """Initialize the database with tables and initial data"""
    try:
        # Create engine
        engine = create_engine(DATABASE_URL)
        
        # Create all tables
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("✅ Database tables created successfully")
        
        # Create session
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
        try:
            # Check if users already exist
            existing_users = db.query(User).first()
            if existing_users:
                logger.info("✅ Database already initialized")
                return
            
            # Create initial users
            logger.info("Creating initial users...")
            
            # CEO User
            ceo_user = User(
                name="System Administrator",
                email="admin@valkyrie.com",
                role="ceo",
                api_key="ceo-admin-key-12345",
                organization="Valkyrie Systems"
            )
            db.add(ceo_user)
            
            # Editor User
            editor_user = User(
                name="Project Manager",
                email="pm@valkyrie.com", 
                role="editor",
                api_key="editor-pm-key-12345",
                organization="Valkyrie Systems"
            )
            db.add(editor_user)
            
            # Viewer User
            viewer_user = User(
                name="Team Member",
                email="viewer@valkyrie.com",
                role="viewer", 
                api_key="viewer-team-key-12345",
                organization="Valkyrie Systems"
            )
            db.add(viewer_user)
            
            # Create initial projects
            logger.info("Creating initial projects...")
            
            project1 = Project(
                name="Apollo",
                description="Main project for file management",
                created_by=ceo_user.id
            )
            db.add(project1)
            
            project2 = Project(
                name="Zephyr", 
                description="Secondary project for testing",
                created_by=ceo_user.id
            )
            db.add(project2)
            
            # Commit users and projects first
            db.commit()
            
            # Create project memberships
            logger.info("Creating project memberships...")
            
            # CEO has access to all projects
            ceo_membership1 = ProjectMembership(
                user_id=ceo_user.id,
                project_id=project1.id,
                role="admin"
            )
            db.add(ceo_membership1)
            
            ceo_membership2 = ProjectMembership(
                user_id=ceo_user.id,
                project_id=project2.id,
                role="admin"
            )
            db.add(ceo_membership2)
            
            # Editor has access to Apollo
            editor_membership = ProjectMembership(
                user_id=editor_user.id,
                project_id=project1.id,
                role="editor"
            )
            db.add(editor_membership)
            
            # Viewer has read access to Zephyr
            viewer_membership = ProjectMembership(
                user_id=viewer_user.id,
                project_id=project2.id,
                role="viewer"
            )
            db.add(viewer_membership)
            
            # Create sample folders
            logger.info("Creating sample folders...")
            
            sample_folders = [
                Folder(name="Documents", project_id=project1.id, created_by=ceo_user.id),
                Folder(name="Images", project_id=project1.id, created_by=ceo_user.id),
                Folder(name="Videos", project_id=project1.id, created_by=ceo_user.id),
                Folder(name="Archives", project_id=project2.id, created_by=ceo_user.id),
            ]
            
            for folder in sample_folders:
                db.add(folder)
            
            # Commit all changes
            db.commit()
            
            logger.info("✅ Database initialized successfully!")
            logger.info(f"Created {len([ceo_user, editor_user, viewer_user])} users")
            logger.info(f"Created {len([project1, project2])} projects") 
            logger.info(f"Created {len(sample_folders)} sample folders")
            
        except Exception as e:
            db.rollback()
            logger.error(f"❌ Error during database initialization: {e}")
            raise
        finally:
            db.close()
            
    except Exception as e:
        logger.error(f"❌ Failed to initialize database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(init_database())
