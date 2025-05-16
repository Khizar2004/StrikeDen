"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import { deduplicateSchedules, formatDayName } from '@/lib/utils';

export default function TrainerProfile() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [trainer, setTrainer] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Fetch trainer data
        const trainerResponse = await fetch(`/api/trainers/${id}`);
        const trainerData = await trainerResponse.json();
        
        if (trainerData.success) {
          setTrainer(trainerData.data);
          
          // Fetch schedule data for this trainer
          const scheduleResponse = await fetch(`/api/trainers/${id}/schedules`);
          const scheduleData = await scheduleResponse.json();
          
          if (scheduleData.success) {
            // Apply deduplication logic from utils
            setSchedules(deduplicateSchedules(scheduleData.data));
          }
        } else {
          setError("Failed to load trainer information");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to load information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) fetchData();
  }, [id]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center py-16 px-6">
        <div className="max-w-3xl text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!trainer) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
      <p className="text-xl">Trainer not found</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Trainer header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0">
                <img
                  src={trainer.image || "https://via.placeholder.com/150"}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold">{trainer.name}</h1>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  {Array.isArray(trainer.specialization) 
                    ? trainer.specialization.map((spec, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white"
                        >
                          {spec}
                        </span>
                      ))
                    : <p className="text-xl text-white/80">{trainer.specialization}</p>
                  }
                </div>
                <div className="mt-4 text-white/70">
                  <p>Experience: {trainer.experience} years</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bio */}
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
            <p className="text-gray-700 dark:text-gray-300">{trainer.bio || "No bio available."}</p>
          </div>
        </motion.div>
        
        {/* Class Schedule Section */}
        <motion.div 
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Schedule</h2>
          </div>
          
          {schedules.length === 0 ? (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 mt-4">No classes currently scheduled with this trainer.</p>
            </div>
          ) : (
            <motion.div 
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={staggeredContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Group schedules by day */}
              {Array.from(new Set(schedules.map(schedule => schedule.dayOfWeek))).sort((a, b) => {
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                return days.indexOf(a) - days.indexOf(b);
              }).map(day => (
                <motion.div 
                  key={day}
                  variants={fadeIn}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                >
                  <div className="bg-gray-100 dark:bg-gray-600 px-4 py-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{formatDayName(day)}</h3>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-600">
                    {schedules
                      .filter(schedule => schedule.dayOfWeek === day)
                      .sort((a, b) => {
                        const timeA = a.startTimeString.split(':').map(Number);
                        const timeB = b.startTimeString.split(':').map(Number);
                        return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
                      })
                      .map(schedule => (
                        <div key={schedule._id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{schedule.className}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {schedule.startTimeString} - {schedule.endTimeString}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/trainers" 
            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Trainers
          </Link>
        </div>
      </div>
    </main>
  );
}
