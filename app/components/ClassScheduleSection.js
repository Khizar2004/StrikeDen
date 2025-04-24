"use client";
import Link from 'next/link';

export default function ClassScheduleSection({ trainerId, trainerName }) {
  return (
    <div className="mt-8 border-t border-gray-800 pt-8">
      <h2 className="text-2xl font-bold mb-4">Class Schedule</h2>
      <p className="text-gray-400 mb-4">
        Check our weekly schedule for classes with {trainerName}
      </p>
      <Link
        href={`/trainers/${trainerId}`}
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        <span>View Schedule</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
} 