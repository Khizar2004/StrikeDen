"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";
import GlassCard from "../components/GlassCard";

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
  const [trainers, setTrainers] = useState([]);
  const containerRef = useRef(null);

  // Add scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await fetch("/api/trainers");
        const data = await response.json();
        if (data.success) {
          setTrainers(data.data);
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    }

    fetchTrainers();
  }, []);

  return (
    <main className="relative min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0 bg-[url('/gym-bg.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 container-padded"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ opacity, scale, y }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            variants={fadeInUp}
          >
            <span className="block">Elevate Your</span>
            <span className="text-gradient">Martial Arts Journey</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/80"
            variants={fadeInUp}
          >
            Train like a champion at Karachi's premier MMA gym. 
            Expert coaches, state-of-the-art facilities, and an unmatched community.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeInUp}
          >
            <MagneticButton strength={30}>
              <Link href="/classes">
                <button className="btn btn-primary px-8 py-3.5 text-base">
                  Explore Classes
                </button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={30}>
              <Link href="/contact">
                <button className="btn btn-accent px-8 py-3.5 text-base">
                  Join Now
                </button>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="40" rx="11" stroke="white" strokeWidth="2"/>
            <circle className="animate-pulse" cx="12" cy="12" r="4" fill="white"/>
          </svg>
        </motion.div>
      </section>

      {/* Stats Section with Refined Design */}
      <section className="py-20 bg-white">
        <div className="container-padded">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">5+</span>
              <p className="mt-2 text-secondary-600">Years Experience</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">10+</span>
              <p className="mt-2 text-secondary-600">Expert Coaches</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">780+</span>
              <p className="mt-2 text-secondary-600">Active Members</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">95%</span>
              <p className="mt-2 text-secondary-600">Satisfaction Rate</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-secondary-50">
        <div className="container-padded">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-primary font-medium mb-3">OUR STRENGTHS</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">Why Choose Strike Den</motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-secondary-600 max-w-2xl mx-auto">
              Experience a world-class training environment with professional coaching and an unmatched fitness community.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Feature #1 */}
            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full">
                <div className="card hover:shadow-smooth-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 mb-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Elite Training</h3>
                  <p className="text-secondary-600">
                    Train with experienced professionals in a disciplined environment.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature #2 */}
            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full">
                <div className="card hover:shadow-smooth-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 mb-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Expert Coaches</h3>
                  <p className="text-secondary-600">
                    Our certified trainers provide guidance for all skill levels.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature #3 */}
            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full">
                <div className="card hover:shadow-smooth-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 mb-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Modern Equipment</h3>
                  <p className="text-secondary-600">
                    Train with state-of-the-art equipment and facilities.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature #4 */}
            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full">
                <div className="card hover:shadow-smooth-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 mb-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Strong Community</h3>
                  <p className="text-secondary-600">
                    Join a community of like-minded individuals pushing their limits.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet Our Trainers Section */}
      <section className="py-24 bg-white">
        <div className="container-padded">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-primary font-medium mb-3">OUR TEAM</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">Meet Our Expert Trainers</motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-secondary-600 max-w-2xl mx-auto">
              Our professional trainers are dedicated to helping you achieve your fitness and martial arts goals.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {trainers.length > 0 ? (
              trainers.slice(0, 3).map((trainer) => (
                <motion.div key={trainer._id} variants={fadeInUp}>
                  <TiltCard tiltMaxAngle={10} className="h-full">
                    <Link href={`/trainers/${trainer._id}`}>
                      <div className="group relative card p-0 overflow-hidden hover:shadow-smooth-lg transition-all duration-300 h-full">
                        <div className="relative h-80 w-full overflow-hidden">
                          <Image
                            src={trainer.image ? trainer.image : "/default-trainer.jpg"}
                            alt={trainer.name}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold">{trainer.name}</h3>
                          <p className="text-primary">{trainer.specialization}</p>
                          <p className="text-secondary-600 mt-2">Experience: {trainer.experience} years</p>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))
            ) : (
              <motion.p variants={fadeInUp} className="col-span-3 text-center text-secondary-500">
                Loading trainers...
              </motion.p>
            )}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <MagneticButton>
              <Link href="/trainers">
                <button className="btn btn-secondary">
                  View All Trainers
                </button>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-24 bg-secondary-50 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-200/30 to-primary-400/30 blur-3xl"></div>
          <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent-light/20 to-accent/20 blur-3xl"></div>
        </div>
        
        <div className="container-padded relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-primary font-medium mb-3">PRICING</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">Membership Plans</motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-secondary-600 max-w-2xl mx-auto">
              Choose the plan that best suits your training needs and goals.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Basic Plan */}
            <motion.div variants={fadeInUp}>
              <GlassCard className="rounded-xl p-8" glowColor="rgba(0, 0, 0, 0.1)" borderColor="rgba(0, 0, 0, 0.1)" blurStrength={5}>
                <h3 className="text-2xl font-semibold text-secondary-900">Basic Plan</h3>
                <p className="text-secondary-600 mt-1 mb-4">Essential gym access</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary-900">$15</span>
                  <span className="text-secondary-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-secondary-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Gym access (6AM-10PM)</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Group training sessions</span>
                  </li>
                  <li className="flex items-center text-secondary-400">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>1-on-1 Coaching</span>
                  </li>
                </ul>
                <MagneticButton className="w-full">
                  <Link href="/contact" className="block w-full">
                    <button className="btn btn-secondary w-full border-0">Choose Plan</button>
                  </Link>
                </MagneticButton>
              </GlassCard>
            </motion.div>

            {/* Standard Plan */}
            <motion.div variants={fadeInUp}>
              <GlassCard className="rounded-xl p-8 relative" 
                glowColor="rgba(0, 112, 243, 0.25)" 
                borderColor="rgba(0, 112, 243, 0.3)" 
                blurStrength={5}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white text-sm font-medium py-1 px-4 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-2xl font-semibold text-primary">Standard Plan</h3>
                <p className="text-primary-700 mt-1 mb-4">Includes coaching sessions</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$30</span>
                  <span className="text-primary-700">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-secondary-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Gym access (6AM-10PM)</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited group training</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>1-on-1 Coaching (2 sessions/month)</span>
                  </li>
                </ul>
                <MagneticButton className="w-full">
                  <Link href="/contact" className="block w-full">
                    <button className="btn bg-primary text-white hover:bg-primary-600 w-full border-0">Choose Plan</button>
                  </Link>
                </MagneticButton>
              </GlassCard>
            </motion.div>

            {/* Premium Plan */}
            <motion.div variants={fadeInUp}>
              <GlassCard className="rounded-xl p-8" glowColor="rgba(0, 0, 0, 0.1)" borderColor="rgba(0, 0, 0, 0.1)" blurStrength={5}>
                <h3 className="text-2xl font-semibold text-secondary-900">Premium Plan</h3>
                <p className="text-secondary-600 mt-1 mb-4">Full access & personalized coaching</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary-900">$50</span>
                  <span className="text-secondary-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-secondary-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>24/7 Gym access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited group training</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited 1-on-1 coaching</span>
                  </li>
                </ul>
                <MagneticButton className="w-full">
                  <Link href="/contact" className="block w-full">
                    <button className="btn btn-secondary w-full border-0">Choose Plan</button>
                  </Link>
                </MagneticButton>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/gym-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-600"></div>
        <div className="container-padded relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
              <p className="mt-4 text-white/80 max-w-xl">
                Join Strike Den today and transform your training with world-class coaches in a premium MMA facility.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <MagneticButton strength={40}>
                <Link href="/contact">
                  <button className="btn bg-white text-primary hover:bg-white/90 px-8 py-3.5 text-base">
                    Join Now
                  </button>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
