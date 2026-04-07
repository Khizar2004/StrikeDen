"use client";
import Schedule from '@/components/Schedule';
import BrutalistPageHero from '@/components/BrutalistPageHero';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { slideUp } from '@/lib/animations';

export default function ScheduleClient({ schedules }) {
  const { theme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) return null;

  return (
    <main style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
      <BrutalistPageHero
        title="CLASS SCHEDULE"
        subtitle="View our weekly class schedule and plan your training"
      />

      <section className="px-6 md:px-16 pb-32" style={{ background: isDark ? "#141414" : "#F5F5F5" }}>
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto -mt-16 relative z-10"
        >
          <div style={{ background: isDark ? "#1A1A1A" : "#FFFFFF", border: `1px solid ${isDark ? "rgba(237,235,230,0.08)" : "rgba(0,0,0,0.06)"}` }}>
            <Schedule initialClasses={schedules} />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
