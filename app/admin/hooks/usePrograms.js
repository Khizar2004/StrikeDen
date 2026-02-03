"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Hook for managing offered programs data and operations
 * @returns {Object} Programs state and functions
 */
export default function usePrograms() {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch programs on mount
  useEffect(() => {
    fetchPrograms();
  }, []);

  /**
   * Fetch all offered programs from the API
   */
  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/programs");
      const data = await response.json();

      if (data.success) {
        setPrograms(data.programs || []);
      } else {
        setPrograms([]);
        toast.error(data.error || "Failed to fetch programs");
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to fetch programs");
      setPrograms([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new offered program
   * @param {Object} programData - The program data to add
   */
  const addProgram = async (programData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Program added successfully");
        await fetchPrograms(); // Refresh the programs list
        return true;
      } else {
        toast.error(data.error || "Failed to add program");
        console.error("API Error:", data);
        return false;
      }
    } catch (error) {
      console.error("Error adding program:", error);
      toast.error(`Error: ${error.message || "Unknown error occurred"}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete an offered program by ID
   * @param {string} id - The program ID to delete
   */
  const deleteProgram = async (id) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/programs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Program deleted successfully");
        await fetchPrograms(); // Refresh the programs list
        return true;
      } else {
        toast.error(data.error || "Failed to delete program");
        return false;
      }
    } catch (error) {
      console.error("Error deleting program:", error);
      toast.error("Failed to delete program");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    programs,
    isLoading,
    isSubmitting,
    isDeleting,
    fetchPrograms,
    addProgram,
    deleteProgram,
  };
}
