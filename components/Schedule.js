"use client";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deduplicateSchedules, formatDayName, formatTime } from '@/lib/utils';

export default function Schedule({ initialClasses }) {
  // State to track which days are expanded
  const [expandedDays, setExpandedDays] = useState({});
  const [scheduleData, setScheduleData] = useState({});
  const [isLoading, setIsLoading] = useState(!initialClasses);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Function to organize classes by day of week with better error handling
  const organizeByDay = useCallback((classes) => {
    const days = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };

    if (!Array.isArray(classes)) {
      console.warn('organizeByDay received non-array:', classes);
      return days;
    }

    classes.forEach((classItem, index) => {
      try {
        // Validate required fields
        if (!classItem || typeof classItem !== 'object') {
          console.warn(`Invalid class item at index ${index}:`, classItem);
          return;
        }

        if (!classItem.dayOfWeek || !classItem.startTimeString || !classItem.endTimeString) {
          console.warn(`Missing required fields in class item at index ${index}:`, classItem);
          return;
        }

        // Format the class item for display
        const formattedClass = {
          ...classItem,
          id: classItem._id || classItem.id || `class-${index}`,
          startTime: classItem.startTimeString,
          endTime: classItem.endTimeString
        };
        
        // Add to the appropriate day
        if (days[classItem.dayOfWeek]) {
          days[classItem.dayOfWeek].push(formattedClass);
        } else {
          console.warn(`Invalid day of week: ${classItem.dayOfWeek} for class:`, classItem);
        }
      } catch (err) {
        console.error(`Error processing class item at index ${index}:`, err, classItem);
      }
    });

    // Sort classes within each day by start time
    Object.keys(days).forEach(day => {
      days[day].sort((a, b) => {
        try {
          const timeA = a.startTime.split(':').map(Number);
          const timeB = b.startTime.split(':').map(Number);
          
          // Compare hours first
          if (timeA[0] !== timeB[0]) {
            return timeA[0] - timeB[0];
          }
          
          // If hours are equal, compare minutes
          return timeA[1] - timeB[1];
        } catch (err) {
          console.error('Error sorting times:', err, a, b);
          return 0;
        }
      });
    });

    return days;
  }, []);

  // Fetch schedule data if not provided as props with retry logic
  const fetchSchedule = useCallback(async (attempt = 0) => {
    const maxRetries = 2;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/schedules', {
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch schedule`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        // First deduplicate the schedules
        const deduplicatedSchedules = deduplicateSchedules(data.data);
        // Then organize classes by day of the week
        const classesByDay = organizeByDay(deduplicatedSchedules);
        setScheduleData(classesByDay);
        setRetryCount(0);
      } else {
        throw new Error(data.message || 'Invalid schedule data format');
      }
    } catch (err) {
      console.error(`Schedule fetch attempt ${attempt + 1} failed:`, err);
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 300; 
        setTimeout(() => {
          setRetryCount(attempt + 1);
          fetchSchedule(attempt + 1);
        }, delay);
      } else {
        setError('Unable to load schedule. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [organizeByDay]);

  // Process initial classes or fetch from API
  useEffect(() => {
    if (initialClasses) {
      try {
        // If data is provided as props, use it directly
        if (Array.isArray(initialClasses) && initialClasses.length >= 0) {
          const deduplicatedSchedules = deduplicateSchedules(initialClasses);
          const classesByDay = organizeByDay(deduplicatedSchedules);
          setScheduleData(classesByDay);
          setIsLoading(false);
          setError(null);
        } else {
          console.warn('Invalid initialClasses provided:', initialClasses);
          setError('Invalid schedule data provided');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error processing initialClasses:', err);
        setError('Error processing schedule data');
        setIsLoading(false);
      }
    } else {
      fetchSchedule();
    }

    // Cleanup function to prevent stale state
    return () => {
      setError(null);
      setRetryCount(0);
    };
  }, [initialClasses, organizeByDay, fetchSchedule]);

  // Toggle expanded state for a day
  const toggleDay = useCallback((day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  }, []);

  // Check if there are any classes scheduled using useMemo for performance
  const hasClasses = useMemo(() => {
    return Object.values(scheduleData).some(day => Array.isArray(day) && day.length > 0);
  }, [scheduleData]);

  // Animation variants
  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      }
    },
    visible: { 
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      }
    }
  };

  // Manual retry function
  const handleRetry = useCallback(() => {
    setRetryCount(0);
    if (initialClasses) {
      // Re-process initial classes
      const deduplicatedSchedules = deduplicateSchedules(initialClasses);
      const classesByDay = organizeByDay(deduplicatedSchedules);
      setScheduleData(classesByDay);
      setError(null);
    } else {
      fetchSchedule();
    }
  }, [initialClasses, organizeByDay, fetchSchedule]);

  // If there's an error loading the schedule
  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
          {retryCount > 0 && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Retry attempt: {retryCount}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="flex flex-col justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          {retryCount > 0 && (
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading... (Attempt {retryCount + 1})
            </p>
          )}
        </div>
      </div>
    );
  }

  // If no classes are scheduled
  if (!hasClasses) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8">
          <p className="text-gray-600 dark:text-gray-400">No classes are currently scheduled for this week.</p>
          <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm">Please check back later or contact us for more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-2">
        {Object.keys(scheduleData).map((day) => (
          // Only show days that have classes
          scheduleData[day].length > 0 && (
            <div 
              key={day}
              className="border-b border-gray-100 dark:border-secondary-800 last:border-0"
            >
              <button
                onClick={() => toggleDay(day)}
                className="w-full py-6 flex justify-between items-center bg-transparent focus:outline-none group"
              >
                <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white transition-colors group-hover:text-primary-500">
                  {formatDayName(day).toUpperCase()}
                </h3>
                <motion.div
                  animate={{ rotate: expandedDays[day] ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-3xl sm:text-4xl font-light text-gray-400 dark:text-gray-500 transition-colors group-hover:text-primary-500"
                >
                  +
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedDays[day] && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={contentVariants}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 space-y-4">
                      {scheduleData[day].map((classItem) => (
                        <div 
                          key={classItem.id}
                          className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-50 dark:bg-secondary-800/50 p-4 rounded-md"
                        >
                          <div>
                            <h4 className="font-medium text-lg text-gray-900 dark:text-white">
                              {classItem.className || 'Untitled Class'}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {classItem.trainer ? `Instructor: ${classItem.trainer.name}` : "No Instructor"}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded text-sm font-medium">
                            {classItem.startTime} - {classItem.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        ))}
      </div>
    </div>
  );
} 