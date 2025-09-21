import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FolderPlus, 
  User, 
  Settings, 
  Search, 
  Grid, 
  List, 
  Download,
  ArrowLeft,
  ChevronRight,
  Trash2,
  MoreVertical,
  File,
  Folder,
  Image,
  FileText,
  Music,
  Video,
  Archive
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FileUpload from '../components/FileUpload';
import ProfileModal from '../components/ProfileModal';

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('valkyrie-files');
    const savedFolders = localStorage.getItem('valkyrie-folders');
    
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
    
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-8 h-8 text-white" />;
      case 'image': return <Image className="w-8 h-8 text-white" />;
      case 'video': return <Video className="w-8 h-8 text-white" />;
      case 'audio': return <Music className="w-8 h-8 text-white" />;
      case 'archive': return <Archive className="w-8 h-8 text-white" />;
      default: return <File className="w-8 h-8 text-white" />;
    }
  };

  const handleFileUpload = (newFiles) => {
    const uploadedFiles = newFiles.map((file, index) => ({
      id: Date.now() + index, // Use timestamp for unique IDs
      name: file.name,
      type: file.type.split('/')[0],
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      modified: new Date().toISOString().split('T')[0],
      file: file, // Store the actual file object
      path: currentPath // Assign to current path
    }));
    
    const updatedFiles = [...files, ...uploadedFiles];
    setFiles(updatedFiles);
    
    // Save to localStorage
    localStorage.setItem('valkyrie-files', JSON.stringify(updatedFiles));
    setShowUpload(false);
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName && folderName.trim()) {
      const newFolder = {
        id: Date.now(), // Use timestamp for unique ID
        name: folderName.trim(),
        itemCount: 0,
        modified: new Date().toISOString().split('T')[0],
        path: currentPath // Assign to current path
      };
      
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      
      // Save to localStorage
      localStorage.setItem('valkyrie-folders', JSON.stringify(updatedFolders));
    }
  };

  const handleDelete = (id, type) => {
    if (type === 'file') {
      const updatedFiles = files.filter(file => file.id !== id);
      setFiles(updatedFiles);
      localStorage.setItem('valkyrie-files', JSON.stringify(updatedFiles));
    } else {
      const updatedFolders = folders.filter(folder => folder.id !== id);
      setFolders(updatedFolders);
      localStorage.setItem('valkyrie-folders', JSON.stringify(updatedFolders));
    }
  };

  const handleFolderClick = (folder) => {
    const newPath = currentPath === '/' ? `/${folder.name}` : `${currentPath}/${folder.name}`;
    setCurrentPath(newPath);
  };

  const handleBackClick = () => {
    if (currentPath === '/') return;
    const pathParts = currentPath.split('/').filter(part => part !== '');
    pathParts.pop();
    const newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
    setCurrentPath(newPath);
  };

  const getBreadcrumbs = () => {
    if (currentPath === '/') return [{ name: 'Home', path: '/' }];
    const pathParts = currentPath.split('/').filter(part => part !== '');
    const breadcrumbs = [{ name: 'Home', path: '/' }];
    
    let currentBreadcrumbPath = '';
    pathParts.forEach(part => {
      currentBreadcrumbPath += `/${part}`;
      breadcrumbs.push({ name: part, path: currentBreadcrumbPath });
    });
    
    return breadcrumbs;
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setFiles([]);
      setFolders([]);
      setCurrentPath('/');
      localStorage.removeItem('valkyrie-files');
      localStorage.removeItem('valkyrie-folders');
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    file.path === currentPath
  );
  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    folder.path === currentPath
  );

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar 
        currentPath={currentPath}
        onPathChange={setCurrentPath}
        onCreateFolder={handleCreateFolder}
        files={files}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onUpload={() => setShowUpload(true)}
          onCreateFolder={handleCreateFolder}
          onProfile={() => setShowProfile(true)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="flex-1 p-6 overflow-auto spotlight-container bg-black/[0.96]">
          <div className="spotlight-content">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold gradient-text-glow mb-2">
                    File Manager
                    {currentPath !== '/' && (
                      <span className="text-lg text-gray-400 ml-2">
                        {currentPath}
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-400">Manage your files and folders</p>
                </div>
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                Clear All Data
              </button>
              </div>
              
              {/* Breadcrumb Navigation */}
              <div className="mt-4 flex items-center space-x-2">
                <button
                  onClick={handleBackClick}
                  disabled={currentPath === '/'}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    currentPath === '/' 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center space-x-1 text-sm">
                  {getBreadcrumbs().map((breadcrumb, index) => (
                    <div key={breadcrumb.path} className="flex items-center">
                      {index > 0 && <ChevronRight className="w-3 h-3 text-gray-500 mx-1" />}
                      <button
                        onClick={() => setCurrentPath(breadcrumb.path)}
                        className={`px-2 py-1 rounded transition-colors ${
                          breadcrumb.path === currentPath
                            ? 'text-red-primary bg-red-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {breadcrumb.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          {/* Folders */}
          {filteredFolders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Folders</h2>
              {viewMode === 'grid' ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFolders.map(folder => (
                    <div 
                      key={folder.id} 
                      className="glass-card glass-glow glass-refraction p-4 group cursor-pointer hover:scale-105 transition-all duration-300"
                      onClick={() => handleFolderClick(folder)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Folder className="w-8 h-8 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-primary rounded-full flex items-center justify-center">
                              <ChevronRight className="w-2 h-2 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{folder.name}</h3>
                            <p className="text-sm text-gray-300">{folder.itemCount} items</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(folder.id, 'folder');
                            }}
                            className="p-1 hover:bg-white/20 rounded backdrop-blur-sm transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4 text-purple-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card glass-glow glass-refraction overflow-hidden">
                  <div className="divide-y divide-gray-700">
                    {filteredFolders.map(folder => (
                      <div 
                        key={folder.id} 
                        className="p-4 hover:bg-white/5 transition-colors group cursor-pointer"
                        onClick={() => handleFolderClick(folder)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Folder className="w-6 h-6 text-white" />
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-primary rounded-full flex items-center justify-center">
                                <ChevronRight className="w-1.5 h-1.5 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{folder.name}</h3>
                              <p className="text-sm text-gray-300">{folder.itemCount} items</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(folder.id, 'folder');
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4 text-purple-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Files */}
          {filteredFiles.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Files</h2>
              {viewMode === 'grid' ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFiles.map(file => (
                    <div key={file.id} className="glass-card glass-glow glass-refraction p-4 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <div>
                            <h3 className="font-medium text-white">{file.name}</h3>
                            <p className="text-sm text-gray-300">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              if (file.file) {
                                const url = URL.createObjectURL(file.file);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = file.name;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }
                            }}
                            className="p-1 hover:bg-white/20 rounded backdrop-blur-sm transition-all duration-300"
                          >
                            <Download className="w-4 h-4 text-green-400" />
                          </button>
                          <button 
                            onClick={() => handleDelete(file.id, 'file')}
                            className="p-1 hover:bg-white/20 rounded backdrop-blur-sm transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4 text-purple-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card glass-glow glass-refraction overflow-hidden">
                  <div className="divide-y divide-gray-700">
                    {filteredFiles.map(file => (
                      <div key={file.id} className="p-4 hover:bg-white/5 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getFileIcon(file.type)}
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{file.name}</h3>
                              <p className="text-sm text-gray-300">{file.size} • Modified: {file.modified}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                if (file.file) {
                                  const url = URL.createObjectURL(file.file);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = file.name;
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  URL.revokeObjectURL(url);
                                }
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Download className="w-4 h-4 text-green-400" />
                            </button>
                            <button 
                              onClick={() => handleDelete(file.id, 'file')}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4 text-purple-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {filteredFiles.length === 0 && filteredFolders.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card glass-glow glass-refraction p-8 max-w-md mx-auto">
                <File className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">No files found</h3>
                <p className="text-gray-400 mb-6">Upload files or create folders to get started</p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setShowUpload(true)}
                    className="btn btn-primary"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </button>
                  <button 
                    onClick={handleCreateFolder}
                    className="btn btn-secondary"
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    Create Folder
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {showUpload && (
        <FileUpload 
          onClose={() => setShowUpload(false)}
          onUpload={handleFileUpload}
        />
      )}

      {showProfile && (
        <ProfileModal 
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default FileExplorer;