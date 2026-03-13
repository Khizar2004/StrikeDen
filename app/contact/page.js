"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { FaMapMarkerAlt, FaPhone, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import dynamic from "next/dynamic";
import { trackFacebookEvent, FB_EVENTS } from "../../lib/facebook";
import { slideUp, staggerContainer } from "../../lib/animations";
import BrutalistPageHero from "../../components/BrutalistPageHero";
import { BlobField } from "../../components/BlobField";

const InteractiveMap = dynamic(() => import("../../components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full flex items-center justify-center" style={{ background: "#141414" }}>
      Loading map...
    </div>
  ),
});

const BusinessHours = ({ isDark }) => {
  const hours = [
    { day: "Monday", hours: "8\u201310 a.m., 4\u201310 p.m." },
    { day: "Tuesday", hours: "8\u201310 a.m., 4\u201310 p.m." },
    { day: "Wednesday", hours: "8\u201310 a.m., 4\u201310 p.m." },
    { day: "Thursday", hours: "8\u201310 a.m., 4\u201310 p.m." },
    { day: "Friday", hours: "8\u201310 a.m., 4\u201310 p.m." },
    { day: "Saturday", hours: "8\u201310 a.m., 4\u201310 p.m." },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <div className="grid grid-cols-1 gap-0">
      {hours.map((item, index) => (
        <div
          key={index}
          className="flex justify-between p-3"
          style={{
            background: item.day === "Sunday" ? (isDark ? "rgba(229,9,20,0.08)" : "rgba(229,9,20,0.06)") : "transparent",
            borderBottom: index < hours.length - 1 ? `1px solid ${isDark ? "rgba(237,235,230,0.08)" : "rgba(15,15,15,0.08)"}` : "none",
            color: item.day === "Sunday" ? "#E50914" : isDark ? "#EDEBE6" : "#1A1A1A",
          }}
        >
          <span className="font-medium">{item.day}</span>
          <span>{item.hours}</span>
        </div>
      ))}
    </div>
  );
};

const SocialLinks = ({ isDark }) => {
  const socials = [
    { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/profile.php?id=61570916734685" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/strikeden.pk/" },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://api.whatsapp.com/send/?phone=923372629350&text&type=phone_number&app_absent=0" },
  ];

  return (
    <div className="flex space-x-5">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          className="text-2xl transition-colors duration-300"
          style={{ color: isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)" }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E50914")}
          onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)")}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

