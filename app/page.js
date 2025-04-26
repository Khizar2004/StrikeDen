"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";
import GlassCard from "../components/GlassCard";
import { useTheme } from "../components/ThemeProvider";

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

export default function Home() {
  const { theme, mounted } = useTheme();
  const [trainers, setTrainers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassesLoading, setIsClassesLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false // Fix for the hydration warning
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  async function fetchTrainers() {
    try {
      const response = await fetch('/api/trainers');
      const data = await response.json();
      
      if (data.success) {
        // Get only 3 trainers for the homepage
        setTrainers(data.data.slice(0, 3));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setIsLoading(false);
    }
  }
  
  async function fetchClasses() {
    try {
      setIsClassesLoading(true);
      const response = await fetch('/api/classes');
      const data = await response.json();
      
      if (data.success) {
        setClasses(data.classes || []);
      }
      
      setIsClassesLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setIsClassesLoading(false);
    }
  }
  
  useEffect(() => {
    fetchTrainers();
    fetchClasses();
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video or image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Hero content */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            STRIKE DEN
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto"
          >
            Where champions are forged through discipline, technique, and heart
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MagneticButton>
              <Link href="/classes" className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-bold text-lg transition-colors duration-300 inline-block">
                EXPLORE CLASSES
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Training Programs Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight tracking-tighter">
                TRAINING FOR <span className="text-red-600">EVERY BODY</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Whether you're looking to learn self-defense, get in shape, or train for competition, 
                Strike Den offers diverse programs for all skill levels and goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Combat Training</h3>
                    <p className="text-gray-600 dark:text-gray-400">Expert instruction in various fighting styles</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Strength & Conditioning</h3>
                    <p className="text-gray-600 dark:text-gray-400">Build functional strength and endurance</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Group & Private Training</h3>
                    <p className="text-gray-600 dark:text-gray-400">Options to suit your preferences</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -top-5 -left-5 w-24 h-24 bg-red-600 rounded-xl -z-10"></div>
              <Image 
                src="/images/gym-story.jpg" 
                alt="Strike Den Training" 
                width={600} 
                height={700} 
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-gray-800 dark:bg-red-600 rounded-xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Classes Preview Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
              FEATURED CLASSES
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our diverse range of classes designed to challenge and transform you
            </motion.p>
          </motion.div>
          
          {isClassesLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/50 rounded-xl">
              <p className="text-gray-300">Our class schedule is being updated. Check back soon!</p>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {classes.slice(0, 3).map((classItem, index) => (
                <motion.div 
                  key={classItem._id || index} 
                  variants={fadeInUp} 
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 h-96 transform transition-all duration-300 hover:shadow-2xl">
                    <Image 
                      src={classItem.image || `/images/default-class.jpg`} 
                      alt={classItem.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-class.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs uppercase tracking-wider font-bold rounded-full mb-3">
                        {classItem.category || 'Featured Class'}
                      </span>
                      <h3 className="text-3xl font-bold text-white mt-2 mb-3 group-hover:text-red-400 transition-colors duration-300">
                        {classItem.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {classItem.shortDescription || 'Join our expert instructors and master this discipline.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link 
              href="/classes" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
            >
              VIEW ALL CLASSES
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Trainers Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">
                EXPERT <span className="text-red-600">TRAINERS</span> WHO CARE
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our instructors bring years of real-world experience and passion to every class. 
                They're dedicated to your growth, safety, and success in achieving your fitness goals.
              </p>
              <Link 
                href="/trainers" 
                className="inline-flex items-center text-red-600 border-b-2 border-red-600 pb-1 font-bold hover:text-red-700 hover:border-red-700 transition-colors duration-300"
              >
                MEET OUR FULL TEAM
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
            
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              >
                {trainers.slice(0, 2).map((trainer, index) => (
                  <motion.div key={trainer._id || index} variants={fadeInUp}>
                    <Link href={`/trainers/${trainer._id}`} className="block">
                      <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                        <Image 
                          src={trainer.image || "/images/placeholder-trainer.jpg"} 
                          alt={trainer.name} 
                          width={300} 
                          height={400} 
                          className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
                          <p className="text-red-400 font-medium mb-2">{trainer.specialization}</p>
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {trainer.bio || `Expert instructor with years of experience.`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="/images/cta-background.jpg" 
            alt="Training at Strike Den" 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-black/50 backdrop-blur-sm p-12 rounded-2xl"
          >
            <motion.h2 
              variants={fadeInUp} 
              className="text-5xl md:text-6xl font-black text-white mb-6 text-center tracking-tighter"
            >
              START YOUR JOURNEY TODAY
            </motion.h2>
            <motion.p 
              variants={fadeInUp} 
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 text-center"
            >
              Join our community and transform your mind and body through disciplined training and expert guidance.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center"
            >
              <MagneticButton>
                <Link 
                  href="/contact" 
                  className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-bold text-lg transition-colors duration-300 inline-block"
                >
                  GET STARTED
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
