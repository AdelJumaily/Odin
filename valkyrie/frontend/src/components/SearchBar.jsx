import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, searchQuery, onClear }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fileType: '',
    dateRange: '',
    sizeRange: ''
  });

  const handleSearch = (query) => {
    onSearch(query);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      fileType: '',
      dateRange: '',
      sizeRange: ''
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="input pl-10 pr-20 w-full"
          placeholder="Search files by name, content, or tags..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
          {searchQuery && (
            <button
              onClick={() => {
                onClear();
                handleSearch('');
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1 rounded ${
              showFilters ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* File Type Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                File Type
              </label>
              <select
                value={filters.fileType}
                onChange={(e) => handleFilterChange('fileType', e.target.value)}
                className="input text-sm"
              >
                <option value="">All types</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="archive">Archives</option>
                <option value="code">Code</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="input text-sm"
              >
                <option value="">Any time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>

            {/* Size Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                File Size
              </label>
              <select
                value={filters.sizeRange}
                onChange={(e) => handleFilterChange('sizeRange', e.target.value)}
                className="input text-sm"
              >
                <option value="">Any size</option>
                <option value="small">Small (< 1MB)</option>
                <option value="medium">Medium (1-10MB)</option>
                <option value="large">Large (10-100MB)</option>
                <option value="xlarge">Very Large (> 100MB)</option>
              </select>
            </div>
          </div>

          {/* Search Suggestions */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Quick searches:</p>
            <div className="flex flex-wrap gap-2">
              {['recent', 'images', 'documents', 'videos'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
