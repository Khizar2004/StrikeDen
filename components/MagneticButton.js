"use client";
import { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

export default memo(function MagneticButton({ 
  children, 
  className, 
  strength = 50, 
  glowOnHover = true,
  glowColor = "rgba(229, 9, 20, 0.8)",
  pulseEffect = true,
  borderEffect = true,
  ...props 
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || !isMounted) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const radius = Math.max(width, height) * 1.5;

    if (distance < radius) {
      const magnetX = (distanceX / radius) * strength;
      const magnetY = (distanceY / radius) * strength;

      setPosition({ x: magnetX, y: magnetY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [isMounted, strength]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const combinedClassNames = `${className || ''}`;

  return (
    <motion.div
      ref={buttonRef}
      className="inline-block relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: isHovered ? position.x : 0, 
        y: isHovered ? position.y : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1 
      }}
      {...props}
    >
      <div className={combinedClassNames}>
        {children}
      </div>
      
      {/* Border effect */}
      {borderEffect && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ 
            borderRadius: 'inherit',
          }}
        >
          <div className="absolute inset-0 border-2 border-primary-500/70 rounded-md"></div>
          
          {/* Animated border gradient */}
          <div 
            className="absolute inset-0 opacity-70"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.8), transparent)',
              backgroundSize: '200% 100%',
              animation: 'gradient-shift 2s linear infinite',
              mixBlendMode: 'overlay',
            }}
          />
        </motion.div>
      )}
      
      {/* Glow effect on hover */}
      {glowOnHover && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            boxShadow: pulseEffect 
              ? ['0 0 15px rgba(229, 9, 20, 0.7)', '0 0 25px rgba(229, 9, 20, 0.9)', '0 0 15px rgba(229, 9, 20, 0.7)']
              : `0 0 25px ${glowColor}`,
          }}
          transition={{ 
            duration: 0.2,
            boxShadow: {
              repeat: pulseEffect ? Infinity : 0,
              duration: 1.5,
              ease: "easeInOut",
            }
          }}
          style={{ 
            borderRadius: 'inherit',
            filter: 'blur(8px)',
          }}
        />
      )}
      
      {/* Magnetic field effect */}
      <motion.div
        className="absolute -inset-4 -z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(229, 9, 20, 0.3), transparent 70%)',
          borderRadius: 'inherit',
          filter: 'blur(10px)',
        }}
      />
    </motion.div>
  );
});