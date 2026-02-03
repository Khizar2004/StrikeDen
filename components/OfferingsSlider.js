"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ClassDetailsModal from './ClassDetailsModal';
import ProgramDetailsModal from './ProgramDetailsModal';

export default function OfferingsSlider() {
  const [activeTab, setActiveTab] = useState('classes');
  const [classes, setClasses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const contentRef = useRef(null);
  const dragStartTime = useRef(0);
  const dragDistance = useRef(0);
  const dragStartPos = useRef(0);

  const currentItems = activeTab === 'classes' ? classes : programs;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [classesRes, programsRes] = await Promise.all([
          fetch('/api/classes'),
          fetch('/api/programs')
        ]);

        const classesData = await classesRes.json();
        const programsData = await programsRes.json();

        if (classesData.success) {
          setClasses(classesData.classes || []);
        }
        if (programsData.success) {
          const activePrograms = (programsData.programs || []).filter(prog => prog.active);
          setPrograms(activePrograms);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate width
  useEffect(() => {
    if (sliderRef.current && contentRef.current && currentItems?.length) {
      const newWidth = contentRef.current.scrollWidth - sliderRef.current.offsetWidth;
      setWidth(Math.max(0, newWidth));
    }
  }, [currentItems, activeTab]);

  // Update width on resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && contentRef.current && currentItems?.length) {
        const newWidth = contentRef.current.scrollWidth - sliderRef.current.offsetWidth;
        setWidth(Math.max(0, newWidth));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentItems]);

  const handleDragStart = (e, info) => {
    setIsDragging(true);
    dragStartTime.current = Date.now();
    dragStartPos.current = info.point.x;
    dragDistance.current = 0;

    document.querySelectorAll('.offering-card-link').forEach(link => {
      link.style.pointerEvents = 'none';
    });
  };

  const handleDragEnd = (e, info) => {
    const dragTime = Date.now() - dragStartTime.current;
    dragDistance.current = Math.abs(info.point.x - dragStartPos.current);

    setTimeout(() => {
      setIsDragging(false);
      document.querySelectorAll('.offering-card-link').forEach(link => {
        link.style.pointerEvents = 'auto';
      });
    }, 50);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      e.preventDefault();
    }
  };

  const handleCardClick = (e, item) => {
    const dragTime = Date.now() - dragStartTime.current;
    if (!isDragging || (dragDistance.current < 20 && dragTime < 200)) {
      e.preventDefault();
      if (activeTab === 'classes') {
        setSelectedClass(item);
        setIsClassModalOpen(true);
      } else {
        setSelectedProgram(item);
        setIsProgramModalOpen(true);
      }
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.style.backgroundColor = "#1A1A1A";
    e.target.alt = "Image not available";
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  const hasClasses = classes.length > 0;
  const hasPrograms = programs.length > 0;

  // If only one type exists, don't show tabs
  if (!hasClasses && !hasPrograms) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">No offerings available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-0 py-12">
      {/* Tab Switcher - Only show if both exist */}
      {hasClasses && hasPrograms && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-xl p-1.5">
            <button
              onClick={() => setActiveTab('classes')}
              className={`relative px-8 py-3 text-lg font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'classes'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {activeTab === 'classes' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-600 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Classes</span>
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`relative px-8 py-3 text-lg font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'programs'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {activeTab === 'programs' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-600 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Programs</span>
            </button>
          </div>
        </div>
      )}

      {/* Section Title */}
      <motion.h2
        key={activeTab}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-5xl md:text-6xl font-black text-center mb-12 tracking-tight text-gray-900 dark:text-white"
      >
        {activeTab === 'classes' ? 'OUR CLASSES' : 'OUR PROGRAMS'}
      </motion.h2>

      {/* Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden relative"
        >
          {currentItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No {activeTab} available at the moment.
            </div>
          ) : (
            <>
              <motion.div
                ref={sliderRef}
                className="cursor-grab overflow-hidden"
                whileTap={{ cursor: "grabbing" }}
                onMouseDown={handleMouseDown}
              >
                <motion.div
                  ref={contentRef}
                  className="flex"
                  drag="x"
                  dragConstraints={{ right: 0, left: -width }}
                  dragTransition={{
                    power: 0.25,
                    timeConstant: 400,
                    modifyTarget: target => Math.round(target / 100) * 100
                  }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  dragElastic={0.05}
                  dragMomentum={true}
                >
                  {currentItems.map((item) => (
                    <motion.div
                      key={item._id}
                      className="min-w-[270px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[420px] h-[500px] relative px-2"
                      whileHover={{ scale: isDragging ? 1 : 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="offering-card-link block h-full w-full relative cursor-pointer overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition-transform duration-500 hover:shadow-xl"
                        onClick={(e) => handleCardClick(e, item)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                        <div className="relative h-full w-full">
                          <Image
                            src={item.image || "/images/default-class.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                            onError={handleImageError}
                            draggable="false"
                            priority
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col items-center">
                          <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg text-center mb-2">
                            {item.title}
                          </h3>
                          {item.shortDescription && (
                            <p className="text-gray-200 text-lg mt-1 mb-3 text-center line-clamp-2">
                              {item.shortDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Scroll hint */}
              {currentItems.length > 2 && (
                <>
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1 opacity-70 z-20">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic"
                  >
                    Drag to explore more {activeTab}
                  </motion.p>
                </>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <ClassDetailsModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        classData={selectedClass}
      />
      <ProgramDetailsModal
        isOpen={isProgramModalOpen}
        onClose={() => setIsProgramModalOpen(false)}
        programData={selectedProgram}
      />
    </div>
  );
}
