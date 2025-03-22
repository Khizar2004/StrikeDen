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
    offset: ["start start", "end start"]
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
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video or image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            UNLEASH YOUR <span className="text-red-500">FIGHTING</span> SPIRIT
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto"
          >
            Join Strike Den, where champions are forged through discipline, technique, and heart.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton>
              <Link href="/classes" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 inline-block">
                JOIN NOW
              </Link>
            </MagneticButton>
            
            <MagneticButton>
              <Link href="/about" className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 inline-block">
                LEARN MORE
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
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Why Choose Strike Den?</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              We offer a comprehensive approach to martial arts training with state-of-the-art facilities and expert coaching.
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <TiltCard>
              <motion.div variants={fadeInUp} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full transition-colors duration-300">
                <div className="text-red-500 text-4xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Expert Coaches</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Train with professional fighters and certified coaches who are dedicated to your progress and safety.
                </p>
              </motion.div>
            </TiltCard>
            
            <TiltCard>
              <motion.div variants={fadeInUp} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full transition-colors duration-300">
                <div className="text-red-500 text-4xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Supportive Community</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Join a community of like-minded individuals who support and motivate each other to achieve their goals.
                </p>
              </motion.div>
            </TiltCard>
            
            <TiltCard>
              <motion.div variants={fadeInUp} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full transition-colors duration-300">
                <div className="text-red-500 text-4xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Modern Facilities</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Train in our state-of-the-art facility with professional-grade equipment and dedicated training areas.
                </p>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
      
      {/* Classes Preview Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Our Classes</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Discover our diverse range of classes designed for all skill levels.
            </motion.p>
          </motion.div>
          
          {isClassesLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No classes available at the moment.</p>
            </div>
          ) : (
            <>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {classes.slice(0, 3).map((classItem, index) => (
                  <motion.div key={classItem._id || index} variants={fadeInUp} className="relative group overflow-hidden rounded-xl shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <Image 
                      src={classItem.image || `/images/${classItem.slug || 'default'}-class.jpg`} 
                      alt={classItem.title} 
                      width={600} 
                      height={400} 
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/cta-background.jpg";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">{classItem.title}</h3>
                      <p className="text-gray-200 mb-4">{classItem.shortDescription || 'Join our professional instructors and master this discipline.'}</p>
                      <Link href={`/classes/${classItem.slug || classItem._id}`} className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        Learn More
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mt-12"
              >
                <Link href="/classes" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
                  View All Classes
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>
      
      {/* Trainers Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Meet Our Trainers</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Learn from experienced professionals who are passionate about helping you achieve your goals.
            </motion.p>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {trainers.map((trainer, index) => (
                <motion.div key={trainer._id || index} variants={fadeInUp}>
                  <GlassCard>
                    <div className="relative group overflow-hidden rounded-xl">
                      <Image 
                        src={trainer.image || "/images/placeholder-trainer.jpg"} 
                        alt={trainer.name} 
                        width={400} 
                        height={500} 
                        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                          <p className="text-white">{trainer.bio}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{trainer.name}</h3>
                      <p className="text-red-500 font-medium mb-4">{trainer.specialization}</p>
                      <div className="flex justify-center space-x-4">
                        {trainer.socialMedia?.instagram && (
                          <a href={trainer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                        {trainer.socialMedia?.twitter && (
                          <a href={trainer.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-12"
          >
            <Link href="/trainers" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
              View All Trainers
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 dark:bg-gray-800 text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 dark:bg-black/60 z-10 transition-colors duration-300"></div>
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
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6">Ready to Transform Your Life?</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Join Strike Den today and start your journey toward becoming a stronger, more confident version of yourself.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <MagneticButton>
                <Link href="/contact" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 inline-block">
                  GET STARTED NOW
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
