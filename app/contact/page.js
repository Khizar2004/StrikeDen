"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
      
      {submitStatus === "success" && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-600 text-white p-4 rounded-md mb-6"
        >
          Thank you for your message! We'll get back to you shortly.
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-2">Phone (optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
        <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors duration-300 flex justify-center items-center"
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
      className="bg-gray-800 p-6 rounded-lg"
    >
      <div className="text-red-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <div className="text-gray-300">
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
        <div key={index} className="flex justify-between py-2 border-b border-gray-700">
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
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Instagram", icon: "📸", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "YouTube", icon: "📹", url: "#" }
  ];
  
  return (
    <div className="flex space-x-4">
      {socials.map((social, index) => (
        <a 
          key={index}
          href={social.url}
          className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
            <ContactInfoCard icon="📍" title="Our Location">
              <p className="mb-2">
                123 Fighter Street<br />
                Downtown Combat District<br />
                New York, NY 10001
              </p>
              <div className="mt-4 aspect-video relative rounded-lg overflow-hidden">
                {/* Interactive map would go here - using a placeholder image for now */}
                <Image
                  src="/images/map-placeholder.jpg"
                  alt="Map location of Strike Den"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </ContactInfoCard>
            
            <ContactInfoCard icon="📞" title="Contact Information">
              <p className="mb-2"><span className="text-gray-400">Phone:</span> (123) 456-7890</p>
              <p className="mb-2"><span className="text-gray-400">Email:</span> info@strikeden.com</p>
              <div className="mt-6">
                <p className="mb-3 text-white font-semibold">Connect With Us:</p>
                <SocialLinks />
              </div>
            </ContactInfoCard>
            
            <ContactInfoCard icon="🕒" title="Business Hours">
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
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find quick answers to common questions about our gym and services.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-white font-bold text-lg mb-3">Do I need experience to join Strike Den?</h3>
              <p className="text-gray-300">
                Not at all! We welcome members of all skill levels, from complete beginners to professional fighters. Our classes are structured to accommodate different experience levels, and our coaches provide personalized attention.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-white font-bold text-lg mb-3">What should I bring to my first class?</h3>
              <p className="text-gray-300">
                For your first class, we recommend comfortable workout clothes, a water bottle, and a towel. Depending on the class, specific gear may be required, but we provide most equipment for beginners. Feel free to contact us before your first visit.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-white font-bold text-lg mb-3">Do you offer private training?</h3>
              <p className="text-gray-300">
                Yes, we offer one-on-one private training sessions with our expert coaches. These sessions are tailored to your specific goals and provide accelerated progress. Contact us for pricing and availability.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-white font-bold text-lg mb-3">Is there a free trial available?</h3>
              <p className="text-gray-300">
                Absolutely! We offer a 3-day free trial so you can experience our classes and facilities. This includes access to any three classes of your choice. Simply fill out the contact form or call us to schedule your free trial.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gray-900 p-10 rounded-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Step into the Ring?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Take the first step toward transforming your fitness journey. Join us at Strike Den today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/classes" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View Our Schedule
            </a>
            <a 
              href="#" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Book a Free Trial
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 