"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const navRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Set active link based on current path
    setActiveLink(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navbarClasses = scrolled
    ? 'fixed top-0 left-0 w-full bg-secondary-900/95 backdrop-blur-xl text-white shadow-red-glow z-50 border-b border-primary-500/40'
    : 'fixed top-0 left-0 w-full bg-gradient-to-b from-secondary-900/95 to-transparent text-white z-50';

  const linkClasses = (path) => {
    const isActive = activeLink === path;
    const baseClasses = 'relative px-3 py-2 text-white hover:text-primary-400 transition-colors duration-300 font-medium text-shadow-sm';
    
    return isActive 
      ? `${baseClasses} text-primary-500 neon-text` 
      : baseClasses;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animation variants
  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      }
    },
    open: { 
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  };

  const mobileItemVariants = {
    closed: { 
      y: -10,
      opacity: 0 
    },
    open: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      }
    }
  };

  return (
    <motion.nav 
      ref={navRef}
      className={navbarClasses}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {/* Animated background gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-[gradient-shift_4s_ease_infinite]" 
             style={{ backgroundSize: '200% 100%' }}></div>
      </div>
      
      {/* Glow effect when scrolled */}
      {scrolled && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-500/50 blur-[2px]"></div>
        </motion.div>
      )}

      <div className="container-padded flex justify-between items-center py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center">
          <motion.span 
            className="text-primary-500 neon-text"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Strike
          </motion.span>
          <motion.span 
            className="text-white dark:text-white light:text-gray-900"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Den
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          <Link href="/" className={linkClasses('/')}>
            <span className="relative z-10">Home</span>
            {activeLink === '/' && (
              <motion.span 
                className="absolute inset-0 bg-primary-500/10 rounded-md -z-10"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
          <Link href="/about" className={linkClasses('/about')}>
            <span className="relative z-10">About</span>
            {activeLink === '/about' && (
              <motion.span 
                className="absolute inset-0 bg-primary-500/10 rounded-md -z-10"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
          <Link href="/classes" className={linkClasses('/classes')}>
            <span className="relative z-10">Classes</span>
            {activeLink === '/classes' && (
              <motion.span 
                className="absolute inset-0 bg-primary-500/10 rounded-md -z-10"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
          <Link href="/trainers" className={linkClasses('/trainers')}>
            <span className="relative z-10">Trainers</span>
            {activeLink === '/trainers' && (
              <motion.span 
                className="absolute inset-0 bg-primary-500/10 rounded-md -z-10"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
          <Link href="/contact" className={linkClasses('/contact')}>
            <span className="relative z-10">Contact</span>
            {activeLink === '/contact' && (
              <motion.span 
                className="absolute inset-0 bg-primary-500/10 rounded-md -z-10"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
          
          {/* Theme Toggle */}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/contact" className="hidden md:block">
            <motion.button 
              className="btn btn-primary relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(229, 9, 20, 0.7)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Join Now</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.span 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white"
                style={{ mixBlendMode: 'overlay' }}
              />
              <motion.span 
                className="absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.3), rgba(229, 9, 20, 0.1), rgba(229, 9, 20, 0.3))',
                  backgroundSize: '200% 100%',
                  animation: 'gradient-shift 2s linear infinite'
                }}
              />
            </motion.button>
          </Link>
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <motion.button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg 
              className="w-6 h-6 text-white dark:text-white light:text-gray-900" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-secondary-800/95 backdrop-blur-xl border-t border-primary-500/20 overflow-hidden"
          >
            <div className="container-padded py-4 flex flex-col space-y-2">
              <motion.div variants={mobileItemVariants}>
                <Link href="/" className="block px-4 py-3 text-white hover:text-primary-500 hover:bg-secondary-700/80 rounded-lg transition-all duration-200 relative overflow-hidden group">
                  <span className="relative z-10">Home</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/about" className="block px-4 py-3 text-white hover:text-primary-500 hover:bg-secondary-700/80 rounded-lg transition-all duration-200 relative overflow-hidden group">
                  <span className="relative z-10">About</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/classes" className="block px-4 py-3 text-white hover:text-primary-500 hover:bg-secondary-700/80 rounded-lg transition-all duration-200 relative overflow-hidden group">
                  <span className="relative z-10">Classes</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/trainers" className="block px-4 py-3 text-white hover:text-primary-500 hover:bg-secondary-700/80 rounded-lg transition-all duration-200 relative overflow-hidden group">
                  <span className="relative z-10">Trainers</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/contact" className="block px-4 py-3 text-white hover:text-primary-500 hover:bg-secondary-700/80 rounded-lg transition-all duration-200 relative overflow-hidden group">
                  <span className="relative z-10">Contact</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants} className="pt-2">
                <Link href="/contact" className="block px-4 py-3 bg-primary-500 text-white rounded-lg text-center shadow-red-glow hover:bg-primary-600 transition-all duration-200 relative overflow-hidden group">
                  <span className="relative z-10">Join Now</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.span 
                    className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.3), rgba(229, 9, 20, 0.1), rgba(229, 9, 20, 0.3))',
                      backgroundSize: '200% 100%',
                      animation: 'gradient-shift 2s linear infinite'
                    }}
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}