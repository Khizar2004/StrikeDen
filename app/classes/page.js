"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import Schedule from "../../components/Schedule";
import ClassesSlider from "../../components/ClassesSlider";

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

// Filter component for classes
const ClassFilter = ({ activeFilter, setActiveFilter, classTypes }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          activeFilter === 'all'
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={() => setActiveFilter('all')}
      >
        All Classes
      </button>
      
      {classTypes.map((type) => (
        <button
          key={type}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            activeFilter === type
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => setActiveFilter(type)}
        >
          {type}
        </button>
      ))}
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
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || "/images/placeholder.jpg"}
          alt={title}
          fill
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
            {level}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default function ClassesPage() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [scheduleData, setScheduleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classTypes, setClassTypes] = useState(['Boxing', 'Kickboxing', 'MMA']);

  // Fetch schedule and upcoming classes data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsUpcomingLoading(true);
      
      try {
        // Fetch both schedule data and upcoming classes from the API
        const schedulesResponse = await fetch('/api/schedules');
        const schedulesData = await schedulesResponse.json();
        
        if (schedulesData.success) {
          // 1. Process data for the weekly schedule
          const scheduleByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
          };
          
          schedulesData.schedules.forEach(cls => {
            const date = new Date(cls.startTime);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            const startTime = new Date(cls.startTime);
            const endTime = new Date(cls.endTime);
            
            if (scheduleByDay[dayName]) {
              scheduleByDay[dayName].push({
                id: cls._id,
                name: cls.className,
                time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
                trainer: cls.trainer?.name || 'TBA',
                classType: cls.classType
              });
            }
          });
          
          // Sort classes by time for each day
          Object.keys(scheduleByDay).forEach(day => {
            scheduleByDay[day].sort((a, b) => {
              const timeA = a.time.split(' - ')[0];
              const timeB = b.time.split(' - ')[0];
              return timeA.localeCompare(timeB);
            });
          });
          
          setScheduleData(scheduleByDay);
          
          // 2. Process data for the upcoming classes cards
          const now = new Date();
          const classes = schedulesData.schedules
            // Only include classes in the future
            .filter(classItem => new Date(classItem.startTime) > now)
            .map(classItem => ({
              id: classItem._id,
              className: classItem.className,
              classType: classItem.classType,
              startTime: classItem.startTime,
              endTime: classItem.endTime,
              trainer: classItem.trainer || { name: 'TBA' },
              description: classItem.description
            }));
          
          // Sort classes by date/time (nearest future classes first)
          const sortedClasses = classes.sort((a, b) => {
            const dateA = new Date(a.startTime);
            const dateB = new Date(b.startTime);
            return dateA - dateB;
          });
          
          setUpcomingClasses(sortedClasses);
          
          // Extract unique class types for filtering
          const types = [...new Set(classes.map(c => c.classType))];
          if (types.length > 0) {
            setClassTypes(types);
          }
        } else {
          setError("Failed to load class data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load class data. Please try again later.");
      } finally {
        setIsLoading(false);
        setIsUpcomingLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Helper function to format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter classes when active filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredClasses(upcomingClasses);
    } else {
      setFilteredClasses(upcomingClasses.filter(c => c.classType === activeFilter));
    }
  }, [activeFilter, upcomingClasses]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Class Types Slider */}
        <ClassesSlider />

        {/* Weekly Schedule Section */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <Schedule initialClasses={scheduleData} />
          </motion.div>

          {/* Upcoming Classes Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Upcoming Classes
            </h2>
            
            {error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-6 text-center">
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : isUpcomingLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : upcomingClasses.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No upcoming classes are currently scheduled.</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm">Please check back later or contact us for more information.</p>
              </div>
            ) : (
              <>
                <ClassFilter
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  classTypes={classTypes}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {filteredClasses.map((scheduleClass) => (
                    <ClassCard key={scheduleClass.id} scheduleClass={scheduleClass} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 