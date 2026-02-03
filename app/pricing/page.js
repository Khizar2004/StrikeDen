"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PricingCard from "../../components/PricingCard";
import ProgramDetailsModal from "../../components/ProgramDetailsModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { trackFacebookEvent, FB_EVENTS } from '../../lib/facebook';

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

export default function PricingPage() {
  const [programs, setPrograms] = useState([]);
  const [globalPromotion, setGlobalPromotion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Track page view when component mounts
  useEffect(() => {
    trackFacebookEvent(FB_EVENTS.VIEW_CONTENT, {
      content_name: 'Pricing Page',
      content_category: 'Pricing Information',
      content_type: 'product_group',
    });
  }, []);

  // Fetch classes and global promotion
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch programs and global promotion in parallel
        const [programsResponse, settingsResponse] = await Promise.all([
          fetch('/api/programs'),
          fetch('/api/settings')
        ]);

        const programsData = await programsResponse.json();
        const settingsData = await settingsResponse.json();

        if (programsData.success) {
          // Filter active programs
          const activePrograms = programsData.programs.filter(prog => prog.active);
          setPrograms(activePrograms);
        } else {
          setError('Failed to load programs');
        }
        
        if (settingsData.success) {
          setGlobalPromotion(settingsData.globalPromotion);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load pricing information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gray-900">
        <Image
          src="/images/cta-background.jpg"
          alt="Class Pricing"
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
            PROGRAM PRICING
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
            Choose the perfect plan for your fitness journey. All classes are designed to challenge and inspire you.
          </motion.p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((programData) => (
            <motion.div key={programData._id} variants={fadeInUp}>
              <PricingCard
                classData={programData}
                onClick={() => handleProgramClick(programData)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Contact us today to learn more about our classes and membership options.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Today
            </a>
          </div>
        </motion.div>
      </div>

      {/* Program Details Modal */}
      <ProgramDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        programData={selectedProgram}
      />
    </main>
  );
}
