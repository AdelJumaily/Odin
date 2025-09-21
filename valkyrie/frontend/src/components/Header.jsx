import React from 'react';
import { Upload, Search, Bell, User } from 'lucide-react';

const Header = ({ onUploadClick, onSearch, searchQuery, selectedProject }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Project info and search */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {selectedProject ? selectedProject.name : 'All Files'}
            </h1>
            {selectedProject && (
              <p className="text-sm text-gray-500">{selectedProject.description}</p>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onUploadClick}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </button>

          <button className="btn btn-ghost p-2">
            <Bell className="h-5 w-5" />
          </button>

          <button className="btn btn-ghost p-2">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
