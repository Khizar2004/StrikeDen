"use client";  //this file is used by ClassManager and ClassesList components to display and manage gym classes

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Hook for managing offered classes data and operations
 * @returns {Object} Classes state and functions
 */
export default function useClasses() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch classes on mount
  useEffect(() => {
    fetchClasses();
  }, []);

  /**
   * Fetch all offered classes from the API
   */
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/classes");
      const data = await response.json();
      
      if (data.success) {
        setClasses(data.classes || []);
      } else {
        setClasses([]);
        toast.error(data.error || "Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to fetch classes");
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new offered class
   * @param {Object} classData - The class data to add
   */
  const addClass = async (classData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Class added successfully");
        await fetchClasses(); // Refresh the classes list
        return true;
      } else {
        toast.error(data.error || "Failed to add class");
        console.error("API Error:", data);
        return false;
      }
    } catch (error) {
      console.error("Error adding class:", error);
      toast.error(`Error: ${error.message || "Unknown error occurred"}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete an offered class by ID
   * @param {string} id - The class ID to delete
   */
  const deleteClass = async (id) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/classes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Class deleted successfully");
        await fetchClasses(); // Refresh the classes list
        return true;
      } else {
        toast.error(data.error || "Failed to delete class");
        return false;
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Failed to delete class");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    classes,
    isLoading,
    isSubmitting,
    isDeleting,
    fetchClasses,
    addClass,
    deleteClass,
  };
} 