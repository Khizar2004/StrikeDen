"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeProvider";
import { FaMapMarkerAlt, FaPhone, FaClock, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Contact info card component
const ContactInfoCard = ({ icon, title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-300"
    >
      <div className="text-red-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{title}</h3>
      <div className="text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </motion.div>
  );
};

// Business hours component
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
    <div>
      {hours.map((item, index) => (
        <div key={index} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <span>{item.day}</span>
          <span>{item.hours}</span>
        </div>
      ))}
    </div>
  );
};

// Social media links component
const SocialLinks = () => {
  const socials = [
    { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/profile.php?id=61570916734685" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/strikeden.pk/reel/DHGm0jFsCaR/" },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://api.whatsapp.com/send/?phone=923372629350&text&type=phone_number&app_absent=0" }
  ];
  
  return (
    <div className="flex space-x-4">
      {socials.map((social, index) => (
        <a 
          key={index}
          href={social.url}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900 text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 p-3 rounded-full transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
        >
          <span className="text-lg">{social.icon}</span>
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
  
  if (!mounted) {
    return null;
  }
  
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Connect with us through our social media channels or visit us at our location.
          </p>
        </motion.div>
        
        {/* Contact Info Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactInfoCard 
              icon={<FaMapMarkerAlt />}
              title="Visit Us"
            >
              <p className="mb-2">2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6</p>
              <p className="mb-2">Karachi 75500, Pakistan</p>
              <a href="https://www.google.com/maps/place/Strike+Den+%7C+MMA+%26+Judo/@24.7948238,67.0468958,963m/data=!3m1!1e3!4m6!3m5!1s0x3eb33d8b3de8175d:0xccac7c6c8c8c752e!8m2!3d24.7948238!4d67.0494707!16s%2Fg%2F11wws9jpr8?entry=ttu&g_ep=EgoyMDI1MDMxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 transition-colors duration-300">
                View on Map
              </a>
            </ContactInfoCard>
            
            <ContactInfoCard 
              icon={<FaPhone />}
              title="Call Us"
            >
              <p className="mb-2">Have a question? Give us a call:</p>
              <a href="tel:+923372629350" className="text-red-500 hover:text-red-600 transition-colors duration-300 text-xl font-semibold">
                +92 337 2629350
              </a>
            </ContactInfoCard>
            
            <ContactInfoCard 
              icon={<FaClock />}
              title="Business Hours"
            >
              <BusinessHours />
            </ContactInfoCard>
          </div>
        </section>
        
        {/* Social Media Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-colors duration-300 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Connect With Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Follow us on social media to stay updated with the latest news, events, and promotions from Strike Den.
            </p>
            <div className="flex justify-center">
              <SocialLinks />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Find quick answers to common questions about our gym and services.
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
              answer="Absolutely! We offer a 3-day free trial so you can experience our classes and facilities. This includes access to any three classes of your choice. Simply fill out the contact form or call us to schedule your free trial."
              delay={0.4}
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gradient-to-r from-red-600 to-red-800 p-12 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Step into the Ring?</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Take the first step toward transforming your fitness journey. Join us at Strike Den today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/classes" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-md"
            >
              View Our Schedule
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 