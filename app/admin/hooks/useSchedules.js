"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Hook for managing class schedules data and operations
 * @returns {Object} Schedules state and functions
 */
export default function useSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch schedules on mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Helper function to safely parse JSON response
  const safelyParseJSON = async (response) => {
    try {
      return await response.json();
    } catch (e) {
      return { message: 'Invalid server response' };
    }
  };

  /**
   * Fetch all schedules from the API
   */
  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/schedules");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch schedules: ${response.status} ${response.statusText}`);
      }
      
      const data = await safelyParseJSON(response);
      
      if (data.success) {
        setSchedules(data.data || []);
      } else {
        setSchedules([]);
        throw new Error(data.message || "Failed to fetch schedules");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
      setSchedules([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new schedule
   * @param {Object} scheduleData - The schedule data to add
   */
  const addSchedule = async (scheduleData) => {
    try {
      setIsSubmitting(true);
      
      // Get CSRF token from session storage if available
      const csrfToken = sessionStorage.getItem('csrfToken');
      
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {})
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          ...scheduleData,
          ...(csrfToken ? { csrfToken } : {}) // Include token in body as fallback
        }),
      });

      const data = await safelyParseJSON(response);

      // Handle validation errors
      if (!response.ok) {
        let errorMessage = 'Failed to add schedule';
        
        if (response.status === 403) {
          errorMessage = 'Session expired or unauthorized. Please try logging out and back in.';
        } else if (data.errors) {
          // Handle specific validation errors
          if (data.errors.missingFields) {
            errorMessage = `Missing required fields: ${data.errors.missingFields.join(', ')}`;
          } else if (data.errors.timeFormat) {
            errorMessage = 'Invalid time format. Please use 24-hour format (HH:mm)';
          } else if (data.errors.dayOfWeek) {
            errorMessage = 'Invalid day of week selected';
          } else if (data.errors.classType) {
            errorMessage = 'Invalid class type selected';
          } else if (data.errors.overlap) {
            errorMessage = 'This schedule overlaps with an existing schedule';
          }
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Handle success
      if (data.success) {
        setSchedules(prev => [...prev, data.data]);
        toast.success('Schedule added successfully');
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to add schedule');
      }
    } catch (error) {
      // Only show toast for non-validation errors (validation errors already handled)
      if (!error.message.includes('Missing required fields') && 
          !error.message.includes('Invalid time format') && 
          !error.message.includes('Invalid day') && 
          !error.message.includes('Invalid class type') &&
          !error.message.includes('overlaps')) {
        toast.error(error.message);
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete a schedule by ID
   * @param {string} id - The schedule ID to delete
   */
  const deleteSchedule = async (id) => {
    try {
      setIsDeleting(true);
      setError(null);
      
      console.log(`Deleting schedule with ID: ${id}`);
      
      // Get CSRF token from session storage if available
      const csrfToken = sessionStorage.getItem('csrfToken');
      
      // Use the RESTful route instead of query parameters
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE",
        headers: {
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {})
        },
        credentials: 'include' // Include cookies for authentication
      });

      console.log(`Delete response status: ${response.status} ${response.statusText}`);
      
      const data = await safelyParseJSON(response);
      console.log("Delete response data:", data);
      
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      if (data.success) {
        toast.success("Class removed from schedule successfully");
        await fetchSchedules(); // Refresh the schedules list
        return true;
      } else {
        throw new Error(data.message || "Failed to remove class from schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const updateSchedule = async (scheduleId, updatedData) => {
    try {
      // Get CSRF token from session storage if available
      const csrfToken = sessionStorage.getItem('csrfToken');
      
      const response = await fetch(`/api/schedules/${scheduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {})
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          ...updatedData,
          ...(csrfToken ? { csrfToken } : {}) // Include token in body as fallback
        }),
      });

      const data = await safelyParseJSON(response);

      // Handle validation errors
      if (!response.ok) {
        let errorMessage = 'Failed to update schedule';
        
        if (response.status === 403) {
          errorMessage = 'Session expired or unauthorized. Please try logging out and back in.';
        } else if (data.errors) {
          // Handle specific validation errors
          if (data.errors.missingFields) {
            errorMessage = `Missing required fields: ${data.errors.missingFields.join(', ')}`;
          } else if (data.errors.timeFormat) {
            errorMessage = 'Invalid time format. Please use 24-hour format (HH:mm)';
          } else if (data.errors.dayOfWeek) {
            errorMessage = 'Invalid day of week selected';
          } else if (data.errors.classType) {
            errorMessage = 'Invalid class type selected';
          } else if (data.errors.overlap) {
            errorMessage = 'This schedule overlaps with an existing schedule';
          } else if (data.errors.notFound) {
            errorMessage = 'Schedule not found';
          }
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Handle success
      if (data.success) {
        setSchedules(prev => 
          prev.map(schedule => 
            schedule.id === scheduleId ? data.data : schedule
          )
        );
        toast.success('Schedule updated successfully');
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update schedule');
      }
    } catch (error) {
      // Only show toast for non-validation errors (validation errors already handled)
      if (!error.message.includes('Missing required fields') && 
          !error.message.includes('Invalid time format') && 
          !error.message.includes('Invalid day') && 
          !error.message.includes('Invalid class type') &&
          !error.message.includes('overlaps') &&
          !error.message.includes('not found')) {
        toast.error(error.message);
      }
      throw error;
    }
  };

  return {
    schedules,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchSchedules,
    addSchedule,
    deleteSchedule,
    updateSchedule,
  };
} 