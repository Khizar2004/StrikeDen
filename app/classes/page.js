"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeProvider";
import Schedule from "../../components/Schedule";
import ClassesSlider from "../../components/ClassesSlider";

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

export default function ClassesPage() {
  const { theme } = useTheme();
  const [scheduleData, setScheduleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schedule data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/schedules');
        const data = await response.json();
        
        if (data.success) {
          setScheduleData(data.data || []);
        } else {
          setError("Failed to load class data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load class data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gray-900">
        <Image
          src="/images/cta-background.jpg"
          alt="Classes at Strike Den"
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
            TRAINING PROGRAMS
          </motion.h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            At Strike Den, we offer a comprehensive range of classes designed for all skill levels. 
            From beginners looking to learn the basics to advanced practitioners seeking to refine their technique, 
            our diverse program has something for everyone.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-lg text-gray-500 dark:text-gray-400">
            Explore our class options below and find the perfect fit for your goals and schedule.
          </motion.p>
        </motion.div>
        
        {/* Class Offerings Slider */}
        <ClassesSlider />
        
        {/* Weekly Schedule Section with improved styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl font-black text-center text-gray-900 dark:text-white mb-16 tracking-tighter"
          >
            WEEKLY SCHEDULE
          </motion.h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <p className="text-xl">{error}</p>
              <button 
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
              <Schedule initialClasses={scheduleData} />
            </motion.div>
          )}
        </motion.div>
        
        {/* Training Information */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
              PERSONALIZED <span className="text-red-600">TRAINING</span> APPROACH
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Our professional instructors adapt each class to accommodate different skill levels, 
              ensuring everyone gets the most out of their training experience.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Small class sizes for personalized attention</span>
              </li>
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Beginner-friendly introduction to techniques</span>
              </li>
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Advanced training for experienced practitioners</span>
              </li>
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Private sessions available for focused improvement</span>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="order-1 md:order-2 relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-600 rounded-xl -z-10"></div>
            <Image
              src="/images/gym-story.jpg"
              alt="Personalized Training"
              width={600}
              height={400}
              className="rounded-xl shadow-xl object-cover w-full h-80 md:h-96"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 