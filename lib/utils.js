/**
 * Utility functions for the application
 */

/**
 * Deduplicate schedule items based on common properties
 * @param {Array} scheduleItems - Array of schedule items to deduplicate
 * @returns {Array} - Deduplicated array of schedule items
 */
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

/**
 * Format day name to have first letter capitalized
 * @param {string} day - The day name to format
 * @returns {string} - Formatted day name
 */
export function formatDayName(day) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

/**
 * Format time string to 12-hour format with AM/PM
 * @param {string} timeString - Time string in "HH:MM" format
 * @returns {string} - Formatted time string
 */
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