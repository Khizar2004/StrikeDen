"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const ClassDetailsModal = dynamic(() => import("./ClassDetailsModal"), { ssr: false });

export default function ClassesSlider({ initialClasses, isDark }) {
  const [classes, setClasses] = useState(initialClasses || []);
  const [loading, setLoading] = useState(!initialClasses);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const contentRef = useRef(null);
  const dragStartTime = useRef(0);
  const dragDistance = useRef(0);
  const dragStartPos = useRef(0);

  const handleContentRef = useCallback((node) => {
    contentRef.current = node;
    if (node) {
      requestAnimationFrame(() => {
        if (sliderRef.current && contentRef.current) {
          const newWidth = contentRef.current.scrollWidth - sliderRef.current.offsetWidth;
          setWidth(Math.max(0, newWidth));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (initialClasses) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/classes");
        const data = await res.json();
        if (data.success) {
          setClasses(data.classes || []);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialClasses]);

  useEffect(() => {
    if (sliderRef.current && contentRef.current && classes?.length) {
      const newWidth = contentRef.current.scrollWidth - sliderRef.current.offsetWidth;
      setWidth(Math.max(0, newWidth));
    }
  }, [classes]);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && contentRef.current && classes?.length) {
        const newWidth = contentRef.current.scrollWidth - sliderRef.current.offsetWidth;
        setWidth(Math.max(0, newWidth));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [classes]);

  const handleDragStart = useCallback((e, info) => {
    setIsDragging(true);
    dragStartTime.current = Date.now();
    dragStartPos.current = info.point.x;
    dragDistance.current = 0;
    document.querySelectorAll(".class-card-link").forEach((link) => {
      link.style.pointerEvents = "none";
    });
  }, []);

  const handleDragEnd = useCallback((e, info) => {
    dragDistance.current = Math.abs(info.point.x - dragStartPos.current);
    setTimeout(() => {
      setIsDragging(false);
      document.querySelectorAll(".class-card-link").forEach((link) => {
        link.style.pointerEvents = "auto";
      });
    }, 50);
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) e.preventDefault();
  }, []);

  const handleCardClick = useCallback(
    (e, item) => {
      const dragTime = Date.now() - dragStartTime.current;
      if (!isDragging || (dragDistance.current < 20 && dragTime < 200)) {
        e.preventDefault();
        setSelectedClass(item);
        setIsModalOpen(true);
      }
    },
    [isDragging]
  );

  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.style.backgroundColor = "#1A1A1A";
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 border-t-2 border-b-2 border-[#E50914] animate-spin" />
        </div>
      </div>
    );
  }

  if (!classes.length) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12 text-center">
        <p className="text-[rgba(15,15,15,0.55)] dark:text-[rgba(237,235,230,0.6)]">
          No classes available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-0 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display uppercase text-center mb-12 text-[#1A1A1A] dark:text-[#EDEBE6]"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.04em",
        }}
      >
        OUR CLASSES
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden relative"
        >
          <motion.div
            ref={sliderRef}
            className="cursor-grab overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
            onMouseDown={handleMouseDown}
          >
            <motion.div
              ref={handleContentRef}
              className="flex"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              dragTransition={{
                power: 0.25,
                timeConstant: 400,
                modifyTarget: (target) => Math.round(target / 100) * 100,
              }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragElastic={0.05}
              dragMomentum={true}
            >
              {classes.map((item) => (
                <motion.div
                  key={item._id}
                  className="min-w-[270px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[420px] h-[500px] relative px-2"
                  whileHover={{ scale: isDragging ? 1 : 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="class-card-link block h-full w-full relative cursor-pointer overflow-hidden"
                    onClick={(e) => handleCardClick(e, item)}
                  >
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background:
                          "linear-gradient(to top, #141414 0%, rgba(20,20,20,0.6) 40%, transparent 100%)",
                      }}
                    />
                    <div className="relative h-full w-full">
                      <Image
                        src={item.image || "/images/default-class.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                        onError={handleImageError}
                        draggable="false"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col items-center">
                      <h3
                        className="font-display uppercase text-white text-center mb-2"
                        style={{
                          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                          lineHeight: 0.88,
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.shortDescription && (
                        <p className="text-[rgba(237,235,230,0.6)] text-base mt-1 mb-3 text-center line-clamp-2">
                          {item.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {classes.length > 2 && (
            <>
              <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1.5 opacity-70 z-20">
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="w-1.5 h-1.5 bg-white" />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center text-sm uppercase tracking-wide mt-4 text-[rgba(15,15,15,0.55)] dark:text-[rgba(237,235,230,0.6)]"
              >
                Drag to explore more classes
              </motion.p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <ClassDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classData={selectedClass}
      />
    </div>
  );
}
