"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default memo(function PricingCard({ classData, onClick }) {
  const { theme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!classData) return null;
  if (!mounted) return null;

  const { pricing } = classData;
  const activeTiers = pricing
    ? [
        pricing.walkIn > 0 && { label: "Walk-in", amount: pricing.walkIn },
        pricing.weekly > 0 && { label: "Weekly", amount: pricing.weekly },
        pricing.monthly > 0 && { label: "Monthly", amount: pricing.monthly },
        pricing.annual > 0 && { label: "Annual", amount: pricing.annual },
      ].filter(Boolean)
    : [];

  return (
    <div
      className="h-full flex flex-col overflow-hidden cursor-pointer transition-colors duration-300"
      style={{
        background: isDark ? "#141414" : "#F5F5F5",
        borderTop: "2px solid #E50914",
        border: `1px solid ${isDark ? "rgba(237,235,230,0.08)" : "rgba(15,15,15,0.08)"}`,
        borderTopWidth: "2px",
        borderTopColor: "#E50914",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isDark
          ? "rgba(237,235,230,0.2)"
          : "rgba(15,15,15,0.2)";
        e.currentTarget.style.borderTopColor = "#E50914";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDark
          ? "rgba(237,235,230,0.08)"
          : "rgba(15,15,15,0.08)";
        e.currentTarget.style.borderTopColor = "#E50914";
      }}
    >
      {/* Class Image */}
      <div
        className="relative w-full aspect-video flex-shrink-0"
        style={{ background: isDark ? "#1A1A1A" : "#E5E5E5" }}
      >
        <Image
          src={classData.image || "/images/default-class.jpg"}
          alt={classData.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className="text-xl font-bold uppercase tracking-wide mb-2"
          style={{ color: isDark ? "#EDEBE6" : "#1A1A1A" }}
        >
          {classData.title}
        </h3>

        {/* Short Description */}
        <p
          className="text-sm mb-4 min-h-[3rem]"
          style={{
            color: isDark
              ? "rgba(237,235,230,0.6)"
              : "rgba(15,15,15,0.55)",
          }}
        >
          {classData.shortDescription || "\u00A0"}
        </p>

        {/* Pricing */}
        {activeTiers.length === 1 ? (
          <div className="text-center">
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{
                color: isDark
                  ? "rgba(237,235,230,0.5)"
                  : "rgba(15,15,15,0.45)",
              }}
            >
              {activeTiers[0].label}
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: isDark ? "#EDEBE6" : "#1A1A1A" }}
            >
              &#8360;{activeTiers[0].amount.toLocaleString()}
            </p>
          </div>
        ) : activeTiers.length > 1 ? (
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wide mb-3"
              style={{ color: isDark ? "#EDEBE6" : "#1A1A1A" }}
            >
              Pricing Options
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {activeTiers.map((tier) => (
                <div
                  key={tier.label}
                  className="p-3"
                  style={{
                    background: isDark
                      ? "rgba(237,235,230,0.04)"
                      : "rgba(15,15,15,0.04)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{
                      color: isDark
                        ? "rgba(237,235,230,0.5)"
                        : "rgba(15,15,15,0.45)",
                    }}
                  >
                    {tier.label}
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: isDark ? "#EDEBE6" : "#1A1A1A" }}
                  >
                    &#8360;{tier.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p
              style={{
                color: isDark
                  ? "rgba(237,235,230,0.5)"
                  : "rgba(15,15,15,0.45)",
              }}
            >
              Contact us for pricing information
            </p>
          </div>
        )}

        {/* Join Now Button */}
        <div className="mt-auto pt-6">
          <Link
            href="/contact"
            onClick={(e) => e.stopPropagation()}
            className="relative block w-full overflow-hidden group text-center py-3 font-bold text-sm uppercase tracking-widest transition-colors duration-300"
            style={{
              background: isDark ? "#EDEBE6" : "#1A1A1A",
              color: isDark ? "#0F0F0F" : "#FFFFFF",
            }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ background: "#E50914" }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Join Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
});
