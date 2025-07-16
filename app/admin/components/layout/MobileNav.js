"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Mobile navigation for the admin panel
 */
export default function MobileNav({ activeTab, setActiveTab, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { id: "trainers", label: "Manage Trainers" },
    { id: "schedules", label: "Class Schedule" },
    { id: "offeredClasses", label: "Offered Classes" },
    { id: "settings", label: "Site Settings" },
  ];
  
  const menuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }
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

  const itemVariants = {
    closed: { y: -5, opacity: 0 },
    open: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };
  
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">StrikeDen Admin</span>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id 
                      ? "bg-red-600 text-white" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                variants={itemVariants}
                onClick={handleLogout}
                className="w-full text-left mt-4 flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 