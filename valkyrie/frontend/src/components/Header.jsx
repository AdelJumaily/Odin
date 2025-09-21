import React from 'react';
import { Upload, FolderPlus, User, Search, Grid, List, Bell } from 'lucide-react';

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onUpload, 
  onCreateFolder, 
  onProfile, 
  viewMode, 
  onViewModeChange 
}) => {
  return (
    <header className="header px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-all duration-300 ${viewMode === 'grid' ? 'bg-red-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-all duration-300 ${viewMode === 'list' ? 'bg-red-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onUpload}
            className="btn btn-primary"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>

          <button
            onClick={onCreateFolder}
            className="btn btn-secondary"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm">
            <Bell className="w-5 h-5 text-gray-300" />
          </button>

          {/* Profile */}
          <button
            onClick={onProfile}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm"
          >
            <User className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;