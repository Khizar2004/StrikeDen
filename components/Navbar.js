"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const pathname = usePathname();

  // Set active link based on pathname
  useEffect(() => {
    setActiveLink(pathname);
    setMobileMenuOpen(false); // Close mobile menu on route change
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Cleanup body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const navbarClasses = "fixed top-0 left-0 w-full bg-white dark:bg-secondary-900 border-b border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 shadow-sm";

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Our Team', path: '/trainers' },
    { name: 'Contact', path: '/contact' },
  ];

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav 
        className={navbarClasses}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <div className="h-10 w-10 relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
              <Image
                src="/images/logo.jpg"
                alt="StrikeDen Logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline font-bold text-xl tracking-tight leading-none mt-3.5">
                <span className="text-primary-500">Strike</span>
                <span className="text-gray-800 dark:text-white">Den</span>
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Fitness Center
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 dark:bg-secondary-800/50 p-1 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            {navLinks.slice(0, 4).map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeLink === link.path 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                {activeLink === link.path && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white dark:bg-secondary-700 rounded-full shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
             <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
             <div className="flex items-center px-2 space-x-4">
                {navLinks.slice(4).map((link) => (
                   <Link 
                   key={link.path} 
                   href={link.path}
                   className={`text-sm font-medium transition-colors duration-200 ${
                    activeLink === link.path 
                      ? 'text-primary-500 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                 >
                   {link.name}
                 </Link>
                ))}
             </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
             <Link href="/admin/login" className="text-gray-400 hover:text-primary-500 transition-colors">
                <span className="sr-only">Admin</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </Link>
            <ThemeToggle />
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-primary-500/20 transition-all duration-300"
              >
                Join Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <ThemeToggle />
            <button 
              onClick={toggleMobileMenu}
              className="relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group focus:outline-none"
            >
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-gray-800 dark:bg-white rounded-full block transition-all duration-300"
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-gray-800 dark:bg-white rounded-full block transition-all duration-300"
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-gray-800 dark:bg-white rounded-full block transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-white dark:bg-secondary-900 z-40 flex flex-col pt-28 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.path} variants={mobileItemVariants}>
                  <Link 
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-bold tracking-tight ${
                      activeLink === link.path
                        ? 'text-primary-500'
                        : 'text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={mobileItemVariants} className="h-px bg-gray-100 dark:bg-gray-800 w-full my-6" />
              
              <motion.div variants={mobileItemVariants} className="grid grid-cols-2 gap-4">
                <Link 
                   href="/privacy"
                   className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Privacy Policy
                </Link>
                 <Link 
                   href="/rules"
                   className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Gym Rules
                </Link>
                 <Link 
                   href="/admin/login"
                   className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin Access
                </Link>
              </motion.div>

              <motion.div variants={mobileItemVariants} className="pt-8">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-full py-4 bg-primary-500 text-white text-center text-lg font-bold rounded-xl shadow-xl shadow-primary-500/20 active:scale-95 transition-all">
                    Start Your Journey
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}