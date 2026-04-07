"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "../components/ThemeProvider";
import { BlobField } from "../components/BlobField";
import { BrutalistButton } from "../components/BrutalistButton";
import { slideUp, staggerContainer } from "../lib/animations";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

export default function HomeClient({ trainers = [], classes = [] }) {
  const { mounted, theme } = useTheme();
  const isDark = theme === "dark";
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  if (!mounted) return null;

  return (
    <main style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Atmospheric blobs over video */}
        <BlobField intensity={0.06} blendMode={isDark ? "screen" : "multiply"} />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 px-6 md:px-16 max-w-screen-xl w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={slideUp}
            className="font-display uppercase"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 13rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: "#EDEBE6",
            }}
          >
            STRIKE
            <br />
            <span style={{ display: "block", marginLeft: "12vw" }}>DEN.</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mt-8 max-w-md text-lg"
            style={{ color: "rgba(237,235,230,0.6)" }}
          >
            Where champions are forged through discipline, technique, and heart.
            Elite combat sports training in Karachi.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <BrutalistButton href="/contact">Book a Class</BrutalistButton>
            <Link
              href="/classes"
              className="flex items-center gap-2 text-sm uppercase tracking-widest transition-all hover:gap-3"
              style={{ color: "#E50914" }}
            >
              Explore Programs <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Training Programs ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-screen-xl mx-auto"
        >
          <motion.div variants={slideUp}>
            <span
              className="text-xs uppercase tracking-widest mb-4 block font-bold"
              style={{ color: "#F8A348" }}
            >
              What We Offer
            </span>
            <h2
              className="font-display uppercase mb-8"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: isDark ? "#EDEBE6" : "#1A1A1A",
              }}
            >
              TRAINING FOR
              <br />
              <span style={{ color: "#E50914" }}>EVERY BODY</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)" }}>
              Whether you're looking to learn self-defense, get in shape, or
              train for competition, Strike Den offers diverse programs for all
              skill levels and goals.
            </p>
            <div className="space-y-6">
              {[
                {
                  label: "Combat Training",
                  desc: "Expert instruction in boxing, Muay Thai, and MMA",
                },
                {
                  label: "Strength & Conditioning",
                  desc: "Build functional strength and endurance",
                },
                {
                  label: "Group & Private Training",
                  desc: "Options to suit your schedule and preferences",
                },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-px h-12 self-stretch mt-1 flex-shrink-0"
                    style={{ background: "#E50914" }}
                  />
                  <div>
                    <div
                      className="font-bold uppercase tracking-widest text-xs mb-1"
                      style={{ color: "#F8A348" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)" }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="relative">
            <div
              className="absolute -top-4 -left-4 w-16 h-16 z-10"
              style={{ background: "#E50914" }}
            />
            <Image
              src="/images/gym-story.jpg"
              alt="Strike Den Training"
              width={600}
              height={750}
              className="relative w-full object-cover"
              style={{ aspectRatio: "4/5" }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-16 h-16"
              style={{ background: "#F8A348", opacity: 0.55 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Classes Grid ─── */}
      <section
        className="px-6 md:px-16 py-32"
        style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
      >
        <span className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
          Featured Classes
        </span>
        <h2
          className="font-display uppercase mb-10"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            color: isDark ? "#EDEBE6" : "#1A1A1A",
          }}
        >
          WHAT WE <span style={{ color: "#E50914" }}>TEACH</span>
        </h2>
        {classes.length === 0 ? (
          <div className="py-12">
            <p style={{ color: isDark ? "rgba(237,235,230,0.4)" : "rgba(15,15,15,0.4)" }}>
              Our class schedule is being updated. Check back soon!
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap justify-center gap-x-4 gap-y-16"
          >
            {classes.slice(0, 3).map((classItem, index) => (
              <motion.div key={classItem._id || index} variants={slideUp} className="group w-full md:w-[calc(33.333%-0.67rem)]">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={classItem.image || "/images/default-class.jpg"}
                      alt={classItem.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-class.jpg";
                      }}
                    />
                  </motion.div>
                  {/* Bottom fade */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(to top, #0F0F0F 0%, transparent 55%)"
                        : "linear-gradient(to top, #FFFFFF 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span
                      className="block text-[0.6875rem] uppercase tracking-widest font-bold mb-2"
                      style={{ color: "#F8A348" }}
                    >
                      {classItem.category || "Featured Class"}
                    </span>
                    <h3
                      className="uppercase font-bold tracking-[0.06em] text-sm"
                      style={{ color: isDark ? "#EDEBE6" : "#1A1A1A" }}
                    >
                      {classItem.title}
                    </h3>
                    {classItem.shortDescription && (
                      <p
                        className="text-xs mt-2 line-clamp-2"
                        style={{ color: isDark ? "rgba(237,235,230,0.5)" : "rgba(15,15,15,0.5)" }}
                      >
                        {classItem.shortDescription}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16"
        >
          <BrutalistButton href="/classes">View All Classes</BrutalistButton>
        </motion.div>
      </section>

      {/* ─── Trainers Section ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto space-y-20"
        >
          <motion.div variants={slideUp}>
            <span className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
              The Coaches
            </span>
            <h2
              className="font-display uppercase mb-10"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: isDark ? "#EDEBE6" : "#1A1A1A",
              }}
            >
              MEET YOUR <span style={{ color: "#E50914" }}>TRAINERS</span>
            </h2>
          </motion.div>
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer._id || index}
              variants={slideUp}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              {/* Image */}
              <div
                className={`md:col-span-5 ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={trainer.image || "/images/placeholder-trainer.jpg"}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isDark
                        ? "linear-gradient(to top, #0F0F0F 0%, transparent 50%)"
                        : "linear-gradient(to top, #FFFFFF 0%, transparent 50%)",
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div
                className={`md:col-span-7 flex flex-col gap-5 ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <div
                  className="h-px"
                  style={{ background: isDark ? "rgba(237,235,230,0.15)" : "rgba(0,0,0,0.08)" }}
                />
                <h3
                  className="font-display uppercase"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.04em",
                    color: isDark ? "#EDEBE6" : "#1A1A1A",
                  }}
                >
                  {trainer.name}
                </h3>
                <div
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: "#F8A348" }}
                >
                  {Array.isArray(trainer.specialization)
                    ? trainer.specialization.join(" · ")
                    : trainer.specialization}
                </div>
                <div
                  className="h-px"
                  style={{ background: isDark ? "rgba(237,235,230,0.15)" : "rgba(0,0,0,0.08)" }}
                />
                <p
                  className="text-base"
                  style={{ color: isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)" }}
                >
                  {trainer.bio || "Expert instructor with years of real-world experience."}
                </p>
                <div
                  className="h-px"
                  style={{ background: isDark ? "rgba(237,235,230,0.15)" : "rgba(0,0,0,0.08)" }}
                />
                <Link
                  href={`/trainers/${trainer._id}`}
                  className="flex items-center gap-2 text-sm uppercase tracking-widest transition-all hover:gap-3"
                  style={{ color: "#E50914" }}
                >
                  Full Profile <FiArrowUpRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── CTA Section ─── */}
      <section
        className="relative overflow-hidden py-32"
        style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
      >
        <BlobField colors={["#E50914", "#F8A348"]} intensity={0.08} blendMode={isDark ? "screen" : "multiply"} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 px-6 md:px-16 max-w-screen-xl mx-auto"
        >
          <motion.span
            variants={slideUp}
            className="text-xs uppercase tracking-widest mb-4 block font-bold"
            style={{ color: "#F8A348" }}
          >
            Ready to Begin?
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-10"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: isDark ? "#EDEBE6" : "#1A1A1A",
            }}
          >
            START YOUR
            <br />
            <span style={{ marginLeft: "8vw", display: "block", color: "#E50914" }}>
              JOURNEY.
            </span>
          </motion.h2>
          <motion.p
            variants={slideUp}
            className="max-w-md text-lg mb-12"
            style={{ color: isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)" }}
          >
            Join our community and transform your mind and body through
            disciplined training and expert guidance.
          </motion.p>
          <motion.div variants={slideUp}>
            <BrutalistButton href="/contact">Get Started</BrutalistButton>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
