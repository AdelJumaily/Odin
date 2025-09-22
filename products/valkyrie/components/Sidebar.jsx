import React from 'react';
import { 
  Home, 
  Folder, 
  Star, 
  Clock, 
  Trash2, 
  HardDrive, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { calculateStorageUsage, getStorageStatus } from '../utils/storage';

const Sidebar = ({ currentPath, onPathChange, onCreateFolder, files = [] }) => {
  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'recent', label: 'Recent', icon: Clock, path: '/recent' },
    { id: 'starred', label: 'Starred', icon: Star, path: '/starred' },
    { id: 'trash', label: 'Trash', icon: Trash2, path: '/trash' },
  ];

  const quickFolders = [
    { id: 'documents', label: 'Documents', icon: Folder, path: '/documents' },
    { id: 'images', label: 'Images', icon: Folder, path: '/images' },
    { id: 'videos', label: 'Videos', icon: Folder, path: '/videos' },
    { id: 'music', label: 'Music', icon: Folder, path: '/music' },
  ];

  // Calculate real storage usage
  const storageInfo = calculateStorageUsage(files);
  const storageStatus = getStorageStatus(storageInfo.percentage);

  return (
    <aside className="sidebar w-64 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-red-primary mb-6">Valkyrie</h2>
        
        {/* Storage Info */}
        <div className="glass-card glass-glow glass-refraction p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Storage Used</span>
            <span className={`text-sm ${storageStatus.color}`}>
              {storageInfo.usedFormatted} / {storageInfo.totalFormatted}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
            <div 
              className={`h-2 rounded-full shadow-lg transition-all duration-500 ${
                storageInfo.percentage >= 90 ? 'bg-purple-500' :
                storageInfo.percentage >= 75 ? 'bg-yellow-500' :
                storageInfo.percentage >= 50 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${storageInfo.percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              {storageStatus.status.charAt(0).toUpperCase() + storageStatus.status.slice(1)}
            </span>
            <span className="text-xs text-gray-400">
              {storageInfo.remainingFormatted} remaining
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Navigation
        </h3>
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => onPathChange(item.path)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 sidebar-menu-item ${
              currentPath === item.path 
                ? 'bg-red-primary text-white shadow-lg active' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-sm'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Quick Folders */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Quick Access
          </h3>
          <button
            onClick={onCreateFolder}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1">
          {quickFolders.map(folder => (
            <button
              key={folder.id}
              onClick={() => onPathChange(folder.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 sidebar-menu-item ${
                currentPath === folder.path 
                  ? 'bg-red-primary text-white shadow-lg active' 
                  : 'text-white hover:bg-white/10 hover:text-white backdrop-blur-sm'
              }`}
            >
              <folder.icon className="w-4 h-4" />
              <span className="text-sm">{folder.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm sidebar-menu-item">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;