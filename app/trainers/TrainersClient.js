"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { slideUp, staggerContainer } from "../../lib/animations";
import BrutalistPageHero from "../../components/BrutalistPageHero";
import { BlobField } from "../../components/BlobField";
import { BrutalistButton } from "../../components/BrutalistButton";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function TrainersClient({ trainers = [] }) {
  const { theme, mounted } = useTheme();
  const [selectedTrainer, setSelectedTrainer] = useState(
    trainers.length > 0 ? trainers[0] : null
  );

  if (!mounted) return null;

  const isDark = theme === "dark";
  const textColor = isDark ? "#EDEBE6" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)";
  const surfaceBg = isDark ? "#141414" : "#F5F5F5";
  const dividerColor = isDark ? "rgba(237,235,230,0.15)" : "rgba(0,0,0,0.08)";

  return (
    <main style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
      {/* ─── Hero ─── */}
      <BrutalistPageHero title="THE COACHES" />

      {/* ─── Intro + Trainer Browser ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg md:text-xl max-w-3xl mb-20"
            style={{ color: mutedColor }}
          >
            Our instructors bring years of experience and passion to every class. Whether you&apos;re a beginner or seasoned fighter, our coaches tailor every session to your goals.
          </motion.p>

          {trainers.length === 0 ? (
            <div className="py-16 text-center">
              <p style={{ color: mutedColor }} className="text-xl">Our trainer information is being updated. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* ── Sidebar ── */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 gap-2 sticky top-24"
                >
                  {trainers.map((trainer) => {
                    const isActive = selectedTrainer?._id === trainer._id;
                    return (
                      <motion.div
                        key={trainer._id}
                        variants={slideUp}
                        className="cursor-pointer flex items-center p-4 transition-colors duration-200"
                        style={{ background: isActive ? "#E50914" : (isDark ? "#1A1A1A" : "#FFFFFF") }}
                        onClick={() => setSelectedTrainer(trainer)}
                        whileHover={!isActive ? { x: 4, transition: { duration: 0.2 } } : {}}
                      >
                        <div className="relative h-14 w-14 overflow-hidden mr-4 flex-shrink-0">
                          <Image
                            src={trainer.image || "/images/placeholder-trainer.jpg"}
                            alt={trainer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3
                            className="font-display uppercase text-sm"
                            style={{ color: isActive ? "#FFFFFF" : textColor, letterSpacing: "0.04em" }}
                          >
                            {trainer.name}
                          </h3>
                          <p className="text-xs mt-0.5" style={{ color: isActive ? "rgba(255,255,255,0.8)" : mutedColor }}>
                            {Array.isArray(trainer.specialization)
                              ? trainer.specialization.join(", ")
                              : trainer.specialization}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* ── Main Profile ── */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                {selectedTrainer && (
                  <motion.div
                    key={selectedTrainer._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Large Image */}
                    <div className="relative" style={{ height: "75vh" }}>
                      <Image
                        src={selectedTrainer.image || "/images/placeholder-trainer.jpg"}
                        alt={selectedTrainer.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${isDark ? surfaceBg : "#FFFFFF"} 0%, transparent 50%)`,
                        }}
                      />
                    </div>

                    {/* Content below image */}
                    <div className="px-2 -mt-8 relative z-10">
                      <h2
                        className="font-display uppercase"
                        style={{
                          fontSize: "clamp(2.5rem, 6vw, 5rem)",
                          lineHeight: 0.88,
                          letterSpacing: "-0.04em",
                          color: textColor,
                        }}
                      >
                        {selectedTrainer.name}
                      </h2>

                      {/* Spec tags */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {(Array.isArray(selectedTrainer.specialization)
                          ? selectedTrainer.specialization
                          : [selectedTrainer.specialization]
                        ).map((spec, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-medium"
                            style={{
                              border: `1px solid ${dividerColor}`,
                              color: isDark ? "#F8A348" : "#E50914",
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Bio */}
                      <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${dividerColor}` }}>
                        <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: mutedColor }}>
                          {selectedTrainer.bio || "Experienced instructor passionate about helping students achieve their goals."}
                        </p>
                        {selectedTrainer.experience && (
                          <p className="mt-4 text-sm" style={{ color: mutedColor }}>
                            <span className="uppercase tracking-widest text-xs font-bold" style={{ color: textColor }}>Experience</span>
                            <br />{selectedTrainer.experience} years
                          </p>
                        )}
                      </div>

                      {/* Certifications */}
                      {selectedTrainer.certifications?.length > 0 && (
                        <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${dividerColor}` }}>
                          <h3 className="uppercase tracking-widest text-xs font-bold mb-4" style={{ color: "#F8A348" }}>Expertise</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedTrainer.certifications.map((cert, index) => (
                              <span key={index} className="inline-block px-3 py-1 text-xs" style={{ border: `1px solid ${dividerColor}`, color: textColor }}>
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View Schedule + Socials */}
                      <div className="mt-8 pt-8 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6" style={{ borderTop: `1px solid ${dividerColor}` }}>
                        <Link
                          href={`/trainers/${selectedTrainer._id}`}
                          className="flex items-center gap-2 text-sm uppercase tracking-widest transition-all hover:gap-3"
                          style={{ color: "#E50914" }}
                        >
                          View Schedule <FiArrowRight />
                        </Link>

                        <div className="flex items-center gap-5">
                          {selectedTrainer.socialMedia?.instagram && (
                            <a href={selectedTrainer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: mutedColor }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E50914")} onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}>
                              <FaInstagram size={18} />
                            </a>
                          )}
                          {selectedTrainer.socialMedia?.twitter && (
                            <a href={selectedTrainer.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: mutedColor }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E50914")} onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}>
                              <FaTwitter size={18} />
                            </a>
                          )}
                          {selectedTrainer.socialMedia?.linkedin && (
                            <a href={selectedTrainer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: mutedColor }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E50914")} onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}>
                              <FaLinkedinIn size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
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
            Ready to Train?
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-10"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.82, letterSpacing: "-0.04em", color: textColor }}
          >
            BOOK YOUR
            <br />
            <span style={{ marginLeft: "8vw", display: "block", color: "#E50914" }}>SESSION.</span>
          </motion.h2>
          <motion.p variants={slideUp} className="max-w-md text-lg mb-12" style={{ color: mutedColor }}>
            Whether you&apos;re a beginner or experienced practitioner, our team is ready to help you achieve your goals.
          </motion.p>
          <motion.div variants={slideUp} className="flex flex-wrap items-center gap-8">
            <BrutalistButton href="/contact">Book a Session</BrutalistButton>
            <Link
              href="/classes"
              className="flex items-center gap-2 text-sm uppercase tracking-widest transition-all hover:gap-3"
              style={{ color: "#E50914" }}
            >
              View Class Schedule <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
