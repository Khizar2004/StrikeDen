"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TrainerScheduleCard({ trainerId }) {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/trainers/${trainerId}/schedules`);
        const data = await response.json();
        
        if (data.success) {
          setSchedules(data.data);
        } else {
          setError("Could not load schedule");
        }
      } catch (error) {
        console.error("Error fetching trainer schedules:", error);
        setError("Failed to load schedule");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (trainerId) {
      fetchSchedules();
    }
  }, [trainerId]);

  // Format day name
  const formatDayName = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  if (isLoading) {
    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Class Schedule</h3>
        <div className="h-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Class Schedule</h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  // Get the next few classes (up to 3) sorted by day and time
  const upcomingClasses = schedules
    .sort((a, b) => {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const dayDiff = days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
      
      if (dayDiff !== 0) return dayDiff;
      
      const timeA = a.startTimeString.split(':').map(Number);
      const timeB = b.startTimeString.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    })
    .slice(0, 3);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Class Schedule</h3>
      
      {schedules.length === 0 ? (
        <p className="text-gray-400 text-sm">No classes currently scheduled.</p>
      ) : (
        <>
          <div className="space-y-2 mb-3">
            {upcomingClasses.map(schedule => (
              <div key={schedule._id} className="bg-gray-800/50 p-2 rounded">
                <p className="font-medium text-sm">{schedule.className}</p>
                <p className="text-xs text-gray-400">
                  {formatDayName(schedule.dayOfWeek)}, {schedule.startTimeString}
                </p>
              </div>
            ))}
          </div>
          
          <Link 
            href={`/trainers/${trainerId}`}
            className="text-red-500 text-sm hover:text-red-400 transition-colors flex items-center"
          >
            <span>View full schedule</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </>
      )}
    </div>
  );
} 