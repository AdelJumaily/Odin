import React from 'react';

const SidebarWidget: React.FC = () => {
  return (
    <div className="mt-auto p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mx-2 mb-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-[#811bf6] rounded-lg flex items-center justify-center mx-auto mb-3">
          <span className="text-white text-lg font-bold">O</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          Odin Security
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Advanced threat monitoring
        </p>
        <button className="w-full px-3 py-2 text-xs font-medium text-white bg-[#811bf6] rounded-lg hover:bg-[#6b1bb8] transition-colors">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default SidebarWidget;
