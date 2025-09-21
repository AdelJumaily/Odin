import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FileText, Upload, Search, Folder, User } from 'lucide-react';

const FileExplorer = () => {
  const { user, logout } = useAuth();
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState('');

  // Mock projects - in real app, this would come from API
  const projects = [
    { id: 1, name: 'Apollo', description: 'Main project files' },
    { id: 2, name: 'Zephyr', description: 'Secondary project' }
  ];

  useEffect(() => {
    loadFiles();
  }, [selectedProject]);

  useEffect(() => {
    // Filter files based on search query
    if (searchQuery.trim()) {
      const filtered = files.filter(file => 
        file.filename.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFiles(filtered);
    } else {
      setFilteredFiles(files);
    }
  }, [searchQuery, files]);

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // This would be replaced with actual API call
      // const response = await apiService.listFiles(selectedProject?.id);
      // setFiles(response.data.rows);
      
      // Mock data for now
      const mockFiles = [
        {
          id: 1,
          filename: 'project-proposal.pdf',
          project_id: 1,
          owner_user_id: 1,
          created_at: '2024-01-15T10:30:00Z',
          size_bytes: 2048576,
          mime: 'application/pdf'
        },
        {
          id: 2,
          filename: 'meeting-notes.docx',
          project_id: 1,
          owner_user_id: 2,
          created_at: '2024-01-14T14:20:00Z',
          size_bytes: 1536000,
          mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        {
          id: 3,
          filename: 'design-mockup.png',
          project_id: 2,
          owner_user_id: 1,
          created_at: '2024-01-13T09:15:00Z',
          size_bytes: 512000,
          mime: 'image/png'
        }
      ];
      
      setFiles(mockFiles);
    } catch (err) {
      setError('Failed to load files');
      console.error('Error loading files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file, projectId) => {
    try {
      // This would be replaced with actual API call
      // await apiService.uploadFile(file, projectId, user.id);
      
      // Mock successful upload
      const newFile = {
        id: Date.now(),
        filename: file.name,
        project_id: projectId,
        owner_user_id: user.id,
        created_at: new Date().toISOString(),
        size_bytes: file.size,
        mime: file.type
      };
      
      setFiles(prev => [newFile, ...prev]);
      setShowUpload(false);
    } catch (err) {
      setError('Failed to upload file');
      console.error('Error uploading file:', err);
    }
  };

  const handleFileDownload = async (file) => {
    try {
      // This would be replaced with actual API call
      // const response = await apiService.downloadFile(file.id);
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', file.filename);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // window.URL.revokeObjectURL(url);
      
      // Mock download
      console.log('Downloading file:', file.filename);
    } catch (err) {
      setError('Failed to download file');
      console.error('Error downloading file:', err);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      try {
        // This would be replaced with actual API call
        // const response = await apiService.searchText(query);
        // setFilteredFiles(response.data.rows);
      } catch (err) {
        setError('Search failed');
        console.error('Error searching files:', err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
        user={user}
        onLogout={logout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          onUploadClick={() => setShowUpload(true)}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          selectedProject={selectedProject}
        />

        {/* File Content */}
        <main className="flex-1 overflow-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <FileList 
              files={filteredFiles}
              onFileDownload={handleFileDownload}
              selectedProject={selectedProject}
            />
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <FileUpload 
          onClose={() => setShowUpload(false)}
          onUpload={handleFileUpload}
          projects={projects}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
};

export default FileExplorer;
