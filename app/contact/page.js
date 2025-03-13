"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeProvider";
import { FaMapMarkerAlt, FaPhone, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// Contact form component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { theme } = useTheme();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-colors duration-300">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send Us a Message</h3>
      
      {submitStatus === "success" && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-4 rounded-lg mb-6 border border-green-200 dark:border-green-700"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Thank you for your message! We'll get back to you shortly.</span>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Phone (optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Subject</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Membership">Membership</option>
            <option value="Private Training">Private Training</option>
            <option value="Corporate Events">Corporate Events</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex justify-center items-center"
      >
        {isSubmitting ? (
          <span className="inline-block h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></span>
        ) : null}
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

// Contact info card component
const ContactInfoCard = ({ icon, title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-300"
    >
      <div className="text-red-500 text-3xl mb-4">{icon}</div>
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
    { day: "Monday", hours: "6:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "6:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "6:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "6:00 AM - 10:00 PM" },
    { day: "Friday", hours: "6:00 AM - 9:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 5:00 PM" }
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
    { name: "Facebook", icon: <FaFacebookF />, url: "#" },
    { name: "Instagram", icon: <FaInstagram />, url: "#" },
    { name: "Twitter", icon: <FaTwitter />, url: "#" },
    { name: "YouTube", icon: <FaYoutube />, url: "#" }
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
          className="p-6 bg-gray-50 dark:bg-gray-750 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            We're here to answer your questions and help you on your fitness journey.
          </p>
        </motion.div>
        
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <ContactInfoCard icon={<FaMapMarkerAlt />} title="Our Location">
              <p className="mb-4">
                123 Fighter Street<br />
                Downtown Combat District<br />
                New York, NY 10001
              </p>
              <div className="mt-4 aspect-video relative rounded-xl overflow-hidden shadow-lg">
                {/* Interactive map would go here - using a placeholder image for now */}
                <Image
                  src="/gym-bg.jpg"
                  alt="Map location of Strike Den"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </ContactInfoCard>
            
            <ContactInfoCard icon={<FaPhone />} title="Contact Information">
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 dark:text-gray-400 mr-3" />
                  <p><span className="text-gray-500 dark:text-gray-400">Phone:</span> <a href="tel:+11234567890" className="text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">(123) 456-7890</a></p>
                </div>
                <div className="flex items-center">
                  <MdEmail className="text-gray-500 dark:text-gray-400 mr-3" />
                  <p><span className="text-gray-500 dark:text-gray-400">Email:</span> <a href="mailto:info@strikeden.com" className="text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">info@strikeden.com</a></p>
                </div>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-gray-800 dark:text-white font-semibold">Connect With Us:</p>
                <SocialLinks />
              </div>
            </ContactInfoCard>
            
            <ContactInfoCard icon={<FaClock />} title="Business Hours">
              <BusinessHours />
            </ContactInfoCard>
          </motion.div>
        </div>
        
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
            <a 
              href="#" 
              className="bg-transparent hover:bg-red-700 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Book a Free Trial
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 