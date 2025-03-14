"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      setIsVisible(true);
      
      // Check initial theme
      const htmlElement = document.documentElement;
      setIsDarkMode(htmlElement.classList.contains('dark'));
      
      // Setup observer for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            setIsDarkMode(htmlElement.classList.contains('dark'));
          }
        });
      });
      
      observer.observe(htmlElement, { attributes: true });
      
      const handleMouseMove = (e) => {
        const newPosition = { x: e.clientX, y: e.clientY };
        setMousePosition(newPosition);
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
      
      const handleMouseDown = () => {
        setIsClicking(true);
      };
      
      const handleMouseUp = () => {
        setIsClicking(false);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        observer.disconnect();
      };
    }
  }, []);

  // Don't render anything on touch devices
  if (!isVisible) return null;

  // Use appropriate color based on theme
  const cursorColor = isDarkMode ? 'rgba(229, 9, 20, 0.9)' : 'rgba(0, 0, 0, 0.8)';
  const ringColor = isDarkMode ? 'rgba(229, 9, 20, 0.8)' : 'rgba(0, 0, 0, 0.6)';

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          position: 'fixed',
          width: isClicking ? '12px' : '16px',
          height: isClicking ? '12px' : '16px',
          borderRadius: '50%',
          backgroundColor: cursorColor,
          mixBlendMode: isDarkMode ? 'screen' : 'normal',
        }}
        animate={{
          x: mousePosition.x - (isClicking ? 6 : 8),
          y: mousePosition.y - (isClicking ? 6 : 8),
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "circOut",
        }}
      />
      
      {/* Outer ring - only show when hovering clickable elements */}
      {isHoveringClickable && (
        <motion.div
          className="cursor-ring fixed top-0 left-0 z-50 pointer-events-none"
          style={{
            position: 'fixed',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `2px solid ${ringColor}`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.3,
            ease: "circOut",
            scale: {
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }
          }}
        />
      )}
      
      {/* Click effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="cursor-click fixed top-0 left-0 z-48 pointer-events-none"
            style={{
              position: 'fixed',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: `2px solid ${ringColor}`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ 
              x: mousePosition.x, 
              y: mousePosition.y, 
              scale: 0.5, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 1.5, 
              opacity: 0 
            }}
            exit={{ 
              opacity: 0 
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
} 