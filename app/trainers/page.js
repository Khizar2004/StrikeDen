"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../components/ThemeProvider';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

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
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  
  async function fetchTrainers() {
    try {
      const response = await fetch('/api/trainers');
      const data = await response.json();
      
      if (data.success) {
        setTrainers(data.data);
        if (data.data.length > 0) {
          setSelectedTrainer(data.data[0]);
        }
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
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gray-900">
        <Image
          src="/images/cta-background.jpg"
          alt="Our Trainers"
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
            OUR TRAINERS
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
            Our instructors bring years of experience and passion to every class. With diverse backgrounds in 
            various martial arts disciplines, they're dedicated to helping you achieve your fitness and training goals.
          </motion.p>
        </motion.div>
        
        {/* Trainers Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : trainers.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <p className="text-xl text-gray-500 dark:text-gray-400">Our trainer information is being updated. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Featured Trainer */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 gap-4 sticky top-24"
              >
                {trainers.map((trainer) => (
                  <motion.div 
                    key={trainer._id} 
                    variants={fadeInUp}
                    className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 flex items-center
                      ${selectedTrainer?._id === trainer._id 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setSelectedTrainer(trainer)}
                  >
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-red-500">
                      <Image
                        src={trainer.image || "/images/placeholder-trainer.jpg"}
                        alt={trainer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className={`font-bold ${selectedTrainer?._id === trainer._id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {trainer.name}
                      </h3>
                      <p className={`text-sm ${selectedTrainer?._id === trainer._id ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                        {trainer.specialization}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Trainer Profile */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {selectedTrainer && (
                <motion.div
                  key={selectedTrainer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="relative h-[40vh]">
                    <Image
                      src={selectedTrainer.image || "/images/placeholder-trainer.jpg"}
                      alt={selectedTrainer.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                        <div>
                          <h2 className="text-4xl font-black text-white mb-2">{selectedTrainer.name}</h2>
                          <p className="text-red-400 text-xl font-bold">{selectedTrainer.specialization}</p>
                        </div>
                        <div className="flex mt-4 md:mt-0 space-x-3">
                          {selectedTrainer.socialMedia?.instagram && (
                            <a href={selectedTrainer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" 
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                              <FaInstagram className="text-white" />
                            </a>
                          )}
                          {selectedTrainer.socialMedia?.twitter && (
                            <a href={selectedTrainer.socialMedia.twitter} target="_blank" rel="noopener noreferrer" 
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                              <FaTwitter className="text-white" />
                            </a>
                          )}
                          {selectedTrainer.socialMedia?.linkedin && (
                            <a href={selectedTrainer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" 
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                              <FaLinkedinIn className="text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h3>
                        <div className="text-gray-700 dark:text-gray-300 space-y-4">
                          <p>{selectedTrainer.bio || "Experienced instructor passionate about helping students achieve their goals."}</p>
                          {selectedTrainer.experience && (
                            <p><span className="font-semibold">Experience:</span> {selectedTrainer.experience} years</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Expertise</h3>
                        {selectedTrainer.certifications && selectedTrainer.certifications.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedTrainer.certifications.map((cert, index) => (
                              <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                                {cert}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">Certifications information coming soon</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Class Schedule</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Check out {selectedTrainer.name}'s weekly classes:
                      </p>
                      <Link 
                        href={`/trainers/${selectedTrainer._id}`}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        <span>View Schedule</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 p-12 rounded-2xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="/images/cta-background.jpg" 
              alt="Training background" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Ready to Train With Our Experts?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-center">
              Whether you're a beginner or experienced practitioner, our trainers are ready to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition-colors duration-300 text-center"
              >
                Book a Session
              </Link>
              <Link 
                href="/classes" 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition-colors duration-300 text-center"
              >
                View Class Schedule
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 