#!/usr/bin/env python3
"""
Simple test script for Valkyrie system
"""
import requests
import json
import time

# Test configuration
API_BASE = "http://localhost:6789"
API_KEY = "ceo-key-123"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{API_BASE}/health")
        if response.status_code == 200:
            print("✅ Health check passed:", response.json())
            return True
        else:
            print("❌ Health check failed:", response.status_code)
            return False
    except Exception as e:
        print("❌ Health check error:", e)
        return False

def test_api_docs():
    """Test API documentation"""
    print("🔍 Testing API documentation...")
    try:
        response = requests.get(f"{API_BASE}/docs")
        if response.status_code == 200:
            print("✅ API docs accessible")
            return True
        else:
            print("❌ API docs failed:", response.status_code)
            return False
    except Exception as e:
        print("❌ API docs error:", e)
        return False

def test_list_endpoints():
    """Test list endpoints"""
    print("🔍 Testing list endpoints...")
    try:
        headers = {"x-api-key": API_KEY}
        response = requests.get(f"{API_BASE}/api/list", headers=headers)
        if response.status_code == 200:
            data = response.json()
            print("✅ List endpoint works:", data)
            return True
        else:
            print("❌ List endpoint failed:", response.status_code, response.text)
            return False
    except Exception as e:
        print("❌ List endpoint error:", e)
        return False

def test_frontend():
    """Test frontend accessibility"""
    print("🔍 Testing frontend...")
    try:
        response = requests.get("http://localhost:3000")
        if response.status_code == 200:
            print("✅ Frontend accessible")
            return True
        else:
            print("❌ Frontend failed:", response.status_code)
            return False
    except Exception as e:
        print("❌ Frontend error:", e)
        return False

def main():
    print("🚀 Starting Valkyrie System Test")
    print("=" * 50)
    
    # Wait a moment for services to be ready
    print("⏳ Waiting for services to start...")
    time.sleep(2)
    
    tests = [
        test_health,
        test_api_docs,
        test_list_endpoints,
        test_frontend
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Valkyrie system is working correctly.")
        print("\n📍 Access Information:")
        print("• Frontend: http://localhost:3000")
        print("• Backend API: http://localhost:6789")
        print("• API Documentation: http://localhost:6789/docs")
        print("• Health Check: http://localhost:6789/health")
    else:
        print("⚠️  Some tests failed. Check the logs above for details.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
