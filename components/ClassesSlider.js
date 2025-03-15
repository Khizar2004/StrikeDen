"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ClassesSlider({ classes }) {
  const [width, setWidth] = useState(0);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Default classes if none provided
  const defaultClasses = [
    {
      id: 1,
      title: "WRESTLING",
      image: "/images/cta-background.jpg", // Using existing image as placeholder
      slug: "wrestling"
    },
    {
      id: 2,
      title: "KIDS BJJ",
      image: "/images/cta-background.jpg", // Using existing image as placeholder
      slug: "kids-bjj"
    },
    {
      id: 3,
      title: "KICKBOXING",
      image: "/images/cta-background.jpg", // Using existing image as placeholder
      slug: "kickboxing"
    },
    {
      id: 4,
      title: "KIDS WRESTLING",
      image: "/images/cta-background.jpg", // Using existing image as placeholder
      slug: "kids-wrestling"
    },
    {
      id: 5,
      title: "MMA",
      image: "/images/cta-background.jpg", // Using existing image as placeholder
      slug: "mma"
    }
  ];

  const displayClasses = classes || defaultClasses;

  // Calculate the width of the scrollable area
  useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, [displayClasses]);

  // Error handler for image loading
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.style.backgroundColor = "#1A1A1A";
    e.target.alt = "Image not available";
  };

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
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="flex"
          >
            {displayClasses.map((item) => (
              <motion.div 
                key={item.id}
                className="min-w-[270px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[420px] h-[500px] p-4 relative"
                whileHover={{ scale: isDragging ? 1 : 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/classes/${item.slug}`} className="block h-full w-full relative">
                  <div className="absolute inset-0 bg-gray-900 opacity-40 dark:opacity-60 z-10"></div>
                  <div className="relative h-full w-full bg-gray-800">
                    <Image 
                      src={item.image}
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll hint indicators */}
        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1 opacity-70 z-20">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        
        {/* Instruction text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic"
        >
          Click and drag to explore more classes
        </motion.p>
      </div>
    </div>
  );
} 