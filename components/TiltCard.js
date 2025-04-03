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
  glareMaxOpacity = 0.6,
  glareColor = "255, 255, 255",
  borderGlow = true,
  borderColor = "rgba(229, 9, 20, 0.6)",
  hoverGlow = true,
  ...props 
}) {
  const [tiltEffectEnabled, setTiltEffectEnabled] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltValues({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      animate={{
        rotateX: tiltValues.x,
        rotateY: tiltValues.y,
        scale: tiltEffectEnabled ? (isHovered ? tiltScale : 1) : 1,
      }}
      transition={{
        duration: transitionSpeed / 1000,
        ease: "easeOut",
      }}
      {...props}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(229, 9, 20, 0.15) 0%, transparent 70%)`,
          backgroundSize: '100% 100%',
          zIndex: 0,
        }}
      />
      
      {/* Border glow effect */}
      {tiltEffectEnabled && borderGlow && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered ? `0 0 20px ${borderColor}, 0 0 30px ${borderColor}` : 'none',
          }}
          transition={{ duration: 0.3 }}
          style={{
            border: `1px solid ${borderColor}`,
            zIndex: 1,
          }}
        />
      )}
      
      {/* Glare effect */}
      {tiltEffectEnabled && glare && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(${glareColor}, ${glareMaxOpacity}), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            mixBlendMode: 'overlay',
            transition: 'opacity 0.3s ease',
            zIndex: 2,
          }}
        />
      )}
      
      {/* Red accent glow */}
      {tiltEffectEnabled && hoverGlow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.7 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(229, 9, 20, 0.3), transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 1,
          }}
        />
      )}
      
      {/* Animated corner accents */}
      {isHovered && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary-500/70"></div>
            <div className="absolute top-0 left-0 h-full w-[1px] bg-primary-500/70"></div>
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-primary-500/70"></div>
            <div className="absolute top-0 right-0 h-full w-[1px] bg-primary-500/70"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-500/70"></div>
            <div className="absolute bottom-0 left-0 h-full w-[1px] bg-primary-500/70"></div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-primary-500/70"></div>
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-primary-500/70"></div>
          </div>
        </>
      )}
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 bg-grid opacity-30 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Content */}
      <div className="relative" style={{ transform: "translateZ(40px)", zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  );
} 