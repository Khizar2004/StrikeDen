"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Team member card component
const TeamMemberCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 w-full">
        <Image
          src={member.image || "/images/placeholder-trainer.jpg"}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-red-500 mb-3">{member.role}</p>
        <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
        <div className="flex space-x-3">
          {member.certifications && member.certifications.map((cert, index) => (
            <span key={index} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
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
      className="bg-gray-800 p-6 rounded-lg"
    >
      <div className="text-red-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default function AboutPage() {
  const [teamMembers] = useState([
    {
      name: "Alex Rodriguez",
      role: "Head Coach & Founder",
      image: "/images/placeholder-trainer.jpg",
      bio: "Former professional MMA fighter with over 15 years of experience. Founded Strike Den with a vision to create an inclusive training environment for fighters of all levels.",
      certifications: ["NASM CPT", "MMA Level 3 Coach"]
    },
    {
      name: "Sarah Chen",
      role: "Boxing Coach",
      image: "/images/placeholder-trainer.jpg",
      bio: "Olympic boxing medalist with a passion for teaching proper technique. Sarah's classes focus on footwork, defense, and developing powerful combinations.",
      certifications: ["USA Boxing Certified", "Strength & Conditioning"]
    },
    {
      name: "Marcus Johnson",
      role: "Kickboxing Specialist",
      image: "/images/placeholder-trainer.jpg",
      bio: "With a background in Muay Thai and Dutch Kickboxing, Marcus brings international training methods to his high-energy classes.",
      certifications: ["Muay Thai Level 2", "Injury Prevention"]
    },
    {
      name: "Jasmine Patel",
      role: "MMA Coach",
      image: "/images/placeholder-trainer.jpg",
      bio: "Former UFC competitor specializing in Brazilian Jiu-Jitsu and wrestling. Jasmine's approach balances technical proficiency with practical application.",
      certifications: ["BJJ Black Belt", "Wrestling Coach"]
    }
  ]);

  return (
    <main className="bg-black min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Strike Den</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2015, Strike Den began as a small training facility dedicated to authentic martial arts training in a supportive environment. 
                  What started as a dream to create a space where both beginners and advanced fighters could train together has grown into one of the most respected combat sports gyms in the area.
                </p>
                <p>
                  Our founder, Alex Rodriguez, built this gym with a clear vision: to strip away the intimidation factor often associated with fighting gyms and create a community where anyone could learn the art and science of combat sports.
                </p>
                <p>
                  Today, Strike Den is home to fighters of all levels – from those taking their first steps into martial arts to professional competitors preparing for major bouts.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative h-80 w-full rounded-lg overflow-hidden"
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
        <section className="mb-20 bg-gray-900 p-10 rounded-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 italic">
              "To provide world-class combat sports training in a supportive environment that builds not just fighters, but confident, disciplined, and resilient individuals."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-3">💪</div>
                <h3 className="text-white text-xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-400">We pursue technical excellence in every aspect of combat sports.</p>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-3">🤝</div>
                <h3 className="text-white text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-400">We build a supportive community that lifts each other up.</p>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-3">🧠</div>
                <h3 className="text-white text-xl font-bold mb-2">Growth</h3>
                <p className="text-gray-400">We foster both physical and mental growth in all our members.</p>
              </div>
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
            <h2 className="text-3xl font-bold text-white mb-3">Meet Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our coaches are experienced professionals who are passionate about sharing their knowledge and helping you achieve your goals.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Our Facilities Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Our Facilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Strike Den is equipped with state-of-the-art training facilities to support your combat sports journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FacilityFeature 
              icon="🥊"
              title="Boxing Ring"
              description="Professional-grade boxing ring with spring-loaded floor for optimal training and sparring sessions."
            />
            <FacilityFeature 
              icon="🥋"
              title="MMA Octagon"
              description="Regulation-sized MMA cage for realistic training scenarios and competition preparation."
            />
            <FacilityFeature 
              icon="💪"
              title="Strength Area"
              description="Fully equipped strength and conditioning zone with free weights, machines, and functional training equipment."
            />
            <FacilityFeature 
              icon="🏋️"
              title="Heavy Bag Section"
              description="Multiple heavy bags, speed bags, and specialized striking equipment for technique development."
            />
            <FacilityFeature 
              icon="🧘"
              title="Recovery Zone"
              description="Dedicated space for stretching, mobility work, and recovery with foam rollers and massage tools."
            />
            <FacilityFeature 
              icon="🚿"
              title="Modern Amenities"
              description="Clean locker rooms with showers, personal lockers, and a comfortable lounge area for members."
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
            <h2 className="text-3xl font-bold text-white mb-3">What Our Members Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear from the Strike Den community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <p className="text-gray-300 mb-4 italic">
                "I was intimidated to start MMA training, but Strike Den welcomed me with open arms. The coaches take time to work with beginners and the community is incredibly supportive. After 6 months, I'm in the best shape of my life and have gained so much confidence."
              </p>
              <p className="text-white font-bold">- Michael T.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <p className="text-gray-300 mb-4 italic">
                "As a professional fighter, finding the right gym is crucial. Strike Den has everything I need - top-notch coaches, great facilities, and training partners who push me to my limits. This place has taken my fight game to the next level."
              </p>
              <p className="text-white font-bold">- Samantha R.</p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Strike Den Family?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to learn self-defense, get in shape, or compete at the highest level, 
            we have programs that will help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/classes" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Explore Our Classes
            </a>
            <a 
              href="#contact" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Schedule a Tour
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 