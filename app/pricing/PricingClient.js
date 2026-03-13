"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PricingCard from "../../components/PricingCard";
import dynamic from "next/dynamic";
import { trackFacebookEvent, FB_EVENTS } from "../../lib/facebook";
import { useTheme } from "../../components/ThemeProvider";
import BrutalistPageHero from "../../components/BrutalistPageHero";
import { BlobField } from "../../components/BlobField";
import { BrutalistButton } from "../../components/BrutalistButton";
import { slideUp, staggerContainer } from "../../lib/animations";

const ProgramDetailsModal = dynamic(
  () => import("../../components/ProgramDetailsModal"),
  { ssr: false }
);

export default function PricingClient({ programs }) {
  const { theme, mounted } = useTheme();
  const isDark = theme === "dark";

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProgramClick = useCallback((program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    trackFacebookEvent(FB_EVENTS.VIEW_CONTENT, {
      content_name: "Pricing Page",
      content_category: "Pricing Information",
      content_type: "product_group",
    });
  }, []);

  if (!mounted) return null;

  const textColor = isDark ? "#EDEBE6" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)";
  const surfaceBg = isDark ? "#141414" : "#F5F5F5";

  return (
    <main style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
      {/* ─── Hero ─── */}
      <BrutalistPageHero title="PRICING" accent="red" />

      {/* ─── Cards Section ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg md:text-xl max-w-3xl mb-16"
            style={{ color: mutedColor }}
          >
            Explore our programs and choose the perfect plan for your fitness journey.
            Click on any program to learn more about what&apos;s included.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {programs.map((programData) => (
              <motion.div key={programData._id} variants={slideUp} className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]">
                <PricingCard
                  classData={programData}
                  onClick={() => handleProgramClick(programData)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-32" style={{ background: isDark ? "#0A0A0A" : "#FAFAFA" }}>
        <BlobField colors={["#E50914", "#F8A348"]} intensity={0.08} blendMode={isDark ? "screen" : "multiply"} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 px-6 md:px-16 max-w-screen-xl mx-auto"
        >
          <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
            Ready to Begin?
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-10"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.82, letterSpacing: "-0.04em", color: textColor }}
          >
            START YOUR
            <br />
            <span style={{ marginLeft: "8vw", display: "block", color: "#E50914" }}>JOURNEY.</span>
          </motion.h2>
          <motion.p variants={slideUp} className="max-w-md text-lg mb-12" style={{ color: mutedColor }}>
            Contact us today to learn more about our classes and membership options.
          </motion.p>
          <motion.div variants={slideUp}>
            <BrutalistButton href="/contact">Get Started Today</BrutalistButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Program Details Modal */}
      {isModalOpen && (
        <ProgramDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          programData={selectedProgram}
        />
      )}
    </main>
  );
}
