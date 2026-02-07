"use client";
import Schedule from '@/components/Schedule';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';

export default function ScheduleClient({ schedules }) {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="container mx-auto px-4 py-8"
    >
      <PageHeader
        title="Class Schedule"
        subtitle="View our weekly class schedule and plan your training"
      />

      <Schedule classes={schedules} />
    </motion.div>
  );
}
