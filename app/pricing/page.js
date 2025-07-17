"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PricingCard from "../../components/PricingCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { trackFacebookEvent, FB_EVENTS } from '../../lib/facebook';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PricingPage() {
  const [classes, setClasses] = useState([]);
  const [globalPromotion, setGlobalPromotion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track page view when component mounts
  useEffect(() => {
    trackFacebookEvent(FB_EVENTS.VIEW_CONTENT, {
      content_name: 'Pricing Page',
      content_category: 'Pricing Information',
      content_type: 'product_group',
    });
  }, []);

  // Fetch classes and global promotion
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch classes and global promotion in parallel
        const [classesResponse, settingsResponse] = await Promise.all([
          fetch('/api/classes'),
          fetch('/api/settings')
        ]);
        
        const classesData = await classesResponse.json();
        const settingsData = await settingsResponse.json();
        
        if (classesData.success) {
          // Filter active classes
          const activeClasses = classesData.classes.filter(cls => cls.active);
          setClasses(activeClasses);
        } else {
          setError('Failed to load classes');
        }
        
        if (settingsData.success) {
          setGlobalPromotion(settingsData.globalPromotion);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load pricing information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gray-900">
        <Image
          src="/images/cta-background.jpg"
          alt="Class Pricing"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black text-white tracking-tighter"
          >
            CLASS PRICING
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your fitness journey. All classes are designed to challenge and inspire you.
          </motion.p>
        </motion.div>

        {/* Sleek Global Promotion Banner */}
        {globalPromotion && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative mb-12 overflow-hidden"
          >
            {/* Main banner container */}
            <div className="relative bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-lg border border-red-600/30 dark:border-red-600/20 backdrop-blur-sm">
              {/* Subtle animated background */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(220,38,38,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }} />
                </div>
                
                {/* Flowing gradient waves */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.08) 20%, rgba(220,38,38,0.12) 40%, rgba(220,38,38,0.08) 60%, transparent 80%)",
                    backgroundSize: "300% 100%"
                  }}
                />
                
                {/* Subtle radial highlights */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-8 w-32 h-32 bg-red-500/5 rounded-full blur-xl"
                />
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute bottom-4 left-8 w-24 h-24 bg-red-500/8 rounded-full blur-lg"
                />
                
                {/* Red accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent origin-left"
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10 px-8 py-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-center space-x-3 mb-3"
                >
                  {/* Status indicator */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-red-500 rounded-full"
                  />
                  <span className="text-red-600 dark:text-red-400 text-sm font-medium uppercase tracking-wider">
                    Ongoing Promotions
                  </span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                  className="text-gray-900 dark:text-white text-xl md:text-2xl lg:text-3xl font-black whitespace-pre-line leading-tight tracking-tight"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(220,38,38,0)",
                        "0 0 8px rgba(220,38,38,0.3)",
                        "0 0 0px rgba(220,38,38,0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {globalPromotion}
                  </motion.span>
                </motion.div>
              </div>
              
              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent origin-right"
              />
            </div>
          </motion.div>
        )}

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {classes.map((classData) => (
            <motion.div key={classData._id} variants={fadeInUp}>
              <PricingCard classData={classData} />
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Contact us today to learn more about our classes and membership options.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Today
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
