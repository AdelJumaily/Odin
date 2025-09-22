import React from 'react';
import { format } from 'date-fns';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  Code, 
  Download, 
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';

const FileList = ({ files, onFileDownload, selectedProject }) => {
  const getFileIcon = (mimeType) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (mimeType.startsWith('video/')) return <Video className="h-5 w-5 text-purple-500" />;
    if (mimeType.startsWith('audio/')) return <Music className="h-5 w-5 text-green-500" />;
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) {
      return <Archive className="h-5 w-5 text-orange-500" />;
    }
    if (mimeType.includes('text/') || mimeType.includes('code/')) {
      return <Code className="h-5 w-5 text-yellow-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return 'Unknown date';
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
        <p className="mt-1 text-sm text-gray-500">
          {selectedProject 
            ? `No files in ${selectedProject.name} project.`
            : 'No files found.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="card p-4 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onFileDownload(file)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                {getFileIcon(file.mime)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {file.filename}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size_bytes)}
                  </p>
                </div>
              </div>
              
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(file.created_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>User {file.owner_user_id}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Project {file.project_id}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileDownload(file);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary-100 rounded"
              >
                <Download className="h-4 w-4 text-primary-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Files Table View (Alternative) */}
      <div className="hidden">
        <div className="card overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFileIcon(file.mime)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {file.filename}
                        </div>
                        <div className="text-sm text-gray-500">
                          Project {file.project_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(file.size_bytes)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(file.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    User {file.owner_user_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onFileDownload(file)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileList;
