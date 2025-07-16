"use client";
import Image from "next/image";

export default function PricingCard({ classData }) {
  if (!classData) return null;

  const { pricing } = classData;
  const hasPricing = pricing && (pricing.walkIn > 0 || pricing.weekly > 0 || pricing.monthly > 0 || pricing.annual > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Class Image */}
      <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700">
        <Image
          src={classData.image || "/images/default-class.jpg"}
          alt={classData.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {classData.title}
        </h3>
        
        {/* Short Description */}
        {classData.shortDescription && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {classData.shortDescription}
          </p>
        )}
        
        {/* Pricing */}
        {hasPricing ? (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Pricing Options
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {pricing.walkIn > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Walk-in</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₨{pricing.walkIn.toLocaleString()}
                  </p>
                </div>
              )}
              {pricing.weekly > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weekly</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₨{pricing.weekly.toLocaleString()}
                  </p>
                </div>
              )}
              {pricing.monthly > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monthly</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₨{pricing.monthly.toLocaleString()}
                  </p>
                </div>
              )}
              {pricing.annual > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Annual</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₨{pricing.annual.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">
              Contact us for pricing information
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
