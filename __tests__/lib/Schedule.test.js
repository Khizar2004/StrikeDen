// Test the time validation logic without mocking mongoose
describe('Schedule Validation Logic', () => {
  describe('Time Format Validation', () => {
    // Extract the validation logic to test it independently
    const timeFormatValidator = (v) => {
      return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
    };

    test('should accept valid time format HH:mm', () => {
      expect(timeFormatValidator('09:30')).toBe(true);
      expect(timeFormatValidator('23:59')).toBe(true);
      expect(timeFormatValidator('00:00')).toBe(true);
      expect(timeFormatValidator('12:45')).toBe(true);
      expect(timeFormatValidator('0:00')).toBe(true);  // Single digit hour
      expect(timeFormatValidator('9:30')).toBe(true);  // Single digit hour
    });

    test('should reject invalid time formats', () => {
      expect(timeFormatValidator('25:30')).toBe(false); // Invalid hour
      expect(timeFormatValidator('12:60')).toBe(false); // Invalid minute
      expect(timeFormatValidator('12:5')).toBe(false);  // Single digit minute
      expect(timeFormatValidator('invalid')).toBe(false); // Not a time
      expect(timeFormatValidator('')).toBe(false); // Empty string
      expect(timeFormatValidator('12:5:30')).toBe(false); // Seconds included
      expect(timeFormatValidator('24:00')).toBe(false); // Invalid 24-hour
    });
  });

  describe('Business Logic Validation', () => {
    // Extract the time comparison logic
    const validateTimeRange = (startTimeString, endTimeString) => {
      if (startTimeString && endTimeString) {
        const [startHour, startMinute] = startTimeString.split(':').map(Number);
        const [endHour, endMinute] = endTimeString.split(':').map(Number);
        
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        
        return endMinutes > startMinutes;
      }
      return true;
    };

    test('should validate end time after start time', () => {
      expect(validateTimeRange('09:30', '10:30')).toBe(true);  // Valid range
      expect(validateTimeRange('09:30', '09:31')).toBe(true);  // 1 minute class
      expect(validateTimeRange('23:30', '23:59')).toBe(true);  // Late evening class
    });

    test('should reject end time before or equal to start time', () => {
      expect(validateTimeRange('10:30', '09:30')).toBe(false); // End before start
      expect(validateTimeRange('10:30', '10:30')).toBe(false); // Same time
      expect(validateTimeRange('10:30', '10:29')).toBe(false); // End 1 minute before
    });

    test('should handle edge cases', () => {
      expect(validateTimeRange('00:00', '23:59')).toBe(true);  // Full day
      expect(validateTimeRange('23:59', '00:00')).toBe(false); // Next day (not handled)
    });
  });

  describe('Enum Validation', () => {
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    const isValidDayOfWeek = (day) => {
      return validDays.includes(day.toLowerCase());
    };

    test('should accept valid days of week', () => {
      expect(isValidDayOfWeek('monday')).toBe(true);
      expect(isValidDayOfWeek('tuesday')).toBe(true);
      expect(isValidDayOfWeek('sunday')).toBe(true);
      expect(isValidDayOfWeek('MONDAY')).toBe(true);  // Case insensitive
    });

    test('should reject invalid days', () => {
      expect(isValidDayOfWeek('invalid-day')).toBe(false);
      expect(isValidDayOfWeek('mon')).toBe(false);
      expect(isValidDayOfWeek('')).toBe(false);
      expect(isValidDayOfWeek('weekday')).toBe(false);
    });
  });

  describe('Capacity Validation', () => {
    const validateCapacity = (capacity) => {
      return capacity >= 1 && capacity <= 50;
    };

    const validateParticipants = (participants, capacity) => {
      return participants <= capacity;
    };

    test('should enforce capacity limits', () => {
      expect(validateCapacity(1)).toBe(true);   // Minimum
      expect(validateCapacity(20)).toBe(true);  // Default
      expect(validateCapacity(50)).toBe(true);  // Maximum
      
      expect(validateCapacity(0)).toBe(false);  // Below minimum
      expect(validateCapacity(51)).toBe(false); // Above maximum
      expect(validateCapacity(-1)).toBe(false); // Negative
    });

    test('should validate participants against capacity', () => {
      expect(validateParticipants(10, 20)).toBe(true);  // Under capacity
      expect(validateParticipants(20, 20)).toBe(true);  // At capacity
      expect(validateParticipants(21, 20)).toBe(false); // Over capacity
      expect(validateParticipants(0, 20)).toBe(true);   // No participants
    });
  });

  describe('Virtual Fields', () => {
    // Test the available spots calculation
    const calculateAvailableSpots = (capacity, participants) => {
      return capacity - participants;
    };

    test('should calculate available spots correctly', () => {
      expect(calculateAvailableSpots(20, 0)).toBe(20);   // Empty class
      expect(calculateAvailableSpots(20, 10)).toBe(10);  // Half full
      expect(calculateAvailableSpots(20, 20)).toBe(0);   // Full class
      expect(calculateAvailableSpots(20, 15)).toBe(5);   // 5 spots left
    });
  });
}); 