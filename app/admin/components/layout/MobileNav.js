"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav({ activeTab, setActiveTab, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "trainers", label: "Trainers" },
    { id: "schedules", label: "Schedule" },
    { id: "offeredClasses", label: "Classes" },
    { id: "offeredPrograms", label: "Programs" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between px-5 h-14" style={{ background: "#111111", borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <span className="font-display uppercase text-lg" style={{ color: "#EDEBE6", letterSpacing: "-0.02em" }}>
          <span style={{ color: "#E50914" }}>S</span>D Admin
        </span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2" style={{ color: "rgba(237,235,230,0.6)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            style={{ background: "#111111", borderBottom: "1px solid rgba(237,235,230,0.06)" }}
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors"
                  style={{
                    background: activeTab === item.id ? "#E50914" : "transparent",
                    color: activeTab === item.id ? "#FFFFFF" : "rgba(237,235,230,0.5)",
                  }}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3" style={{ borderTop: "1px solid rgba(237,235,230,0.06)" }}>
                <Link
                  href="/"
                  className="flex items-center w-full px-3 py-2.5 text-xs uppercase tracking-widest font-medium"
                  style={{ color: "rgba(237,235,230,0.35)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Return to Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 text-xs uppercase tracking-widest font-medium"
                  style={{ color: "rgba(237,235,230,0.35)" }}
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
