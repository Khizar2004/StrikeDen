"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Schedule from "../../components/Schedule";
import OfferingsSlider from "../../components/OfferingsSlider";
import { trackFacebookEvent, FB_EVENTS } from "../../lib/facebook";
import { useTheme } from "../../components/ThemeProvider";
import { slideUp, staggerContainer } from "../../lib/animations";
import BrutalistPageHero from "../../components/BrutalistPageHero";
import { BlobField } from "../../components/BlobField";

export default function ClassesClient({ schedules, classes, programs }) {
  const { theme, mounted } = useTheme();
  const isDark = theme === "dark";

  const handleClassSignupClick = (className) => {
    trackFacebookEvent(FB_EVENTS.COMPLETE_REGISTRATION, {
      content_name: className || "Class Registration",
      content_category: "Class Signup",
      status: "interested",
    });
  };

  useEffect(() => {
    trackFacebookEvent(FB_EVENTS.VIEW_CONTENT, {
      content_name: "Classes Page",
      content_category: "Training Programs",
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
      <BrutalistPageHero
        title="TRAINING PROGRAMS"
        subtitle="Classes and programs for all skill levels — find the right fit for your goals."
      />

      {/* ─── Offerings Slider ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <OfferingsSlider initialClasses={classes} initialPrograms={programs} isDark={isDark} />
      </section>

      {/* ─── Schedule ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto"
        >
          <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
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
          <motion.div variants={slideUp} className="overflow-hidden" style={{ background: isDark ? "#1A1A1A" : "#F5F5F5" }}>
            <Schedule initialClasses={schedules} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Training Info ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-screen-xl mx-auto"
        >
          <motion.div variants={slideUp}>
            <span className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
              Our Approach
            </span>
            <h2
              className="font-display uppercase mb-8"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: textColor,
              }}
            >
              PERSONALIZED
              <br />
              <span style={{ color: "#E50914" }}>TRAINING</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: mutedColor }}>
              Our professional instructors adapt each class to accommodate different skill levels, ensuring everyone gets the most out of their training experience.
            </p>
            <div className="space-y-6">
              {[
                { label: "Small Class Sizes", desc: "Personalized attention for every student" },
                { label: "Beginner Friendly", desc: "Introduction to techniques at your pace" },
                { label: "Advanced Training", desc: "Push your limits with expert guidance" },
                { label: "Private Sessions", desc: "One-on-one focused improvement" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-px h-12 self-stretch mt-1 flex-shrink-0" style={{ background: "#E50914" }} />
                  <div>
                    <div className="font-bold uppercase tracking-widest text-xs mb-1" style={{ color: "#F8A348" }}>
                      {label}
                    </div>
                    <div className="text-sm" style={{ color: mutedColor }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 z-10" style={{ background: "#E50914" }} />
            <Image
              src="/images/group1.jpg"
              alt="Personalized Training"
              width={600}
              height={750}
              className="relative w-full object-cover"
              style={{ aspectRatio: "4/5" }}
            />
            <div className="absolute -bottom-4 -right-4 w-16 h-16" style={{ background: "#F8A348", opacity: 0.55 }} />
          </motion.div>
        </motion.div>
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
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            START
            <br />
            <span style={{ marginLeft: "8vw", display: "block", color: "#E50914" }}>TRAINING.</span>
          </motion.h2>
          <motion.p variants={slideUp} className="max-w-md text-lg mb-12" style={{ color: mutedColor }}>
            Join our community today and transform your fitness level with expert guidance.
          </motion.p>
          <motion.div variants={slideUp}>
            <a
              href="https://api.whatsapp.com/send/?phone=923372629350&text=Hi!%20I%27m%20interested%20in%20joining%20classes%20at%20Strike%20Den.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClassSignupClick("WhatsApp Signup")}
              className="relative inline-block overflow-hidden px-8 py-4 group"
              style={{ background: "#EDEBE6" }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" style={{ background: "#E50914" }} />
              <span className="relative z-10 font-bold text-sm uppercase tracking-widest transition-colors duration-300 group-hover:text-white" style={{ color: "#0F0F0F" }}>
                Sign Up for Classes
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
