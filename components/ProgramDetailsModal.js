"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function ProgramDetailsModal({ isOpen, onClose, programData }) {
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

  const { pricing } = programData || {};
  const hasPricing = pricing && (pricing.walkIn > 0 || pricing.weekly > 0 || pricing.monthly > 0 || pricing.annual > 0);

  return (
    <AnimatePresence>
      {isOpen && programData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 pt-20"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-20 transform hover:rotate-90 transition-transform duration-300"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Program Image with Gradient Overlay */}
            <div className="relative w-full aspect-video bg-black">
              <Image
                src={programData.image || "/images/default-class.jpg"}
                alt={programData.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none"></div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-2">
                  {programData.title}
                </h2>
                {programData.shortDescription && (
                  <p className="text-xl text-gray-200 mt-2 max-w-3xl">
                    {programData.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Pricing Section */}
              {hasPricing && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 inline-block pb-2 border-b-2 border-red-600">
                    Pricing Options
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {pricing.walkIn > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Walk-in</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₨{pricing.walkIn.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {pricing.weekly > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weekly</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₨{pricing.weekly.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {pricing.monthly > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monthly</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₨{pricing.monthly.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {pricing.annual > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Annual</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₨{pricing.annual.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {programData.description && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 inline-block pb-2 border-b-2 border-red-600">
                    About This Program
                  </h3>
                  <div className="prose dark:prose-invert max-w-none mt-4">
                    {programData.description.split('\n').map((paragraph, index) => (
                      paragraph ? <p key={index} className="text-gray-700 dark:text-gray-300 mb-3">{paragraph}</p> : <br key={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button
                    className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Join Now
                  </button>
                </Link>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
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
