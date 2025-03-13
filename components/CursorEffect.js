"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      setIsVisible(true);
      
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      // Check if hovering over clickable elements
      const handleMouseOver = (e) => {
        const isClickable = e.target.tagName.toLowerCase() === 'a' || 
                            e.target.tagName.toLowerCase() === 'button' ||
                            e.target.closest('a') || 
                            e.target.closest('button');
        
        const isNavbar = e.target.closest('nav');
        
        setIsHoveringClickable(isClickable || isNavbar);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, []);

  // Don't render anything on touch devices or when hovering navbar
  if (!isVisible) return null;

  return (
    <>
      {!isHoveringClickable && (
        <motion.div
          className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none"
          style={{
            position: 'fixed',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 112, 243, 0.5)',
            mixBlendMode: 'difference',
            filter: 'blur(5px)',
          }}
          animate={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 0.5,
            ease: "circOut",
          }}
        />
      )}
      
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          position: 'fixed',
          width: isHoveringClickable ? '50px' : '40px',
          height: isHoveringClickable ? '50px' : '40px',
          borderRadius: '50%',
          border: isHoveringClickable 
            ? '2px solid rgba(255, 59, 48, 0.7)' 
            : '1px solid rgba(255, 59, 48, 0.5)',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHoveringClickable ? 1.2 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "linear",
        }}
      />
    </>
  );
} 