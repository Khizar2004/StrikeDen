"use client";

import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      role="tooltip"
      aria-describedby="tooltip-content"
    >
      {children}
      {isVisible && (
        <div 
          id="tooltip-content"
          className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg -top-1 left-full ml-2"
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {text}
          <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-800 transform rotate-45 -left-1 top-3"></div>
        </div>
      )}
    </div>
  );
} 