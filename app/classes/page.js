"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import Schedule from "../../components/Schedule";
import ClassesSlider from "../../components/ClassesSlider";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Class Types Slider */}
        <ClassesSlider />

        {/* Weekly Schedule Section */}
        <div className="container mx-auto px-4 py-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
          >
            Weekly Class Schedule
          </motion.h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p>{error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <Schedule initialClasses={scheduleData} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 