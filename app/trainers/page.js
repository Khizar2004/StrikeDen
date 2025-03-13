"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from '../../components/TiltCard';

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
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainers() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/trainers");
        const data = await response.json();
        if (data.success) {
          setTrainers(data.data);
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrainers();
  }, []);

  return (
    <main className="min-h-screen py-24 bg-white">
      <div className="container-padded">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="inline-block text-primary font-medium mb-3">OUR TEAM</motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">Meet Our Expert Trainers</motion.h1>
          <motion.p variants={fadeInUp} className="mt-6 text-lg text-secondary-600 max-w-3xl mx-auto">
            Our team of certified professional trainers is dedicated to helping you achieve your fitness and martial arts goals. 
            With years of experience and specialized expertise, they'll guide you every step of the way.
          </motion.p>
        </motion.div>

        {/* Trainers Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
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
                          <p className="text-secondary-600 mt-4 line-clamp-3">{trainer.bio}</p>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-xl text-secondary-600">No trainers available at the moment.</p>
                <p className="mt-2 text-secondary-500">Please check back later.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Join the Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-secondary-50 p-8 md:p-12 rounded-2xl text-center mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto mb-8">
            Are you a certified trainer with a passion for martial arts? We're always looking for talented trainers to join our team.
          </p>
          <Link href="/contact">
            <button className="btn btn-primary">Apply Now</button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
} 