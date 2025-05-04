// Utility functions for the application

export function deduplicateSchedules(scheduleItems) {
  // Sort and filter out any duplicates
  const seen = new Set();
  const uniqueSchedules = [];

  scheduleItems.forEach(schedule => {
    // Create a unique key for this class based on properties that should make it unique
    const scheduleKey = `${schedule.dayOfWeek}-${schedule.className}-${schedule.trainer}-${schedule.startTimeString}`;
    
    // Skip if we've already seen this exact class
    if (seen.has(scheduleKey)) {
      return;
    }
    
    seen.add(scheduleKey);
    uniqueSchedules.push(schedule);
  });

  return uniqueSchedules;
}

export function formatDayName(day) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export function formatTime(timeString) {
  if (!timeString) return 'N/A';
  
  try {
    // Format from 24-hour to 12-hour with AM/PM
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch (e) {
    console.error('Error formatting time:', e);
    return timeString;
  }
} 