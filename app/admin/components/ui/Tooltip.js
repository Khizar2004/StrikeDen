"use client";

import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      aria-describedby={isVisible ? "tooltip-content" : undefined}
    >
      {children}
      {isVisible && (
        <div
          id="tooltip-content"
          className="absolute z-10 w-64 px-3 py-2 text-sm shadow-lg -top-1 left-full ml-2"
          style={{ background: "#1A1A1A", color: "rgba(237,235,230,0.7)", border: "1px solid rgba(237,235,230,0.06)" }}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {text}
          <div className="absolute w-2 h-2 transform rotate-45 -left-1 top-3" style={{ background: "#1A1A1A" }}></div>
        </div>
      )}
    </div>
  );
}
