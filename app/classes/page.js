"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{scheduleClass.className}</h3>
          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
            {scheduleClass.classType}
          </span>
        </div>
        
        <div className="text-gray-300 mb-4">
          <p className="mb-1"><span className="text-gray-400">Date:</span> {formatDate(startTime)}</p>
          <p className="mb-1"><span className="text-gray-400">Time:</span> {formatTime(startTime)} - {formatTime(endTime)}</p>
          <p className="mb-1"><span className="text-gray-400">Trainer:</span> {scheduleClass.trainer?.name || "Not assigned"}</p>
          <p><span className="text-gray-400">Availability:</span> {scheduleClass.enrolledStudents?.length || 0} / {scheduleClass.capacity} spots filled</p>
        </div>
        
        {scheduleClass.description && (
          <p className="text-gray-400 text-sm mb-4 italic">"{scheduleClass.description}"</p>
        )}
        
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

// Filter component
const ClassFilter = ({ activeFilter, setActiveFilter, classTypes }) => {
  return (
    <div className="mb-8">
      <h3 className="text-white text-lg font-semibold mb-3">Filter by Type:</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveFilter('all')} 
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          All Classes
        </button>
        
        {classTypes.map(type => (
          <button 
            key={type} 
            onClick={() => setActiveFilter(type)} 
            className={`px-4 py-2 rounded-full text-sm ${activeFilter === type ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function ClassesPage() {
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
  
  return (
    <main className="bg-black min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white text-center mb-2"
        >
          Our Classes
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
        >
          Join our expert-led classes and transform your fitness journey. Whether you're a beginner or an experienced athlete, we have the perfect class for you.
        </motion.p>
        
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
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No classes found for this filter.</p>
                {activeFilter !== 'all' && (
                  <button 
                    onClick={() => setActiveFilter('all')} 
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    View All Classes
                  </button>
                )}
              </div>
            )}
          </>
        )}
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Join a Class?</h2>
          <p className="text-gray-400 mb-6">Book your spot today and start your fitness journey with us!</p>
          <a 
            href="#contact" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Book Your First Class
          </a>
        </div>
      </div>
    </main>
  );
} 