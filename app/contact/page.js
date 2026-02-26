"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeProvider";
import { FaMapMarkerAlt, FaPhone, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import dynamic from 'next/dynamic';
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

// Dynamically import the map component with no SSR to avoid window undefined errors
const InteractiveMap = dynamic(() => import('../../components/InteractiveMap'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">Loading map...</div>
});

// Business hours component with updated design
const BusinessHours = () => {
  const hours = [
    { day: "Monday", hours: "8–10 a.m., 4–10 p.m." },
    { day: "Tuesday", hours: "8–10 a.m., 4–10 p.m." },
    { day: "Wednesday", hours: "8–10 a.m., 4–10 p.m." },
    { day: "Thursday", hours: "8–10 a.m., 4–10 p.m." },
    { day: "Friday", hours: "8–10 a.m., 4–10 p.m." },
    { day: "Saturday", hours: "8–10 a.m., 4–10 p.m." },
    { day: "Sunday", hours: "Closed" }
  ];
  
  return (
    <div className="grid grid-cols-1 gap-3">
      {hours.map((item, index) => (
        <div 
          key={index} 
          className={`flex justify-between p-3 rounded-lg ${
            item.day === "Sunday" 
              ? "bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300" 
              : "bg-gray-50 dark:bg-gray-800/40"
          }`}
        >
          <span className="font-medium">{item.day}</span>
          <span>{item.hours}</span>
        </div>
      ))}
    </div>
  );
};

// Social media links component
const SocialLinks = () => {
  const socials = [
    { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/profile.php?id=61570916734685", color: "bg-blue-600 hover:bg-blue-700" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/strikeden.pk/", color: "bg-pink-600 hover:bg-pink-700" },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://api.whatsapp.com/send/?phone=923372629350&text&type=phone_number&app_absent=0", color: "bg-green-600 hover:bg-green-700" }
  ];
  
  return (
    <div className="flex space-x-4">
      {socials.map((social, index) => (
        <a 
          key={index}
          href={social.url}
          className={`${social.color} text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
        >
          <span className="text-xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

// FAQ Item component
const FAQItem = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4 transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 bg-white dark:bg-gray-800 flex justify-between items-center transition-colors duration-300"
      >
        <h3 className="text-gray-800 dark:text-white font-bold text-lg">{question}</h3>
        <svg 
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function ContactPage() {
  const { theme, mounted } = useTheme();
  
  // Track WhatsApp contact click
  const handleWhatsAppClick = () => {
    trackFacebookEvent(FB_EVENTS.CONTACT, {
      content_name: 'WhatsApp Contact',
      content_category: 'Contact',
    });
  };
  
  if (!mounted) {
    return null;
  }
  
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gray-900">
        <Image
          src="/images/cta-background.jpg"
          alt="Contact Strike Den"
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
            GET IN TOUCH
          </motion.h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Information Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {/* Location Card */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-48 relative">
              <Image 
                src="/images/group1.jpg"
                alt="Strike Den Location"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                  <FaMapMarkerAlt className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Location</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Karachi 75500, Pakistan
              </p>
              <a 
                href="https://www.google.com/maps/place/Strike+Den+%7C+MMA+%26+Judo/@24.7948238,67.0468958,963m/data=!3m1!1e3!4m6!3m5!1s0x3eb33d8b3de8175d:0xccac7c6c8c8c752e!8m2!3d24.7948238!4d67.0494707!16s%2Fg%2F11wws9jpr8?entry=ttu&g_ep=EgoyMDI1MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Open in Google Maps
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Contact Card */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-48 relative">
              <Image 
                src="/images/group2.jpg"
                alt="Strike Den Contact"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="bg-white dark:bg-gray-900 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                  <FaPhone className="text-red-600 dark:text-red-500 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm">Phone Number</p>
                <a href="tel:+923372629350" className="text-gray-900 dark:text-white text-xl font-bold hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  +92 337 2629350
                </a>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm">Email</p>
                <a href="mailto:strikeden.pk@gmail.com" className="text-gray-900 dark:text-white text-xl font-bold hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  strikeden.pk@gmail.com
                </a>
              </div>
              
              <div className="pt-2">
                <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Connect With Us</p>
                <SocialLinks />
              </div>
            </div>
          </motion.div>
          
          {/* Hours Card */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-48 relative">
              <Image 
                src="/images/gym-story.jpg"
                alt="Strike Den Training Hours"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="bg-white dark:bg-gray-900 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                  <MdAccessTime className="text-red-600 dark:text-red-500 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white">Training Hours</h2>
              </div>
            </div>
            <div className="p-6">
              <BusinessHours />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Map Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.h2 
            variants={fadeInUp} 
            className="text-4xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter text-center"
          >
            FIND US
          </motion.h2>
          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-[70vh] w-full">
              <InteractiveMap />
            </div>
          </motion.div>
        </motion.section>
        
        {/* FAQ Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">FREQUENT QUESTIONS</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to the most common questions about our services
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <FAQItem 
              question="Do I need experience to join Strike Den?" 
              answer="Not at all! We welcome members of all skill levels, from complete beginners to professional fighters. Our classes are structured to accommodate different experience levels, and our coaches provide personalized attention."
              delay={0.1}
            />
            
            <FAQItem 
              question="What should I bring to my first class?" 
              answer="For your first class, we recommend comfortable workout clothes, a water bottle, and a towel. Depending on the class, specific gear may be required, but we provide most equipment for beginners. Feel free to contact us before your first visit."
              delay={0.2}
            />
            
            <FAQItem 
              question="Do you offer private training?" 
              answer="Yes, we offer one-on-one private training sessions with our expert coaches. These sessions are tailored to your specific goals and provide accelerated progress. Contact us for pricing and availability."
              delay={0.3}
            />
            
            <FAQItem 
              question="Is there a free trial available?" 
              answer="Absolutely! We offer a demo class so you can experience our classes and facilities. Simply contact us to schedule your free trial."
              delay={0.4}
            />
          </div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 p-12 rounded-2xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/images/cta-background.jpg" 
              alt="Join Strike Den" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">START YOUR JOURNEY TODAY</h2>
            <p className="text-xl text-white/80 mb-10">
              Join our community and transform your mind and body through disciplined training.
            </p>
            <a 
              href="https://api.whatsapp.com/send/?phone=923372629350&text=Hi!%20I%27m%20interested%20in%20joining%20Strike%20Den.&type=phone_number&app_absent=0" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              CONTACT US ON WHATSAPP
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 