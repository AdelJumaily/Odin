import React from 'react';

export default function ValkyrieAppPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Valkyrie File Manager</h1>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            This is where the Valkyrie React application will be embedded or served.
          </p>
          <p className="text-sm text-gray-500">
            The actual Valkyrie application is located in: products/valkyrie/
          </p>
        </div>
      </div>
    </div>
  );
}
