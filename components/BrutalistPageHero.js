"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { BlobField } from "./BlobField";
import { slideUp, staggerContainer } from "../lib/animations";

export default function BrutalistPageHero({ title, subtitle, accent = "orange" }) {
  const { theme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) return null;

  const blobColors =
    accent === "red" ? ["#E50914", "#F8A348"] : ["#F8A348", "#E50914"];

  return (
    <section
      className="relative pt-40 md:pt-48 pb-32 md:pb-40 overflow-hidden"
      style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
    >
      <BlobField
        colors={blobColors}
        intensity={0.08}
        blendMode={isDark ? "screen" : "multiply"}
      />

      <motion.div
        className="relative z-10 px-6 md:px-16 max-w-screen-xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={slideUp}
          className="font-display uppercase"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: isDark ? "#EDEBE6" : "#1A1A1A",
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={slideUp}
            className="mt-6 max-w-xl text-lg"
            style={{
              color: isDark
                ? "rgba(237,235,230,0.6)"
                : "rgba(15,15,15,0.55)",
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
