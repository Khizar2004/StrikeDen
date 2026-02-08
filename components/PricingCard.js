"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

export default memo(function PricingCard({ classData, onClick }) {
  if (!classData) return null;

  const { pricing } = classData;
  const activeTiers = pricing ? [
    pricing.walkIn > 0 && { label: "Walk-in", amount: pricing.walkIn },
    pricing.weekly > 0 && { label: "Weekly", amount: pricing.weekly },
    pricing.monthly > 0 && { label: "Monthly", amount: pricing.monthly },
    pricing.annual > 0 && { label: "Annual", amount: pricing.annual },
  ].filter(Boolean) : [];

  return (
    <div
      className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Class Image */}
      <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700 flex-shrink-0">
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {classData.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[3rem]">
          {classData.shortDescription || '\u00A0'}
        </p>

        {/* Pricing */}
        {activeTiers.length === 1 ? (
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {activeTiers[0].label}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ₨{activeTiers[0].amount.toLocaleString()}
            </p>
          </div>
        ) : activeTiers.length > 1 ? (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Pricing Options
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {activeTiers.map((tier) => (
                <div key={tier.label} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{tier.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₨{tier.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">
              Contact us for pricing information
            </p>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Link
            href="/contact"
            onClick={(e) => e.stopPropagation()}
            className="block w-full py-3 bg-primary-500 hover:bg-primary-600 text-white text-center font-semibold rounded-lg shadow-lg shadow-primary-500/20 transition-all duration-300"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
});
