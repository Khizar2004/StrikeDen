"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { FaMedal, FaDumbbell, FaUsers } from "react-icons/fa";
import { MdSportsKabaddi, MdFitnessCenter, MdSpa } from "react-icons/md";
import { GiBoxingGlove, GiMuscleUp, GiShower } from "react-icons/gi";

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

// Team member card component
const TeamMemberCard = ({ member }) => {
  return (
    <Link 
      href={`/trainers/${member.id}`}
      className="block group"
    >
    <motion.div
      variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer transform group-hover:scale-[1.02] group-hover:shadow-2xl"
    >
        <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={member.image || "/images/placeholder-trainer.jpg"}
          alt={member.name}
          fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">{member.name}</h3>
          <p className="text-red-400 font-medium">{member.role || member.specialization}</p>
        </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-red-500 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
        {member.certifications && member.certifications.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {member.certifications.map((cert, index) => (
              <span key={index} className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                {cert}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
    </Link>
  );
};

// Facility feature component
const FacilityFeature = ({ icon, title, description }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="text-red-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

// Testimonial card component
const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl relative"
    >
      <div className="text-red-500 text-4xl absolute -top-4 -left-2 opacity-20">"</div>
      <div className="text-red-500 text-4xl absolute -bottom-8 -right-2 opacity-20">"</div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-4">{testimonial.quote}</p>
      <div className="flex items-center">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
          <Image
            src={testimonial.image || "/images/placeholder-avatar.jpg"}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const { theme, mounted } = useTheme();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch trainers from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/trainers');
        const data = await response.json();
        
        if (data.success) {
          setTeamMembers(data.data || []);
        } else {
          setError("Failed to load trainers");
        }
      } catch (err) {
        console.error("Error fetching trainers:", err);
        setError("Failed to load trainers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainers();
  }, []);

  if (!mounted) {
    return null;
  }

  const testimonials = [
    {
      quote: "Strike Den completely changed my fitness journey. The coaches are amazing, and the environment is genuinely comfortable and empowering for women.",
      name: "Malaika Ahmed",
      image: "/images/malaika.jpeg"
    },
    {
      quote: "StrikeDen has top-notch facilities and incredible coaches. It's an amazing place for beginners—lots of styles, all grounded in strong fundamentals.",
      name: "Minhaal Haider, Team Fight Fortress",
      image: "/images/minhaal.jpeg"
    },
    {
      quote: "StrikeDen's personalized coaching and top-tier facilities make all the difference. I'd recommend it to anyone looking to lose weight or just get fit.",
      name: "Sharik Kazi",
      image: "/images/sharik.jpeg"
    }
  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gray-900">
        <Image
          src="/images/cta-background.jpg"
          alt="About Strike Den"
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
            OUR STORY
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Origin Story Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">
                FROM HUMBLE <span className="text-red-600">BEGINNINGS</span>
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg">
                <p>
                  Strike Den started in the smallest of spaces — a humble flat run by Sikander Ali Shah. It began with just 11 students, but not everyone believed in it. The place wasn't big, posh, or even pretty to look at.
                </p>
                <p>
                  It was raw, unrefined, and built on the belief that hard work trumps all. Despite the early doubts, Sikander and his students stayed committed.
                </p>
                <p>
                  Started in 2022, Strike Den is now a fully operational MMA facility, equipped with everything you'd expect from a top-tier gym. It's proof that when you're driven by passion and perseverance, a small beginning can turn into something truly extraordinary.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
                  JOIN OUR COMMUNITY
                </Link>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -top-5 -left-5 w-24 h-24 bg-red-600 rounded-xl -z-10"></div>
              <Image 
                src="/images/gym-story.jpg" 
                alt="Strike Den Gym Interior" 
                width={600}
                height={700}
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-gray-800 dark:bg-red-600 rounded-xl -z-10"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image 
                src="/images/group2.jpg" 
                alt="Mission background" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.h2 
                variants={fadeInUp} 
                className="text-4xl md:text-5xl font-black text-white mb-8 text-center tracking-tighter"
              >
                OUR MISSION
              </motion.h2>
              <motion.p 
                variants={fadeInUp} 
                className="text-2xl text-white text-center italic font-light mb-16 max-w-4xl mx-auto"
              >
                "To bring world-class combat sports training to Karachi, fostering a supportive and disciplined environment where individuals build confidence, resilience, and strength—both in and out of the ring."
              </motion.p>
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <motion.div variants={fadeInUp} className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl mb-4">
                    <FaMedal />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">Excellence</h3>
                  <p className="text-white/90">We pursue technical excellence in every aspect of combat sports.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl mb-4">
                    <FaUsers />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">Community</h3>
                  <p className="text-white/90">We build a supportive community that lifts each other up.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl mb-4">
                    <GiMuscleUp />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">Growth</h3>
                  <p className="text-white/90">We foster both physical and mental growth in all our members.</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.h2 
            variants={fadeInUp} 
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tighter"
          >
            MEET OUR TEAM
          </motion.h2>
          <motion.p 
            variants={fadeInUp} 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12"
          >
            Our coaches are experienced professionals dedicated to helping you achieve your goals through personalized guidance and support.
          </motion.p>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
              <p className="text-red-500">{error}</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <TeamMemberCard 
                  key={member._id || index} 
                  member={{
                    id: member._id,
                    name: member.name,
                    role: member.specialization,
                    image: member.image || "/images/placeholder-trainer.jpg",
                    bio: member.bio || `Coach with ${member.experience || 'extensive'} experience`,
                    certifications: member.certifications || []
                  }} 
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
              <p className="text-gray-500 dark:text-gray-400">No trainers information available at the moment.</p>
            </div>
          )}
        </motion.section>
        
        {/* Facilities Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.h2 
            variants={fadeInUp} 
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tighter"
          >
            WORLD-CLASS FACILITIES
          </motion.h2>
          <motion.p 
            variants={fadeInUp} 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12"
          >
            Train in our state-of-the-art facility designed to support every aspect of your martial arts journey.
          </motion.p>
          
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FacilityFeature
              icon={<GiBoxingGlove />}
              title="Training Areas"
              description="Spacious, padded training areas for striking, grappling, and all types of martial arts practice in a safe environment."
            />
            <FacilityFeature
              icon={<MdFitnessCenter />}
              title="Conditioning Equipment"
              description="Professional strength and conditioning equipment to enhance your performance and prevent injuries."
            />
            <FacilityFeature
              icon={<FaUsers />}
              title="Community Space"
              description="Dedicated spaces for our community to connect, learn, and support each other's growth."
            />
            <FacilityFeature
              icon={<MdSportsKabaddi />}
              title="Sparring Zones"
              description="Designated areas for technical sparring with proper safety equipment and supervision."
            />
            <FacilityFeature
              icon={<MdSpa />}
              title="Recovery Areas"
              description="Facilities for stretching, cooling down, and recovery to help you maintain peak performance."
            />
            <FacilityFeature
              icon={<FaDumbbell />}
              title="Heavy Bag Section"
              description="Professional-grade heavy bags and equipment for developing striking power, technique and timing."
            />
          </motion.div>
        </motion.section>
        
        {/* Testimonials Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.h2 
            variants={fadeInUp} 
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tighter"
          >
            MEMBER EXPERIENCES
          </motion.h2>
          <motion.p 
            variants={fadeInUp} 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12"
          >
            Hear from our community about their journey with Strike Den.
          </motion.p>
          
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </motion.div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 opacity-30">
            <Image 
              src="/images/cta-background.jpg" 
              alt="Join Strike Den" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10 p-12 md:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">READY TO TRANSFORM YOUR LIFE?</h2>
              <p className="text-xl text-white/80 mb-10">
                Take the first step toward becoming a stronger, more confident version of yourself. Join us at Strike Den today!
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-bold text-lg transition-colors duration-300"
              >
                GET STARTED TODAY
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 