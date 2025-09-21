"use client";
import React from "react";

export const TextHoverEffect = ({ text, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white relative z-20 bg-gradient-to-r from-[#a123f6] to-blue-400 bg-clip-text text-transparent">
        {text}
      </h1>
    </div>
  );
};
