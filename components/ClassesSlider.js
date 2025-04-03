"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ClassesSlider() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const contentRef = useRef(null);

  // Fetch classes data
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/classes');
        const data = await response.json();
        
        if (data.success) {
          setClasses(data.classes || []);
        } else {
          console.error("Failed to fetch classes:", data.error);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClasses();
  }, []);

  // Calculate the width of the scrollable area
  useEffect(() => {
    if (sliderRef.current && contentRef.current && classes?.length) {
      setWidth(contentRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, [classes]);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && contentRef.current && classes?.length) {
        setWidth(contentRef.current.scrollWidth - sliderRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [classes]);

  const handleDragStart = (e, info) => {
    setIsDragging(true);
    setDragStartX(info.point.x - dragPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e, info) => {
    let newPosition = info.point.x - dragStartX;
    
    // Add constraints
    if (newPosition > 0) newPosition = 0;
    if (newPosition < -width) newPosition = -width;
    
    setDragPosition(newPosition);
  };

  // Error handler for image loading
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.style.backgroundColor = "#1A1A1A";
    e.target.alt = "Image not available";
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-center mb-12 tracking-tight text-gray-900 dark:text-white"
        >
          OUR CLASSES
        </motion.h2>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-center mb-12 tracking-tight text-gray-900 dark:text-white"
        >
          OUR CLASSES
        </motion.h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No classes available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-0 py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-black text-center mb-12 tracking-tight text-gray-900 dark:text-white"
      >
        OUR CLASSES
      </motion.h2>
      
      <div className="overflow-hidden relative">
        <motion.div 
          ref={sliderRef}
          className="cursor-grab overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            ref={contentRef}
            className="flex"
            style={{ x: dragPosition }}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {classes.map((item) => (
              <motion.div 
                key={item._id}
                className="min-w-[270px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[420px] h-[500px] p-4 relative"
                whileHover={{ scale: isDragging ? 1 : 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/classes/${item.slug}`} className="block h-full w-full relative">
                  <div className="absolute inset-0 bg-gray-900 opacity-40 dark:opacity-60 z-10"></div>
                  <div className="relative h-full w-full bg-gray-800">
                    <Image 
                      src={item.image || "/images/default-class.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="absolute bottom-5 left-0 right-0 text-center z-20">
                    <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                    {item.shortDescription && (
                      <p className="text-white text-lg mt-2 px-4">
                        {item.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll hint indicators */}
        {classes.length > 2 && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1 opacity-70 z-20">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        )}
        
        {/* Instruction text */}
        {classes.length > 2 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic"
          >
            Click and drag to explore more classes
          </motion.p>
        )}
      </div>
    </div>
  );
} 