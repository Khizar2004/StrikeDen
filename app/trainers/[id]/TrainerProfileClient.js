"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { deduplicateSchedules, formatDayName } from "@/lib/utils";
import { slideUp, staggerContainer } from "@/lib/animations";
import { BlobField } from "@/components/BlobField";
import { BrutalistButton } from "@/components/BrutalistButton";
import { FiArrowLeft } from "react-icons/fi";

const DAYS_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function TrainerProfileClient({
  trainer,
  schedules: rawSchedules,
}) {
  const { theme, mounted } = useTheme();
  const schedules = deduplicateSchedules(rawSchedules);

  if (!mounted) return null;
  if (!trainer)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0F0F0F", color: "#EDEBE6" }}
      >
        <p className="text-xl uppercase tracking-widest font-bold">
          Trainer not found
        </p>
      </div>
    );

  const isDark = theme === "dark";
  const textColor = isDark ? "#EDEBE6" : "#1A1A1A";
  const mutedColor = isDark
    ? "rgba(237,235,230,0.6)"
    : "rgba(15,15,15,0.55)";
  const surfaceBg = isDark ? "#141414" : "#F5F5F5";
  const dividerColor = isDark
    ? "rgba(237,235,230,0.12)"
    : "rgba(15,15,15,0.08)";

  const specializations = Array.isArray(trainer.specialization)
    ? trainer.specialization
    : trainer.specialization
      ? [trainer.specialization]
      : [];

  const scheduleDays = DAYS_ORDER.filter((day) =>
    schedules.some((s) => s.dayOfWeek === day)
  );

  return (
    <main style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Trainer image as background */}
        <div className="absolute inset-0">
          <Image
            src={trainer.image || "/images/placeholder-trainer.jpg"}
            alt={trainer.name}
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(to top, #0F0F0F 0%, rgba(15,15,15,0.7) 40%, rgba(15,15,15,0.3) 100%)"
                : "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 100%)",
            }}
          />
        </div>

        <BlobField
          colors={["#E50914", "#F8A348"]}
          intensity={0.06}
          blendMode={isDark ? "screen" : "multiply"}
        />

        <motion.div
          className="relative z-10 px-6 md:px-16 pb-20 md:pb-28 max-w-screen-xl w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Back link */}
          <motion.div variants={slideUp} className="mb-10">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-all hover:gap-3"
              style={{ color: "#F8A348" }}
            >
              <FiArrowLeft /> Back to Our Team
            </Link>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={slideUp}
            className="font-display uppercase"
            style={{
              fontSize: "clamp(3rem, 12vw, 11rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            {trainer.name}
          </motion.h1>

          {/* Specializations */}
          <motion.div
            variants={slideUp}
            className="mt-6 flex flex-wrap gap-3"
          >
            {specializations.map((spec) => (
              <span
                key={spec}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: isDark
                    ? "rgba(229,9,20,0.12)"
                    : "rgba(229,9,20,0.08)",
                  color: "#E50914",
                  border: `1px solid ${isDark ? "rgba(229,9,20,0.25)" : "rgba(229,9,20,0.15)"}`,
                }}
              >
                {spec}
              </span>
            ))}
          </motion.div>

          {/* Experience */}
          {trainer.experience && (
            <motion.p
              variants={slideUp}
              className="mt-5 text-sm uppercase tracking-widest font-bold"
              style={{ color: "#F8A348" }}
            >
              {trainer.experience} {typeof trainer.experience === "number" ? "years experience" : "experience"}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* ─── Bio ─── */}
      {trainer.bio && (
        <section
          className="px-6 md:px-16 py-32"
          style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-screen-xl mx-auto"
          >
            <motion.span
              variants={slideUp}
              className="text-xs uppercase tracking-widest mb-4 block font-bold"
              style={{ color: "#F8A348" }}
            >
              About
            </motion.span>
            <motion.h2
              variants={slideUp}
              className="font-display uppercase mb-10"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: textColor,
              }}
            >
              THE <span style={{ color: "#E50914" }}>STORY</span>
            </motion.h2>
            <motion.div variants={slideUp}>
              <div className="h-px mb-10" style={{ background: dividerColor }} />
              <p
                className="text-lg md:text-xl leading-relaxed max-w-3xl"
                style={{ color: mutedColor }}
              >
                {trainer.bio}
              </p>
              <div className="h-px mt-10" style={{ background: dividerColor }} />
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ─── Certifications ─── */}
      {trainer.certifications && trainer.certifications.length > 0 && (
        <section
          className="px-6 md:px-16 py-32"
          style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-screen-xl mx-auto"
          >
            <motion.span
              variants={slideUp}
              className="text-xs uppercase tracking-widest mb-4 block font-bold"
              style={{ color: "#F8A348" }}
            >
              Credentials
            </motion.span>
            <motion.h2
              variants={slideUp}
              className="font-display uppercase mb-10"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: textColor,
              }}
            >
              CERTIFI<span style={{ color: "#E50914" }}>CATIONS</span>
            </motion.h2>
            <motion.div
              variants={slideUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {trainer.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6"
                  style={{
                    background: surfaceBg,
                    borderLeft: "2px solid #E50914",
                  }}
                >
                  <span
                    className="font-display text-2xl flex-shrink-0"
                    style={{ color: "rgba(229,9,20,0.4)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-bold uppercase tracking-wider pt-1"
                    style={{ color: textColor }}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ─── Schedule ─── */}
      <section
        className="px-6 md:px-16 py-32"
        style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto"
        >
          <motion.span
            variants={slideUp}
            className="text-xs uppercase tracking-widest mb-4 block font-bold"
            style={{ color: "#F8A348" }}
          >
            Weekly Schedule
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-10"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            CLASS <span style={{ color: "#E50914" }}>TIMES</span>
          </motion.h2>

          {schedules.length === 0 ? (
            <motion.div
              variants={slideUp}
              className="py-16 text-center"
              style={{ background: surfaceBg }}
            >
              <p
                className="text-sm uppercase tracking-widest"
                style={{ color: mutedColor }}
              >
                No classes currently scheduled with this trainer.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={slideUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {scheduleDays.map((day) => {
                const daySchedules = schedules
                  .filter((s) => s.dayOfWeek === day)
                  .sort((a, b) => {
                    const timeA = a.startTimeString
                      .split(":")
                      .map(Number);
                    const timeB = b.startTimeString
                      .split(":")
                      .map(Number);
                    return (
                      timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1])
                    );
                  });

                return (
                  <div key={day} style={{ background: surfaceBg }}>
                    {/* Day header */}
                    <div
                      className="px-6 py-4"
                      style={{
                        borderBottom: `1px solid ${dividerColor}`,
                        borderLeft: "2px solid #E50914",
                      }}
                    >
                      <h3
                        className="font-display uppercase text-xl"
                        style={{ color: textColor, letterSpacing: "-0.02em" }}
                      >
                        {formatDayName(day)}
                      </h3>
                    </div>

                    {/* Classes */}
                    {daySchedules.map((schedule) => (
                      <div
                        key={schedule._id}
                        className="px-6 py-4"
                        style={{
                          borderBottom: `1px solid ${dividerColor}`,
                        }}
                      >
                        <p
                          className="font-bold text-sm uppercase tracking-wide"
                          style={{ color: textColor }}
                        >
                          {schedule.className}
                        </p>
                        <p
                          className="text-xs mt-1 uppercase tracking-widest"
                          style={{ color: "#F8A348" }}
                        >
                          {schedule.startTimeString} — {schedule.endTimeString}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="relative overflow-hidden py-32"
        style={{ background: isDark ? "#0A0A0A" : "#FAFAFA" }}
      >
        <BlobField
          colors={["#E50914", "#F8A348"]}
          intensity={0.08}
          blendMode={isDark ? "screen" : "multiply"}
        />
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
            Ready to Train?
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-10"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            BOOK A<br />
            <span
              style={{
                marginLeft: "8vw",
                display: "block",
                color: "#E50914",
              }}
            >
              SESSION.
            </span>
          </motion.h2>
          <motion.p
            variants={slideUp}
            className="max-w-md text-lg mb-12"
            style={{ color: mutedColor }}
          >
            Start training with {trainer.name} and take your skills to the
            next level.
          </motion.p>
          <motion.div variants={slideUp}>
            <BrutalistButton href="/contact">Get in Touch</BrutalistButton>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
