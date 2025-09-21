import React, { useState, useEffect } from 'react';
import { X, User, Mail, Building, Shield, Settings, LogOut, Camera, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';
import { calculateStorageUsage, getStorageStatus } from '../utils/storage';

const ProfileModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    organization: 'Acme Corp',
    role: 'Administrator',
    avatar: null
  });
  const [storageInfo, setStorageInfo] = useState({
    used: '0 B',
    total: '10 GB',
    percentage: 0,
    status: 'excellent'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    fileUpload: true,
    securityAlerts: false
  });
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('valkyrie-profile', JSON.stringify(profile));
      localStorage.setItem('valkyrie-notifications', JSON.stringify(notifications));
      
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.new.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordSuccess(true);
      setPasswordForm({ current: '', new: '', confirm: '' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      setPasswordError('Failed to update password. Please try again.');
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('valkyrie-profile');
    localStorage.removeItem('valkyrie-notifications');
    localStorage.removeItem('valkyrie-files');
    localStorage.removeItem('valkyrie-folders');
    
    onClose();
  };

  // Load saved data and calculate storage usage
  useEffect(() => {
    // Load profile data
    const savedProfile = localStorage.getItem('valkyrie-profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    // Load notification settings
    const savedNotifications = localStorage.getItem('valkyrie-notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Calculate storage usage
    const savedFiles = localStorage.getItem('valkyrie-files');
    if (savedFiles) {
      const files = JSON.parse(savedFiles);
      const storage = calculateStorageUsage(files);
      const status = getStorageStatus(storage.percentage);
      setStorageInfo({
        used: storage.used,
        total: storage.total,
        percentage: storage.percentage,
        status: status
      });
    }
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="profile-modal-content w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden rounded-2xl">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 profile-glass-panel p-6 rounded-l-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-red-primary">Account</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110 profile-hazy-glow"
              >
                <X className="w-5 h-5 text-gray-300 hover:text-white" />
              </button>
            </div>

            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm profile-hazy-glow ${
                    activeTab === tab.id 
                      ? 'bg-red-primary text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto profile-glass-panel rounded-r-2xl">
            {activeTab === 'profile' && (
              <div className="profile-tab-content">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-200">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-primary"
                    disabled={isSaving}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {saveMessage && (
                  <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                    saveMessage.includes('successfully') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {saveMessage.includes('successfully') ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm">{saveMessage}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 profile-glass-card rounded-full flex items-center justify-center backdrop-blur-sm profile-hazy-glow">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                        ) : (
                          <User className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 glass-button text-white p-2 rounded-full hover:scale-110 transition-all duration-300 profile-hazy-glow">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-200">{profile.name}</h4>
                      <p className="text-gray-400">{profile.role}</p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        disabled={!isEditing}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                      <input
                        type="text"
                        value={profile.organization}
                        onChange={(e) => setProfile({...profile, organization: e.target.value})}
                        disabled={!isEditing}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                      <input
                        type="text"
                        value={profile.role}
                        disabled
                        className="input bg-gray-700"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn btn-secondary"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="btn btn-primary flex items-center space-x-2"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Storage Information */}
                  <div className="profile-glass-card p-6 rounded-xl profile-hazy-glow">
                    <div className="flex items-center space-x-3 mb-4">
                      <HardDrive className="w-6 h-6 text-red-primary" />
                      <h4 className="text-lg font-semibold text-gray-200">Storage Usage</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Used: {storageInfo.used}</span>
                        <span className="text-gray-400">Total: {storageInfo.total}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            storageInfo.status === 'critical' ? 'bg-red-500' :
                            storageInfo.status === 'warning' ? 'bg-yellow-500' :
                            storageInfo.status === 'good' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className={`${
                          storageInfo.status === 'critical' ? 'text-red-400' :
                          storageInfo.status === 'warning' ? 'text-yellow-400' :
                          storageInfo.status === 'good' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                          {storageInfo.status.charAt(0).toUpperCase() + storageInfo.status.slice(1)}
                        </span>
                        <span className="text-gray-500">{storageInfo.percentage.toFixed(1)}% used</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="profile-tab-content">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">Security Settings</h3>
                <div className="space-y-6">
                  <div className="profile-glass-card p-6 rounded-xl profile-hazy-glow">
                    <h4 className="text-lg font-semibold text-gray-200 mb-4">Change Password</h4>
                    
                    {passwordSuccess && (
                      <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Password updated successfully!</span>
                      </div>
                    )}

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                        <input 
                          type="password" 
                          className="input" 
                          value={passwordForm.current}
                          onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <input 
                          type="password" 
                          className="input" 
                          value={passwordForm.new}
                          onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                          required
                          minLength={8}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="input" 
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                          required
                        />
                      </div>
                      
                      {passwordError && (
                        <div className="flex items-center space-x-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{passwordError}</span>
                        </div>
                      )}

                      <button type="submit" className="btn btn-primary">
                        Update Password
                      </button>
                    </form>
                  </div>

                  <div className="profile-glass-card p-6 rounded-xl profile-hazy-glow">
                    <h4 className="text-lg font-semibold text-gray-200 mb-4">Two-Factor Authentication</h4>
                    <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                    <button className="btn btn-secondary">Enable 2FA</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="profile-tab-content">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div className="profile-glass-card p-6 rounded-xl profile-hazy-glow">
                    <h4 className="text-lg font-semibold text-gray-200 mb-4">Notifications</h4>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded w-4 h-4 text-red-primary bg-gray-700 border-gray-600 focus:ring-red-primary focus:ring-2" 
                          checked={notifications.email}
                          onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                        />
                        <span className="text-gray-300">Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded w-4 h-4 text-red-primary bg-gray-700 border-gray-600 focus:ring-red-primary focus:ring-2" 
                          checked={notifications.fileUpload}
                          onChange={(e) => setNotifications({...notifications, fileUpload: e.target.checked})}
                        />
                        <span className="text-gray-300">File upload notifications</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded w-4 h-4 text-red-primary bg-gray-700 border-gray-600 focus:ring-red-primary focus:ring-2" 
                          checked={notifications.securityAlerts}
                          onChange={(e) => setNotifications({...notifications, securityAlerts: e.target.checked})}
                        />
                        <span className="text-gray-300">Security alerts</span>
                      </label>
                    </div>
                    <button 
                      onClick={() => {
                        localStorage.setItem('valkyrie-notifications', JSON.stringify(notifications));
                        setSaveMessage('Notification settings saved!');
                        setTimeout(() => setSaveMessage(''), 3000);
                      }}
                      className="mt-4 btn btn-primary"
                    >
                      Save Notification Settings
                    </button>
                  </div>

                  <div className="profile-glass-card p-6 rounded-xl profile-hazy-glow">
                    <h4 className="text-lg font-semibold text-gray-200 mb-4">Storage</h4>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Used: {storageInfo.used}</span>
                        <span>Total: {storageInfo.total}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            storageInfo.status === 'critical' ? 'bg-red-500' :
                            storageInfo.status === 'warning' ? 'bg-yellow-500' :
                            storageInfo.status === 'good' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <span className={`${
                          storageInfo.status === 'critical' ? 'text-red-400' :
                          storageInfo.status === 'warning' ? 'text-yellow-400' :
                          storageInfo.status === 'good' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                          {storageInfo.status.charAt(0).toUpperCase() + storageInfo.status.slice(1)}
                        </span>
                        <span className="text-gray-500">{storageInfo.percentage.toFixed(1)}% used</span>
                      </div>
                    </div>
                    <button className="btn btn-secondary">Upgrade Storage</button>
                  </div>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm hover:scale-105 profile-hazy-glow"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
