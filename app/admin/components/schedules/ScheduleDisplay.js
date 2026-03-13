"use client";

import { formatTime } from "@/lib/utils";

// Days of week for organizing schedules
const DAYS_OF_WEEK = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

/**
 * Component to display the weekly class schedule
 */
export default function ScheduleDisplay({ schedules = [], onDelete, isLoading }) {
  // Group schedules by day
  const schedulesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day.id] = schedules.filter(
      schedule => schedule.dayOfWeek === day.id
    ).sort((a, b) => {
      return a.startTimeString > b.startTimeString ? 1 : -1;
    });
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="p-6" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <div className="text-center py-8">
          <div className="inline-block animate-spin h-8 w-8 border-2 border-[#E50914] border-t-transparent"></div>
          <p className="mt-4 text-sm" style={{ color: "rgba(237,235,230,0.4)" }}>Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (!schedules || schedules.length === 0) {
    return (
      <div className="p-8 text-center" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mb-4" style={{ color: "rgba(237,235,230,0.15)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-bold" style={{ color: "rgba(237,235,230,0.4)" }}>No classes scheduled yet</p>
          <p className="text-xs mt-1" style={{ color: "rgba(237,235,230,0.3)" }}>Use the form to add your first class</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#EDEBE6" }}>
          Weekly Schedule
        </h3>
      </div>

      <div className="px-6 py-5">
        <div className="space-y-6">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day.id}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(237,235,230,0.6)" }}>
                {day.label}
              </h4>

              <div className="space-y-2">
                {schedulesByDay[day.id].length > 0 ? (
                  schedulesByDay[day.id].map((schedule) => (
                    <div
                      key={schedule._id}
                      className="flex items-center p-3 transition-colors"
                      style={{ background: "#1A1A1A", borderLeft: "2px solid #E50914" }}
                    >
                      <div className="flex-1">
                        <h5 className="text-sm font-bold" style={{ color: "#EDEBE6" }}>
                          {schedule.className || schedule.classType}
                        </h5>
                        <div className="flex flex-wrap items-center gap-4 mt-1">
                          <span className="text-xs" style={{ color: "rgba(237,235,230,0.4)" }}>
                            {formatTime(schedule.startTimeString)} - {formatTime(schedule.endTimeString)}
                          </span>
                          <span className="text-xs" style={{ color: "rgba(237,235,230,0.4)" }}>
                            {schedule.trainer?.name || 'No Instructor'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDelete(schedule._id)}
                        className="ml-2 flex-shrink-0 p-2 transition-colors"
                        style={{ color: "rgba(237,235,230,0.25)" }}
                        aria-label="Delete class"
                        onMouseEnter={(e) => e.currentTarget.style.color = "#E50914"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.25)"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-xs py-2 px-3" style={{ color: "rgba(237,235,230,0.25)", border: "1px dashed rgba(237,235,230,0.08)" }}>
                    No classes scheduled
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
