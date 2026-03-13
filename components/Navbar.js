"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  // Default to dark on server to match defaultTheme="dark" and avoid hydration mismatch
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Hide navbar on admin pages
  if (pathname?.startsWith("/admin")) return null;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      document.body.style.overflow = prev ? "unset" : "hidden";
      return !prev;
    });
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Pricing", path: "/pricing" },
    { name: "Our Team", path: "/trainers" },
    { name: "Contact", path: "/contact" },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06,
        delayChildren: 0.12,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: 24 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      {/* ─── Desktop + Mobile Bar ─── */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: "transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-6 md:px-16 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2.5">
            <div className="h-8 w-8 relative overflow-hidden flex-shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="StrikeDen Logo"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              className="font-display uppercase text-2xl leading-none"
              style={{ color: isDark ? "#EDEBE6" : "#1A1A1A", letterSpacing: "-0.02em" }}
            >
              <span style={{ color: "#E50914" }}>Strike</span>Den
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[13px] uppercase font-medium ${
                  pathname === link.path ? "nav-brutalist-active" : "nav-brutalist"
                }`}
                style={{ letterSpacing: "0.08em" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            <ThemeToggle />
            <Link href="/admin/login" className="nav-admin">
              <span className="sr-only">Admin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[18px] w-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </Link>

            {/* Compact BrutalistButton CTA */}
            <Link
              href="/contact"
              className="relative inline-block overflow-hidden px-5 py-2 group"
              style={{ background: isDark ? "#EDEBE6" : "#1A1A1A" }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                style={{ background: "#E50914" }}
              />
              <span
                className="relative z-10 font-bold text-[11px] uppercase tracking-widest group-hover:text-white transition-colors duration-300"
                style={{ color: isDark ? "#0F0F0F" : "#FFFFFF" }}
              >
                Join Now
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3 z-50">
            <ThemeToggle />
            <button
            onClick={toggleMobileMenu}
            className="relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-[5px] focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
              }
              className="w-6 h-[1.5px] block"
              style={{ background: isDark ? "#EDEBE6" : "#1A1A1A" }}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] block"
              style={{ background: isDark ? "#EDEBE6" : "#1A1A1A" }}
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0 }
              }
              className="w-6 h-[1.5px] block"
              style={{ background: isDark ? "#EDEBE6" : "#1A1A1A" }}
            />
          </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Full-Screen Mobile Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 flex flex-col justify-center px-6 md:hidden"
            style={{ background: isDark ? "#0F0F0F" : "#FFFFFF" }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={mobileItemVariants}>
                  <Link
                    href={link.path}
                    onClick={closeMobile}
                    className="block font-display uppercase"
                    style={{
                      fontSize: "clamp(2.5rem, 10vw, 5rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color:
                        pathname === link.path ? "#E50914" : isDark ? "#EDEBE6" : "#1A1A1A",
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom links */}
            <motion.div variants={mobileItemVariants} className="mt-12">
              <div
                className="h-px mb-6"
                style={{ background: isDark ? "rgba(237,235,230,0.1)" : "rgba(0,0,0,0.08)" }}
              />
              <div className="flex gap-6 flex-wrap">
                {[
                  { label: "Privacy", href: "/privacy" },
                  { label: "Rules", href: "/rules" },
                  { label: "Admin", href: "/admin/login" },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobile}
                    className="text-xs uppercase tracking-widest"
                    style={{ color: isDark ? "rgba(237,235,230,0.35)" : "rgba(15,15,15,0.35)" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
