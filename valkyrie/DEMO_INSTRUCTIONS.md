# 🌐 Valkyrie Network Demo Instructions

## 🚀 **Quick Start**

### **1. Start the Demo Server**
```bash
cd /Users/adeljumaily/Desktop/odin/valkyrie
./start_network_demo.sh
```

### **2. Share with Your Friend**
The script will display your IP address. Share this URL with your friend:
```
http://YOUR_IP_ADDRESS:3001
```

## 📋 **Demo Flow**

### **For New Users (Your Friend):**

1. **Setup Process**:
   - Enter personal information (name, email)
   - Enter organization details
   - Create a master password
   - Get generated API keys (CEO, Editor, Viewer, Admin)

2. **Login**:
   - Use the CEO API key to login
   - Access the file management dashboard

3. **File Management**:
   - Upload files to the system
   - Create folders and organize files
   - View storage usage and profile

### **For You (Server Owner):**

1. **Monitor Users**:
   - Check `/Volumes/*/valkyrie_user_data/` for user data
   - View API documentation at `http://YOUR_IP:6789/docs`
   - Monitor storage usage

2. **Storage Management**:
   - User data is saved to external SSD
   - Each user gets their own directory
   - Files are organized by user ID

## 🔧 **Technical Details**

### **Network Configuration**:
- **Frontend**: Port 3001 (accessible from network)
- **Backend**: Port 6789 (accessible from network)
- **Database**: PostgreSQL on port 5432 (local only)

### **Data Storage**:
- **Location**: `/Volumes/*/valkyrie_user_data/`
- **Structure**: Each user gets a unique directory
- **Files**: User info, API keys, uploaded files

### **API Endpoints**:
- `POST /api/save-user-data` - Save user setup data
- `GET /api/user-data/{user_id}` - Retrieve user data
- `GET /api/storage-info` - Get storage information
- `POST /api/upload-file/{user_id}` - Upload files

## 🛠️ **Troubleshooting**

### **If External SSD Not Found**:
- Make sure your external SSD is connected
- Check mount point: `ls /Volumes/`
- Data will fallback to local directory if SSD not found

### **If Friend Can't Access**:
- Check firewall settings
- Ensure both devices are on same network
- Try accessing from your own device first

### **If Backend Fails**:
- Make sure Docker is running
- Check PostgreSQL container: `docker ps`
- Restart the script

## 📱 **Demo Scenarios**

### **Scenario 1: New User Onboarding**
1. Friend visits your URL
2. Goes through setup process
3. Gets API keys
4. Logs in and uploads files

### **Scenario 2: Multi-User Demo**
1. Multiple friends can access simultaneously
2. Each gets their own user directory
3. Show storage management
4. Demonstrate file sharing

### **Scenario 3: Storage Management**
1. Show external SSD storage
2. Demonstrate user data organization
3. Show file upload/download
4. Display storage statistics

## 🔒 **Security Features**

- **API Key Authentication**: Each user gets unique keys
- **Role-Based Access**: CEO, Editor, Viewer, Admin roles
- **Master Password**: Encrypts user data
- **External Storage**: Data stays on your hardware
- **Network Isolation**: Only accessible on your network

## 📊 **Monitoring**

### **Check Active Users**:
```bash
ls /Volumes/*/valkyrie_user_data/
```

### **Check Storage Usage**:
```bash
du -sh /Volumes/*/valkyrie_user_data/
```

### **View API Logs**:
The backend server will show all API requests in the terminal.

## 🎯 **Demo Tips**

1. **Prepare Sample Files**: Have some test files ready to upload
2. **Show API Keys**: Demonstrate the different access levels
3. **Storage Demo**: Show how data is organized on the SSD
4. **Multi-User**: Have multiple people try it simultaneously
5. **Mobile Access**: Test on mobile devices too

## 🚨 **Important Notes**

- **Data Privacy**: All data stays on your hardware
- **Network Security**: Only accessible on your local network
- **Backup**: Consider backing up the external SSD
- **Performance**: Performance depends on your network speed
- **Scalability**: This is a demo setup, not production-ready

## 📞 **Support**

If you encounter issues:
1. Check the terminal output for errors
2. Verify Docker is running
3. Ensure external SSD is connected
4. Check network connectivity
5. Restart the demo script

---

**Happy Demo! 🎉**
