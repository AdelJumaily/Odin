"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UserIcon, SettingsIcon, LogoutIcon } from '../icons';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-[#811bf6] rounded-full flex items-center justify-center text-white text-sm font-medium">
          A
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">admin@odin.com</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-800 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@odin.com</p>
          </div>
          <div className="py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              <UserIcon className="w-4 h-4 mr-3" />
              Profile
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              <SettingsIcon className="w-4 h-4 mr-3" />
              Settings
            </button>
            <hr className="my-1 border-gray-200 dark:border-gray-800" />
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
              <LogoutIcon className="w-4 h-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
