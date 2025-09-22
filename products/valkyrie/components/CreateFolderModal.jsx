import React, { useState } from 'react';
import { X, FolderPlus, AlertCircle } from 'lucide-react';

const CreateFolderModal = ({ onClose, onCreateFolder, currentPath }) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }

    if (folderName.trim().length < 2) {
      setError('Folder name must be at least 2 characters');
      return;
    }

    if (folderName.includes('/') || folderName.includes('\\')) {
      setError('Folder name cannot contain slashes');
      return;
    }

    setIsLoading(true);
    
    try {
      await onCreateFolder(folderName.trim());
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create folder');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFolderName('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="profile-modal-content w-full max-w-md mx-4 rounded-2xl">
        <div className="profile-glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-primary/20 rounded-lg">
                <FolderPlus className="w-6 h-6 text-red-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-200">Create New Folder</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110 profile-hazy-glow"
            >
              <X className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value);
                  setError('');
                }}
                placeholder="Enter folder name..."
                className="input w-full"
                autoFocus
                disabled={isLoading}
              />
              {error && (
                <div className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {currentPath !== '/' && (
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-400">
                  <span className="text-gray-300">Location:</span> {currentPath}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center space-x-2"
                disabled={isLoading || !folderName.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FolderPlus className="w-4 h-4" />
                    <span>Create Folder</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
