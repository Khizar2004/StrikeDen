"use client";
import { motion } from "framer-motion";

export function BlobField({ colors = ["#E50914", "#F8A348"], intensity = 0.12, blendMode = "screen" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i === 0 ? "80vw" : "60vw",
            height: i === 0 ? "80vw" : "60vw",
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            mixBlendMode: blendMode,
            opacity: intensity * (i === 0 ? 1 : 0.7),
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: [intensity * (i === 0 ? 1 : 0.7), intensity * (i === 0 ? 1.4 : 1), intensity * (i === 0 ? 1 : 0.7)],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
