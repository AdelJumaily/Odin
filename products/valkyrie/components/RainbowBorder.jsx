import React from 'react';

const NeoPixelBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* White glow border container */}
      <div 
        className="absolute inset-0 rounded-xl p-[2px]"
        style={{
          background: 'linear-gradient(90deg, #ffffff, #f0f0f0, #ffffff, #e0e0e0, #ffffff)',
          backgroundSize: '200% 100%',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
          animation: 'neopixel-glow 2s ease-in-out infinite alternate'
        }}
      >
        <div className="w-full h-full bg-black rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NeoPixelBorder;
