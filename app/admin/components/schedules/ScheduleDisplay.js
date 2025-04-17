"use client";

// Helper function to format time
const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  
  try {
    // Format from 24-hour to 12-hour with AM/PM
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch (e) {
    return timeString;
  }
};

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
export default function ScheduleDisplay({ schedules, onDelete, isLoading }) {
  // Group schedules by day
  const schedulesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day.id] = schedules.filter(
      schedule => schedule.dayOfWeek === day.id
    ).sort((a, b) => {
      // Sort by start time
      return a.startTimeString > b.startTimeString ? 1 : -1;
    });
    return acc;
  }, {});
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading schedule...</p>
        </div>
      </div>
    );
  }
  
  if (!schedules || schedules.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No classes scheduled yet</p>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Use the form to add your first class</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Weekly Schedule
        </h3>
      </div>
      
      <div className="px-6 py-5">
        <div className="space-y-6">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day.id} className="group">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2 text-red-600 dark:text-red-400 text-sm">{day.label.charAt(0)}</span>
                {day.label}
              </h4>
              
              <div className="space-y-3 ml-10">
                {schedulesByDay[day.id].length > 0 ? (
                  schedulesByDay[day.id].map((schedule) => (
                    <div 
                      key={schedule._id} 
                      className="bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-red-200 dark:hover:border-red-900/40"
                    >
                      <div className="flex p-4">
                        <div className="w-1 self-stretch bg-red-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h5 className="text-base font-medium text-gray-900 dark:text-white">
                              {schedule.className || schedule.classType}
                            </h5>
                            {schedule.classType && (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                {schedule.classType}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-medium">{formatTime(schedule.startTimeString)} - {formatTime(schedule.endTimeString)}</span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>
                                {schedule.trainer && typeof schedule.trainer === 'object' 
                                  ? schedule.trainer.name 
                                  : 'Unknown Trainer'}
                              </span>
                            </div>
                          </div>
                          {schedule.description && (
                            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-100 dark:border-gray-700">
                              {schedule.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => onDelete(schedule._id)}
                          className="ml-2 flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none transition-all duration-200 transform hover:scale-105"
                          aria-label="Delete class"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400 italic py-3 px-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
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