"use client";
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className, strength = 50, ...props }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || !isMounted) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Calculate distance from center (0-1)
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const radius = Math.max(width, height) * 1.5;
    
    // Only apply effect if cursor is within radius
    if (distance < radius) {
      // Invert and scale the movement for magnetic effect
      const magnetX = (distanceX / radius) * strength;
      const magnetY = (distanceY / radius) * strength;
      
      setPosition({ x: magnetX, y: magnetY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const combinedClassNames = `${className || ''}`;

  return (
    <motion.div
      ref={buttonRef}
      className="inline-block relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: isHovered ? position.x : 0, y: isHovered ? position.y : 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      <div className={combinedClassNames}>
        {children}
      </div>
    </motion.div>
  );
} 