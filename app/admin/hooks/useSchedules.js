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

  // Helper function to safely parse JSON or handle HTML error responses
  const safelyParseJSON = async (response) => {
    const contentType = response.headers.get('content-type');
    
    // Check if response is actually JSON
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Handle HTML or other non-JSON responses
      const text = await response.text();
      const truncatedText = text.substring(0, 100) + (text.length > 100 ? '...' : '');
      throw new Error(`Expected JSON but got: ${truncatedText}`);
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
      setError(null);
      
      // Log request for debugging
      console.log("Sending schedule data:", scheduleData);
      
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      // Log response status for debugging
      console.log(`Response status: ${response.status} ${response.statusText}`);
      
      const data = await safelyParseJSON(response);
      
      // Log actual response
      console.log("Response data:", data);
      
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      if (data.success) {
        toast.success("Class added to schedule successfully");
        await fetchSchedules(); // Refresh the schedules list
        return true;
      } else {
        throw new Error(data.message || "Failed to add class to schedule");
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
      return false;
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
      
      // Use the RESTful route instead of query parameters
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE",
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

  return {
    schedules,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchSchedules,
    addSchedule,
    deleteSchedule,
  };
} 