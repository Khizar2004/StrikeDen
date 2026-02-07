"use client";
import { motion } from 'framer-motion';
import { useRef, useState, memo } from 'react';

export default memo(function GlassCard({ 
  children, 
  className = "", 
  glowColor = "rgba(229, 9, 20, 0.4)",
  borderColor = "rgba(229, 9, 20, 0.3)",
  backgroundColor = "rgba(18, 18, 18, 0.8)",
  blurStrength = 12,
  hoverEffect = true,
  revealEffect = true,
  ...props 
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden backdrop-blur-lg rounded-xl ${className}`}
      style={{
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        boxShadow: isHovered && hoverEffect 
          ? `0 10px 30px ${glowColor}, 0 0 20px ${glowColor}` 
          : `0 10px 30px ${glowColor}`,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hoverEffect ? { 
        scale: 1.03,
        borderColor: "rgba(229, 9, 20, 0.6)",
      } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Glass shine effect */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background: 'linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.4) 25%, transparent 30%)',
          animation: 'shine 5s infinite',
        }}
      />
      
      {/* Red glow accent */}
      <motion.div 
        className="absolute -inset-1 z-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered && hoverEffect ? 0.4 : 0.1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(229, 9, 20, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Frosted blur effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`,
        }}
      />
      
      {/* Border highlight */}
      {hoverEffect && (
        <motion.div 
          className="absolute inset-0 z-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            border: '1px solid rgba(229, 9, 20, 0.6)',
            borderRadius: 'inherit',
          }}
        />
      )}
      
      {/* Corner accents */}
      {isHovered && hoverEffect && (
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
        className="absolute inset-0 bg-grid opacity-20 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Content with reveal effect */}
      <div className={`relative z-10 ${revealEffect ? 'reveal-blur' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
});