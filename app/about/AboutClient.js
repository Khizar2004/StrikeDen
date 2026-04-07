"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { slideUp, staggerContainer } from "../../lib/animations";
import BrutalistPageHero from "../../components/BrutalistPageHero";
import { BlobField } from "../../components/BlobField";
import { BrutalistButton } from "../../components/BrutalistButton";

export default function AboutClient({ trainers }) {
  const { theme, mounted } = useTheme();

  if (!mounted) return null;

  const isDark = theme === "dark";
  const textColor = isDark ? "#EDEBE6" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)";
  const dividerColor = isDark ? "rgba(237,235,230,0.08)" : "rgba(0,0,0,0.06)";
  const pageBg = isDark ? "#0F0F0F" : "#FFFFFF";

  const testimonials = [
    {
      quote: "Strike Den completely changed my fitness journey. The coaches are amazing, and the environment is genuinely comfortable and empowering for women.",
      name: "Malaika Ahmed",
      image: "/images/malaika.jpeg",
    },
    {
      quote: "StrikeDen has top-notch facilities and incredible coaches. It's an amazing place for beginners; there are lots of styles, all grounded in strong fundamentals.",
      name: "Minhaal Haider, Team Fight Fortress",
      image: "/images/minhaal.jpeg",
    },
  ];

  const facilities = [
    { title: "Training Areas", desc: "Spacious, padded training areas for striking, grappling, and all types of martial arts practice." },
    { title: "Conditioning Equipment", desc: "Professional strength and conditioning equipment to enhance your performance." },
    { title: "Community Space", desc: "Dedicated spaces for our community to connect, learn, and grow." },
    { title: "Sparring Zones", desc: "Designated areas for technical sparring with proper safety equipment." },
    { title: "Recovery Areas", desc: "Facilities for stretching, cooling down, and recovery after training." },
    { title: "Heavy Bag Section", desc: "Professional-grade heavy bags for developing striking power and technique." },
  ];

  return (
    <main style={{ background: pageBg }}>
      {/* ─── Hero ─── */}
      <BrutalistPageHero title="OUR STORY" />

      {/* ─── Origin Story ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: pageBg }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-screen-xl mx-auto"
        >
          <motion.div variants={slideUp}>
            <span className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
              Our Beginning
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
              FROM HUMBLE
              <br />
              <span style={{ color: "#E50914" }}>BEGINNINGS</span>
            </h2>
            <div className="flex gap-4">
              <div className="w-px flex-shrink-0" style={{ background: "#E50914" }} />
              <div className="space-y-6 text-lg" style={{ color: mutedColor }}>
                <p>
                  Strike Den started in the smallest of spaces, a humble flat run by Sikander Ali Shah. It began with just 11 students, but not everyone believed in it. The place wasn&apos;t big, posh, or even pretty to look at.
                </p>
                <p>
                  It was raw, unrefined, and built on the belief that hard work trumps all. Despite the early doubts, Sikander and his students stayed committed.
                </p>
                <p>
                  Started in 2022, Strike Den is now a fully operational MMA facility, equipped with everything you&apos;d expect from a top-tier gym. It&apos;s proof that when you&apos;re driven by passion and perseverance, a small beginning can turn into something truly extraordinary.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <BrutalistButton href="/contact">JOIN OUR COMMUNITY</BrutalistButton>
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 z-10" style={{ background: "#E50914" }} />
            <Image
              src="/images/gym-story.jpg"
              alt="Strike Den Gym Interior"
              width={600}
              height={750}
              className="relative w-full object-cover"
              style={{ aspectRatio: "4/5" }}
            />
            <div className="absolute -bottom-4 -right-4 w-16 h-16" style={{ background: "#F8A348", opacity: 0.55 }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Mission Content ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: pageBg }}>
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
              Our Mission
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
              WHAT WE <span style={{ color: "#E50914" }}>STAND FOR</span>
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="font-display italic mb-20 max-w-4xl"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                lineHeight: 1.2,
                color: isDark ? "rgba(237,235,230,0.85)" : "rgba(15,15,15,0.75)",
              }}
            >
              &ldquo;To bring world-class combat sports training to Karachi, fostering a supportive and disciplined environment where individuals build confidence, resilience, and strength, both in and out of the ring.&rdquo;
            </motion.p>

            {/* ─── Mission Pillars (Typographic Numbered Layout) ─── */}
            <motion.div variants={staggerContainer}>
              {[
                { num: "01", title: "Excellence", desc: "We pursue technical excellence in every aspect of combat sports." },
                { num: "02", title: "Community", desc: "We build a supportive community that lifts each other up." },
                { num: "03", title: "Growth", desc: "We foster both physical and mental growth in all our members." },
              ].map((pillar, i) => (
                <motion.div key={i} variants={slideUp}>
                  {i > 0 && <div className="h-px my-0" style={{ background: dividerColor }} />}
                  <div className="grid grid-cols-12 gap-6 py-10 items-baseline">
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", color: "#E50914", lineHeight: 1 }}>
                        {pillar.num}
                      </span>
                    </div>
                    <div className="col-span-10 md:col-span-11">
                      <h3 className="font-display uppercase mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", lineHeight: 0.9, letterSpacing: "-0.04em", color: textColor }}>
                        {pillar.title}
                      </h3>
                      <p className="max-w-xl text-base" style={{ color: mutedColor }}>{pillar.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: pageBg }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto"
        >
          <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
            The Team
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
            OUR <span style={{ color: "#E50914" }}>COACHES</span>
          </motion.h2>
          <motion.p variants={slideUp} className="text-lg max-w-3xl mb-16" style={{ color: mutedColor }}>
            Our coaches are experienced professionals dedicated to helping you achieve your goals through personalized guidance and support.
          </motion.p>

          {trainers.length > 0 ? (
            <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-x-4 gap-y-16">
              {trainers.map((member, index) => (
                <motion.div key={member._id || index} variants={slideUp} className="group w-full md:w-[calc(33.333%-0.67rem)]">
                  <Link href={`/trainers/${member._id}`} className="block">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Image
                          src={member.image || "/images/placeholder-trainer.jpg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isDark
                            ? `linear-gradient(to top, ${pageBg} 0%, transparent 55%)`
                            : `linear-gradient(to top, ${pageBg} 0%, transparent 55%)`,
                        }}
                      />
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="block text-[0.6875rem] uppercase tracking-widest font-bold mb-2" style={{ color: "#F8A348" }}>
                          {Array.isArray(member.specialization) ? member.specialization.join(" · ") : member.specialization}
                        </span>
                        <h3 className="uppercase font-bold tracking-[0.06em] text-sm" style={{ color: textColor }}>
                          {member.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-12">
              <p style={{ color: mutedColor }}>Our team information is being updated. Check back soon!</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* ─── Facilities (Asymmetric Staggered Layout) ─── */}
      <section className="px-6 md:px-16 py-20" style={{ background: pageBg }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto"
        >
          <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
            Facilities
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-16"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            WORLD-CLASS <span style={{ color: "#E50914" }}>EQUIPMENT</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 max-w-screen-xl mx-auto">
            {/* Left column */}
            <div className="space-y-12">
              {facilities.filter((_, i) => i % 2 === 0).map((f, i) => (
                <motion.div key={i} variants={slideUp} className="relative">
                  <span className="font-display absolute -top-4 -left-2 select-none pointer-events-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: textColor, opacity: 0.04, lineHeight: 1 }}>
                    {String(i * 2 + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <h3 className="font-bold uppercase tracking-widest text-xs mb-3" style={{ color: "#F8A348" }}>
                      {f.title}
                    </h3>
                    <p className="text-base max-w-sm" style={{ color: mutedColor }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Right column — offset */}
            <div className="space-y-12 md:pt-16">
              {facilities.filter((_, i) => i % 2 === 1).map((f, i) => (
                <motion.div key={i} variants={slideUp} className="relative">
                  <span className="font-display absolute -top-4 -left-2 select-none pointer-events-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: textColor, opacity: 0.04, lineHeight: 1 }}>
                    {String(i * 2 + 2).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <h3 className="font-bold uppercase tracking-widest text-xs mb-3" style={{ color: "#F8A348" }}>
                      {f.title}
                    </h3>
                    <p className="text-base max-w-sm" style={{ color: mutedColor }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Testimonials (Large Serif Italic Quotes) ─── */}
      <section className="px-6 md:px-16 py-20" style={{ background: pageBg }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto"
        >
          <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
            Voices
          </motion.span>
          <motion.h2
            variants={slideUp}
            className="font-display uppercase mb-16"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            WHAT THEY <span style={{ color: "#E50914" }}>SAY</span>
          </motion.h2>

          <div className="max-w-screen-xl mx-auto space-y-24 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-24">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={slideUp}
              >
                <div className="font-display text-8xl leading-none select-none mb-4" style={{ color: "#E50914", opacity: 0.3 }}>
                  &ldquo;
                </div>
                <p
                  className="italic mb-8"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    lineHeight: 1.5,
                    color: isDark ? "rgba(237,235,230,0.85)" : "rgba(15,15,15,0.75)",
                  }}
                >
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-widest" style={{ color: mutedColor }}>
                    {t.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-32" style={{ background: pageBg }}>
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
            TRANSFORM
            <br />
            <span style={{ marginLeft: "8vw", display: "block", color: "#E50914" }}>YOUR LIFE.</span>
          </motion.h2>
          <motion.p variants={slideUp} className="max-w-md text-lg mb-12" style={{ color: mutedColor }}>
            Take the first step toward becoming a stronger, more confident version of yourself. Join us at Strike Den today.
          </motion.p>
          <motion.div variants={slideUp}>
            <BrutalistButton href="/contact">Get Started</BrutalistButton>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
