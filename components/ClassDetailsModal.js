"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function ClassDetailsModal({ isOpen, onClose, classData }) {
  const modalRef = useRef();
  
  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Close on escape key press
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  
  // For debugging
  console.log("Modal should be visible:", { isOpen, classTitle: classData?.title });
  
  return (
    <AnimatePresence>
      {isOpen && classData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Class Image */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={classData.image || "/images/default-class.jpg"}
                alt={classData.title}
                fill
                className="object-contain bg-gray-900"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Title */}
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">
                  {classData.title}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {classData.shortDescription && (
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {classData.shortDescription}
                </p>
              )}
              
              {classData.description ? (
                <div className="prose dark:prose-invert max-w-none">
                  {classData.description.split('\n').map((paragraph, index) => (
                    paragraph ? <p key={index} className="text-gray-700 dark:text-gray-300 mb-3">{paragraph}</p> : <br key={index} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  No detailed description available for this class.
                </p>
              )}
              
              {/* Action button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 