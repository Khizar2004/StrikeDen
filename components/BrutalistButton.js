import Link from "next/link";

export function BrutalistButton({ href, children, variant = "light", className = "" }) {
  const base =
    variant === "light"
      ? { bg: "#EDEBE6", text: "#0F0F0F", fill: "#E50914" }
      : { bg: "#E50914", text: "#FFFFFF", fill: "#EDEBE6" };

  return (
    <Link
      href={href}
      className={`relative inline-block overflow-hidden px-8 py-4 group ${className}`}
      style={{ background: base.bg }}
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
        style={{ background: base.fill }}
      />
      <span
        className={`relative z-10 font-bold text-sm uppercase tracking-widest transition-colors duration-300 group-hover:text-white ${variant === "light" ? "text-[#0F0F0F]" : "text-white"}`}
      >
        {children}
      </span>
    </Link>
  );
}
