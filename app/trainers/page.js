"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from '../../components/TiltCard';
import { useTheme } from '../../components/ThemeProvider';

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

export default function TrainersPage() {
  const { theme, mounted } = useTheme();
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function fetchTrainers() {
    try {
      const response = await fetch('/api/trainers');
      const data = await response.json();
      
      if (data.success) {
        setTrainers(data.data);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchTrainers();
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Our Expert Trainers</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Meet the professionals who will guide you on your martial arts journey.
          </p>
        </motion.div>
        
        {/* Trainers Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {trainers.map((trainer) => (
              <motion.div key={trainer._id} variants={fadeInUp}>
                <TiltCard>
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-80">
                      <Image
                        src={trainer.image || "/images/placeholder-trainer.jpg"}
                        alt={trainer.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                        <p className="text-red-400 font-medium">{trainer.specialization}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 transition-colors duration-300">{trainer.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trainer.certifications && trainer.certifications.map((cert, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors duration-300">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <Link 
                        href={`/trainers/${trainer._id}`}
                        className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center bg-gradient-to-r from-red-600 to-red-800 p-12 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Train With The Best</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Our trainers are ready to help you achieve your fitness and martial arts goals. Book a session today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-md"
            >
              Book a Session
            </Link>
            <Link 
              href="/classes" 
              className="bg-transparent hover:bg-red-700 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              View Classes
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 