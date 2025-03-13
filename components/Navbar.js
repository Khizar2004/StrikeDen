"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    ? 'fixed top-0 left-0 w-full bg-white/90 backdrop-blur-lg text-secondary-900 shadow-sm z-50'
    : 'fixed top-0 left-0 w-full bg-gradient-to-b from-black/50 to-transparent text-white z-50';

  const linkClasses = scrolled
    ? 'relative text-secondary-800 hover:text-primary transition-colors duration-200 font-medium'
    : 'relative text-white hover:text-white/80 transition-colors duration-200 font-medium text-shadow';

  const activeLinkClasses = 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-accent';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={navbarClasses}>
      <div className="container-padded flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className={scrolled ? 'text-primary' : 'text-white text-shadow-sm'}>Strike</span>
          <span className={scrolled ? 'text-accent' : 'text-accent-light text-shadow-sm'}>Den</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className={`${linkClasses} ${activeLinkClasses}`}>Home</Link>
          <Link href="/about" className={linkClasses}>About</Link>
          <Link href="/classes" className={linkClasses}>Classes</Link>
          <Link href="/trainers" className={linkClasses}>Trainers</Link>
          <Link href="/contact" className={linkClasses}>Contact</Link>
        </div>

        <Link href="/contact" className="hidden md:block">
          <button className={scrolled ? 'btn btn-primary' : 'btn btn-accent text-shadow-sm'}>Join Now</button>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg focus:outline-none"
        >
          <svg 
            className={`w-6 h-6 ${scrolled ? 'text-secondary-900' : 'text-white'}`} 
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
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md"
        >
          <div className="container-padded py-4 flex flex-col space-y-4">
            <Link href="/" className="px-4 py-2 text-secondary-900 hover:bg-secondary-50 rounded-lg">Home</Link>
            <Link href="/about" className="px-4 py-2 text-secondary-900 hover:bg-secondary-50 rounded-lg">About</Link>
            <Link href="/classes" className="px-4 py-2 text-secondary-900 hover:bg-secondary-50 rounded-lg">Classes</Link>
            <Link href="/trainers" className="px-4 py-2 text-secondary-900 hover:bg-secondary-50 rounded-lg">Trainers</Link>
            <Link href="/contact" className="px-4 py-2 text-secondary-900 hover:bg-secondary-50 rounded-lg">Contact</Link>
            <Link href="/contact" className="px-4 py-2 bg-primary text-white rounded-lg text-center">Join Now</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}