const FAQItem = ({ question, answer, delay, isDark, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{
        borderBottom: isLast ? "none" : `1px solid ${isDark ? "rgba(237,235,230,0.08)" : "rgba(15,15,15,0.08)"}`,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex justify-between items-center transition-colors duration-300"
        style={{ background: isDark ? "#141414" : "#F5F5F5", color: isDark ? "#EDEBE6" : "#1A1A1A" }}
      >
        <h3 className="font-bold text-lg pr-4">{question}</h3>
        <svg
          className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "#E50914" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
            style={{ background: isDark ? "#1A1A1A" : "#EFEFEF", color: isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)" }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ContactPage() {
  const { theme, mounted } = useTheme();

  const handleWhatsAppClick = () => {
    trackFacebookEvent(FB_EVENTS.CONTACT, {
      content_name: "WhatsApp Contact",
      content_category: "Contact",
    });
  };

  if (!mounted) return null;

  const isDark = theme === "dark";
  const mutedColor = isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)";
  const textColor = isDark ? "#EDEBE6" : "#1A1A1A";
  const surfaceBg = isDark ? "#141414" : "#F5F5F5";
  const dividerColor = isDark ? "rgba(237,235,230,0.08)" : "rgba(15,15,15,0.08)";

  return (
    <main style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
      {/* ─── Hero ─── */}
      <BrutalistPageHero title="GET IN TOUCH" />

      {/* ─── Contact Cards ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto"
        >
          {/* Location */}
          <motion.div variants={slideUp} className="flex overflow-hidden" style={{ background: isDark ? "#1A1A1A" : "#FFFFFF" }}>
            <div className="flex-shrink-0" style={{ width: 2, background: "#E50914" }} />
            <div className="p-8 flex-1">
              <FaMapMarkerAlt className="text-3xl mb-5" style={{ color: "#E50914" }} />
              <h3 className="font-bold uppercase tracking-widest text-xs mb-4" style={{ color: "#F8A348" }}>Our Location</h3>
              <p className="mb-2" style={{ color: mutedColor }}>2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6</p>
              <p className="mb-5" style={{ color: mutedColor }}>Karachi 75500, Pakistan</p>
              <a
                href="https://www.google.com/maps/place/Strike+Den+%7C+MMA+%26+Judo/@24.7948238,67.0468958,963m/data=!3m1!1e3!4m6!3m5!1s0x3eb33d8b3de8175d:0xccac7c6c8c8c752e!8m2!3d24.7948238!4d67.0494707!16s%2Fg%2F11wws9jpr8?entry=ttu&g_ep=EgoyMDI1MDMxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs uppercase tracking-widest transition-all hover:gap-2"
                style={{ color: "#E50914" }}
              >
                Open in Maps
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideUp} className="flex overflow-hidden" style={{ background: isDark ? "#1A1A1A" : "#FFFFFF" }}>
            <div className="flex-shrink-0" style={{ width: 2, background: "#E50914" }} />
            <div className="p-8 flex-1 space-y-5">
              <FaPhone className="text-3xl mb-5" style={{ color: "#E50914" }} />
              <h3 className="font-bold uppercase tracking-widest text-xs mb-4" style={{ color: "#F8A348" }}>Contact Us</h3>
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: mutedColor }}>Phone</p>
                <a href="tel:+923372629350" className="text-xl font-bold transition-colors" style={{ color: textColor }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E50914")} onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}>
                  +92 337 2629350
                </a>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: mutedColor }}>Email</p>
                <a href="mailto:strikeden.pk@gmail.com" className="text-xl font-bold transition-colors" style={{ color: textColor }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E50914")} onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}>
                  strikeden.pk@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <p className="mb-3 text-xs uppercase tracking-widest" style={{ color: mutedColor }}>Connect</p>
                <SocialLinks isDark={isDark} />
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div variants={slideUp} className="flex overflow-hidden" style={{ background: isDark ? "#1A1A1A" : "#FFFFFF" }}>
            <div className="flex-shrink-0" style={{ width: 2, background: "#E50914" }} />
            <div className="p-8 flex-1">
              <MdAccessTime className="text-3xl mb-5" style={{ color: "#E50914" }} />
              <h3 className="font-bold uppercase tracking-widest text-xs mb-4" style={{ color: "#F8A348" }}>Training Hours</h3>
              <BusinessHours isDark={isDark} />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Map ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-screen-xl mx-auto"
        >
          <motion.span variants={slideUp} className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
            Find Us
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
            OUR <span style={{ color: "#E50914" }}>LOCATION</span>
          </motion.h2>
          <motion.div variants={slideUp} className="overflow-hidden" style={{ border: `1px solid ${dividerColor}` }}>
            <div className="h-[70vh] w-full">
              <InteractiveMap />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-6 md:px-16 py-32" style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}>
        <div className="max-w-screen-lg mx-auto">
          <span className="text-xs uppercase tracking-widest mb-4 block font-bold" style={{ color: "#F8A348" }}>
            Questions
          </span>
          <h2
            className="font-display uppercase mb-10"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: textColor,
            }}
          >
            FREQUENTLY <span style={{ color: "#E50914" }}>ASKED</span>
          </h2>
          <div className="overflow-hidden" style={{ background: isDark ? "#1A1A1A" : "#F5F5F5" }}>
            <FAQItem question="Do I need experience to join Strike Den?" answer="Not at all! We welcome members of all skill levels, from complete beginners to professional fighters. Our classes are structured to accommodate different experience levels, and our coaches provide personalized attention." delay={0.1} isDark={isDark} />
            <FAQItem question="What should I bring to my first class?" answer="For your first class, we recommend comfortable workout clothes, a water bottle, and a towel. Depending on the class, specific gear may be required, but we provide most equipment for beginners. Feel free to contact us before your first visit." delay={0.2} isDark={isDark} />
            <FAQItem question="Do you offer private training?" answer="Yes, we offer one-on-one private training sessions with our expert coaches. These sessions are tailored to your specific goals and provide accelerated progress. Contact us for pricing and availability." delay={0.3} isDark={isDark} />
            <FAQItem question="Is there a free trial available?" answer="Absolutely! We offer a demo class so you can experience our classes and facilities. Simply contact us to schedule your free trial." delay={0.4} isDark={isDark} isLast />
          </div>
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
            Join our community and transform your mind and body through disciplined training.
          </motion.p>
          <motion.div variants={slideUp}>
            <a
              href="https://api.whatsapp.com/send/?phone=923372629350&text=Hi!%20I%27m%20interested%20in%20joining%20Strike%20Den.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="relative inline-flex items-center overflow-hidden px-8 py-4 font-bold text-sm uppercase tracking-widest transition-colors duration-300 group"
              style={{ background: "#EDEBE6", color: "#0F0F0F" }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" style={{ background: "#E50914" }} />
              <span className="relative z-10 inline-flex items-center group-hover:text-white transition-colors duration-300">
                <FaWhatsapp className="mr-2 text-xl" />
                Contact on WhatsApp
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
