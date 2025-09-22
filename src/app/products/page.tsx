import React from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Valkyrie</h2>
          <p className="text-gray-300 mb-4">
            Advanced file management and security platform
          </p>
          <Link 
            href="/products/valkyrie" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
          >
            Launch Valkyrie
          </Link>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">More Products</h2>
          <p className="text-gray-300 mb-4">
            Additional products coming soon
          </p>
          <button 
            disabled
            className="bg-gray-600 px-4 py-2 rounded cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
