#!/usr/bin/env python3
"""
Test script for Valkyrie file upload without API key
This demonstrates how to upload files using the web interface
"""
import requests
import json
import os

def test_web_interface():
    """Test the web interface accessibility"""
    print("🔍 Testing web interface...")
    try:
        response = requests.get("http://localhost:3000")
        if response.status_code == 200:
            print("✅ Web interface is accessible")
            print("📍 Open http://localhost:3000 in your browser")
            print("🔐 Login with: admin / admin123")
            return True
        else:
            print("❌ Web interface not accessible")
            return False
    except Exception as e:
        print(f"❌ Error accessing web interface: {e}")
        return False

def test_api_without_key():
    """Test API endpoints that don't require authentication"""
    print("🔍 Testing public API endpoints...")
    
    # Test health endpoint
    try:
        response = requests.get("http://localhost:6789/health")
        if response.status_code == 200:
            print("✅ Health endpoint working")
        else:
            print("❌ Health endpoint failed")
    except Exception as e:
        print(f"❌ Health endpoint error: {e}")
    
    # Test API documentation
    try:
        response = requests.get("http://localhost:6789/docs")
        if response.status_code == 200:
            print("✅ API documentation accessible")
            print("📍 Open http://localhost:6789/docs in your browser")
        else:
            print("❌ API documentation failed")
    except Exception as e:
        print(f"❌ API documentation error: {e}")

def create_test_files():
    """Create test files for upload"""
    print("📁 Creating test files...")
    
    test_files = [
        ("test-document.txt", "This is a test document for Valkyrie file manager.\nIt contains some sample text to test file upload functionality."),
        ("test-data.json", '{"name": "Test Data", "type": "JSON", "content": "Sample JSON file for testing"}'),
        ("test-code.py", "#!/usr/bin/env python3\nprint('Hello from Valkyrie!')\n# This is a test Python file")
    ]
    
    for filename, content in test_files:
        try:
            with open(f"/tmp/{filename}", "w") as f:
                f.write(content)
            print(f"✅ Created {filename}")
        except Exception as e:
            print(f"❌ Failed to create {filename}: {e}")

def show_upload_instructions():
    """Show instructions for manual file upload"""
    print("\n" + "="*60)
    print("📤 MANUAL FILE UPLOAD INSTRUCTIONS")
    print("="*60)
    print()
    print("1. 🌐 Open your web browser")
    print("2. 🔗 Go to: http://localhost:3000")
    print("3. 🔐 Login with:")
    print("   Username: admin")
    print("   Password: admin123")
    print("4. 📁 Click 'Upload Files' button")
    print("5. 📂 Select files from /tmp/ directory:")
    print("   - test-document.txt")
    print("   - test-data.json") 
    print("   - test-code.py")
    print("6. 🏷️  Choose project: Apollo")
    print("7. ⬆️  Click 'Upload'")
    print()
    print("📋 Test files created in /tmp/ directory")
    print("🗂️  Files will be encrypted and stored securely")
    print()

def main():
    print("🚀 Valkyrie File Manager - Test Without API Key")
    print("=" * 60)
    
    # Test web interface
    web_ok = test_web_interface()
    print()
    
    # Test API endpoints
    test_api_without_key()
    print()
    
    # Create test files
    create_test_files()
    print()
    
    # Show upload instructions
    show_upload_instructions()
    
    if web_ok:
        print("🎉 System is ready for testing!")
        print("📍 Web Interface: http://localhost:3000")
        print("📚 API Docs: http://localhost:6789/docs")
    else:
        print("⚠️  Please ensure the system is running:")
        print("   Backend: http://localhost:6789")
        print("   Frontend: http://localhost:3000")

if __name__ == "__main__":
    main()
