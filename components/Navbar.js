"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const navRef = useRef(null);
  const pathname = usePathname();

  // Set active link based on pathname
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navbarClasses = scrolled
    ? 'fixed top-0 left-0 w-full bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100 dark:border-secondary-700/30'
    : 'fixed top-0 left-0 w-full bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm z-50';

  const linkClasses = (path) => {
    const isActive = activeLink === path;
    const baseClasses = 'relative px-3 py-2 text-gray-700 dark:text-white/90 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 text-sm font-medium';
    
    return isActive 
      ? `${baseClasses} text-primary-500 dark:text-primary-400` 
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
        duration: 0.2,
        ease: [0.04, 0.62, 0.23, 0.98],
      }
    },
    open: { 
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
        staggerChildren: 0.05,
        delayChildren: 0.05,
      }
    }
  };

  const mobileItemVariants = {
    closed: { 
      y: -5,
      opacity: 0 
    },
    open: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
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
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-semibold tracking-tight flex items-center">
          <motion.span 
            className="text-primary-500"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Strike
          </motion.span>
          <motion.span 
            className="text-gray-800 dark:text-white"
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
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
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link href="/about" className={linkClasses('/about')}>
            <span className="relative z-10">About</span>
            {activeLink === '/about' && (
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link href="/classes" className={linkClasses('/classes')}>
            <span className="relative z-10">Classes</span>
            {activeLink === '/classes' && (
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link href="/trainers" className={linkClasses('/trainers')}>
            <span className="relative z-10">Trainers</span>
            {activeLink === '/trainers' && (
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link href="/contact" className={linkClasses('/contact')}>
            <span className="relative z-10">Contact</span>
            {activeLink === '/contact' && (
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                layoutId="navHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* Admin Link - More subtle icon version */}
          <Link href="/admin/login" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </Link>
          
          {/* Theme Toggle */}
          <div>
            <ThemeToggle />
          </div>
          
          <Link href="/contact">
            <motion.button 
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Now
            </motion.button>
          </Link>
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <motion.button 
            onClick={toggleMobileMenu}
            className="p-1.5 rounded-md focus:outline-none text-gray-500 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
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
            className="md:hidden bg-white dark:bg-secondary-800 border-t border-gray-100 dark:border-secondary-700/30 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-1">
              <motion.div variants={mobileItemVariants}>
                <Link href="/" 
                  className={`block px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeLink === '/' 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                      : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/about" 
                  className={`block px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeLink === '/about' 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                      : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/classes" 
                  className={`block px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeLink === '/classes' 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                      : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  Classes
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/trainers" 
                  className={`block px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeLink === '/trainers' 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                      : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  Trainers
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link href="/contact" 
                  className={`block px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeLink === '/contact' 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                      : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  Contact
                </Link>
              </motion.div>
              
              {/* Admin Link for Mobile */}
              <motion.div variants={mobileItemVariants}>
                <Link href="/admin/login" 
                  className={`block px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeLink === '/admin/login' 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                      : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Admin
                  </span>
                </Link>
              </motion.div>
              
              <motion.div variants={mobileItemVariants} className="pt-2">
                <Link href="/contact" className="block px-3 py-2.5 bg-primary-500 text-white rounded-md text-center font-medium hover:bg-primary-600 transition-colors duration-200">
                  Join Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}