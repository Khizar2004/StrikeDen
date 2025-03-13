"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";

// Class card component
const ClassCard = ({ scheduleClass }) => {
  const startTime = new Date(scheduleClass.startTime);
  const endTime = new Date(scheduleClass.endTime);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="h-3 bg-red-600"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{scheduleClass.className}</h3>
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full font-medium">
            {scheduleClass.classType}
          </span>
        </div>
        
        <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-400 dark:text-gray-500 mr-2" />
            <p>{formatDate(startTime)}</p>
          </div>
          <div className="flex items-center">
            <FaClock className="text-gray-400 dark:text-gray-500 mr-2" />
            <p>{formatTime(startTime)} - {formatTime(endTime)}</p>
          </div>
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-gray-400 dark:text-gray-500 mr-2" />
            <p>{scheduleClass.trainer?.name || "Not assigned"}</p>
          </div>
        </div>
        
        {scheduleClass.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic border-l-2 border-red-500 pl-3">"{scheduleClass.description}"</p>
        )}
      </div>
    </motion.div>
  );
};

// Filter component
const ClassFilter = ({ activeFilter, setActiveFilter, classTypes }) => {
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Filter by Type:</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveFilter('all')} 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
        >
          All Classes
        </button>
        
        {classTypes.map(type => (
          <button 
            key={type} 
            onClick={() => setActiveFilter(type)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === type ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

// Class type card component
const ClassTypeCard = ({ title, description, image, level }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || "/images/placeholder-class.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {level}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default function ClassesPage() {
  const { theme, mounted } = useTheme();
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [classTypes, setClassTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all classes on page load
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        const oneWeekAhead = new Date();
        oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
        
        // Fetch classes for the next 7 days
        const currentDate = new Date().toISOString().split('T')[0];
        const response = await fetch(`/api/schedules`);
        const data = await response.json();
        
        if (data.success) {
          const classes = data.schedules;
          setClasses(classes);
          
          // Extract unique class types
          const types = [...new Set(classes.map(cls => cls.classType))];
          setClassTypes(types);
        } else {
          setError("Failed to load classes");
        }
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load classes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClasses();
  }, []);
  
  // Filter classes when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredClasses(classes);
    } else {
      setFilteredClasses(classes.filter(cls => cls.classType === activeFilter));
    }
  }, [activeFilter, classes]);

  if (!mounted) {
    return null;
  }

  // Sample class types for the "Our Classes" section
  const classTypesList = [
    {
      title: "Boxing",
      description: "Learn proper boxing technique, footwork, and combinations. Develop speed, power, and defensive skills.",
      image: "/images/placeholder-class.jpg",
      level: "All Levels"
    },
    {
      title: "Kickboxing",
      description: "Combine boxing with powerful kicks in this high-energy class that improves coordination and full-body strength.",
      image: "/images/placeholder-class.jpg",
      level: "All Levels"
    },
    {
      title: "Brazilian Jiu-Jitsu",
      description: "Master the art of ground fighting with techniques focused on control, submissions, and positional dominance.",
      image: "/images/placeholder-class.jpg",
      level: "All Levels"
    },
    {
      title: "MMA Fundamentals",
      description: "A comprehensive introduction to mixed martial arts, covering striking, takedowns, and ground fighting.",
      image: "/images/placeholder-class.jpg",
      level: "Beginner"
    },
    {
      title: "Advanced MMA",
      description: "For experienced fighters looking to refine technique and develop advanced strategies for competition.",
      image: "/images/placeholder-class.jpg",
      level: "Advanced"
    },
    {
      title: "Strength & Conditioning",
      description: "High-intensity workouts designed specifically for combat sports athletes to build functional strength and endurance.",
      image: "/images/placeholder-class.jpg",
      level: "Intermediate"
    }
  ];
  
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-2"
        >
          Our Classes
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          Join our expert-led classes and transform your fitness journey. Whether you're a beginner or an experienced athlete, we have the perfect class for you.
        </motion.p>

        {/* Class Types Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {classTypesList.map((classType, index) => (
              <ClassTypeCard 
                key={index}
                title={classType.title}
                description={classType.description}
                image={classType.image}
                level={classType.level}
              />
            ))}
          </div>
        </section>
        
        {/* Schedule Section */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Class Schedule</h2>
          </motion.div>
          
          {/* Filters */}
          {!isLoading && !error && (
            <ClassFilter 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
              classTypes={classTypes}
            />
          )}
          
          {/* Loading and Error States */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}
          
          {/* Classes Grid */}
          {!isLoading && !error && (
            <>
              {filteredClasses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClasses.map(cls => (
                    <ClassCard key={cls._id} scheduleClass={cls} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No classes found for this filter.</p>
                  {activeFilter !== 'all' && (
                    <button 
                      onClick={() => setActiveFilter('all')} 
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      View All Classes
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>
        
        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center bg-gradient-to-r from-red-600 to-red-800 p-12 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Class Schedule</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Check out our schedule and find a class that fits your interests and skill level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-md"
            >
              Contact Us
            </a>
            <a 
              href="/about" 
              className="bg-transparent hover:bg-red-700 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Learn More About Us
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 