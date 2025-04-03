"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeProvider";
import { FaMedal, FaDumbbell, FaUsers } from "react-icons/fa";
import { MdSportsKabaddi, MdFitnessCenter, MdSpa } from "react-icons/md";
import { GiBoxingGlove, GiMuscleUp, GiShower } from "react-icons/gi";

// Team member card component
const TeamMemberCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 w-full">
        <Image
          src={member.image || "/images/placeholder-trainer.jpg"}
          alt={member.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-red-400 font-medium">{member.role}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
        <div className="flex flex-wrap gap-2">
          {member.certifications && member.certifications.map((cert, index) => (
            <span key={index} className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Facility feature component
const FacilityFeature = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative"
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
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Value card component
const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-white text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
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
          // Use data.data since that's how the trainers API returns the data
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
      quote: "Strike Den completely transformed my approach to fitness. The coaches are world-class and the community is incredibly supportive.",
      name: "Michael T.",
      title: "Member since 2019",
      image: "/images/placeholder-avatar.jpg"
    },
    {
      quote: "As someone who was intimidated by combat sports, I found Strike Den to be welcoming and encouraging. Now I can't imagine my life without it!",
      name: "Jessica K.",
      title: "Member since 2020",
      image: "/images/placeholder-avatar.jpg"
    },
    {
      quote: "The technical instruction at Strike Den is unmatched. I've trained at gyms across the country, and this is by far the best experience I've had.",
      name: "David L.",
      title: "Professional Fighter",
      image: "/images/placeholder-avatar.jpg"
    }
  ];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">About Strike Den</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Where fighters are made and champions are forged.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <p>
                  Strike Den started in the smallest of spaces — a humble flat run by Sikander Ali Shah. It began with just 11 students, but not everyone believed in it. The place wasn't big, posh, or even pretty to look at.
                </p>
                <p>
                  It was raw, unrefined, and built on the belief that hard work trumps all. Despite the early doubts, Sikander and his students stayed committed.
                </p>
                <p>
                  Two years of relentless effort, dedication, and grit later, Strike Den is now a fully operational MMA facility, equipped with everything you'd expect from a top-tier gym. It's proof that when you're driven by passion and perseverance, a small beginning can turn into something truly extraordinary.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative h-80 w-full rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/gym-story.jpg"
                alt="Strike Den Gym Interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl -z-10"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat rounded-2xl -z-10"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-red-600 to-red-800 text-center max-w-4xl mx-auto p-12 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white italic mb-12">
              "To bring world-class combat sports training to Karachi, fostering a supportive and disciplined environment where individuals build confidence, resilience, and strength—both in and out of the ring."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValueCard 
                icon={<FaMedal />}
                title="Excellence"
                description="We pursue technical excellence in every aspect of combat sports."
              />
              <ValueCard 
                icon={<FaUsers />}
                title="Community"
                description="We build a supportive community that lifts each other up."
              />
              <ValueCard 
                icon={<GiMuscleUp />}
                title="Growth"
                description="We foster both physical and mental growth in all our members."
              />
            </div>
          </motion.div>
        </section>

        {/* Our Team Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Our coaches are experienced professionals who are passionate about sharing their knowledge and helping you achieve your goals.
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-red-500">{error}</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard 
                  key={member._id || index} 
                  member={{
                    name: member.name,
                    role: member.specialization,
                    image: member.image || "/images/placeholder-trainer.jpg",
                    bio: member.bio || `Coach with ${member.experience} years of experience`,
                    certifications: member.certifications || []
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400">No trainers information available.</p>
            </div>
          )}
        </section>

        {/* Our Facilities Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Our Facilities</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Strike Den is equipped with everything you need for effective training in a functional, no-nonsense environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FacilityFeature 
              icon={<FaUsers className="text-red-500" />}
              title="Padded Training Area"
              description="Spacious padded area for sparring, grappling, and all types of martial arts practice in a safe environment."
            />
            <FacilityFeature 
              icon={<GiBoxingGlove className="text-red-500" />}
              title="Heavy Bag Section"
              description="Multiple heavy bags and striking equipment for developing power, technique, and endurance."
            />
            <FacilityFeature 
              icon={<FaDumbbell className="text-red-500" />}
              title="Strength & Conditioning"
              description="Essential weights and equipment for building strength and conditioning to complement your martial arts training."
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">What Our Members Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Don't just take our word for it. Hear from the Strike Den community.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gradient-to-r from-red-600 to-red-800 p-12 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Take the first step toward transforming your fitness journey. Join us at Strike Den today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/classes" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-md"
            >
              View Our Classes
            </a>
            <a 
              href="/contact" 
              className="bg-transparent hover:bg-red-700 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 