"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({ 
  children, 
  className = "", 
  perspective = 1000,
  tiltMaxAngle = 15,
  tiltScale = 1.05,
  transitionSpeed = 400,
  glare = true,
  glareMaxOpacity = 0.5,
  ...props 
}) {
  const [tiltEffectEnabled, setTiltEffectEnabled] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      setTiltEffectEnabled(true);
    }
    
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!tiltEffectEnabled || !cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setMousePosition({ x, y });
    
    // Calculate tilt values
    const tiltX = ((y * 2) - 1) * -tiltMaxAngle;
    const tiltY = ((x * 2) - 1) * tiltMaxAngle;
    
    setTiltValues({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTiltValues({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      animate={{
        rotateX: tiltValues.x,
        rotateY: tiltValues.y,
        scale: tiltEffectEnabled ? (tiltValues.x !== 0 || tiltValues.y !== 0 ? tiltScale : 1) : 1,
      }}
      transition={{
        duration: transitionSpeed / 1000,
        ease: "easeOut",
      }}
      {...props}
    >
      {/* Glare effect */}
      {tiltEffectEnabled && glare && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
            opacity: ((mousePosition.y * mousePosition.x) * glareMaxOpacity),
            top: `${mousePosition.y * 100}%`,
            left: `${mousePosition.x * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: `${dimensions.width * 2}px`,
            height: `${dimensions.height * 2}px`,
            maskImage: 'radial-gradient(circle at center, white, transparent 70%)',
            mixBlendMode: 'overlay',
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
} 