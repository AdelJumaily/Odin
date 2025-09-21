import React from 'react';
import { Folder, Home, LogOut, User, Settings } from 'lucide-react';

const Sidebar = ({ projects, selectedProject, onProjectSelect, user, onLogout }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => onProjectSelect(null)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !selectedProject
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>All Files</span>
        </button>

        <div className="pt-4">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Projects
          </h3>
          <div className="mt-2 space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedProject?.id === project.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Folder className="h-4 w-4" />
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
