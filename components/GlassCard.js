"use client";
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function GlassCard({ 
  children, 
  className = "", 
  glowColor = "rgba(0, 112, 243, 0.15)",
  borderColor = "rgba(255, 255, 255, 0.1)",
  backgroundColor = "rgba(255, 255, 255, 0.7)",
  blurStrength = 10,
  ...props 
}) {
  const cardRef = useRef(null);
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden backdrop-blur-lg ${className}`}
      style={{
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        boxShadow: `0 10px 30px ${glowColor}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      {...props}
    >
      {/* Glass shine effect */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background: 'linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.5) 25%, transparent 30%)',
          animation: 'shine 5s infinite',
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
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
} 