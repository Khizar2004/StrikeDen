"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Helper to validate an image URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
const isValidImageUrl = (url) => {
  if (!url) return true; // Empty is valid (no image)
  
  // Check if it's a relative path starting with /uploads/
  if (url.startsWith('/uploads/')) return true;
  
  // Check if it's a valid URL
  try {
    new URL(url);
    // Check image extension
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
  } catch (e) {
    return false;
  }
};

/**
 * Validate trainer data before submission
 * @param {Object} trainerData - The trainer data to validate
 * @returns {boolean|string} - true if valid, error message if invalid
 */
const validateTrainer = (trainerData) => {
  if (!trainerData.name || trainerData.name.trim() === '') {
    return 'Name is required';
  }
  
  // Check if specialization is an array and has at least one value
  if (!trainerData.specialization || 
      (Array.isArray(trainerData.specialization) && trainerData.specialization.length === 0) ||
      (!Array.isArray(trainerData.specialization) && trainerData.specialization.trim() === '')) {
    return 'At least one specialization is required';
  }
  
  if (trainerData.image && !isValidImageUrl(trainerData.image)) {
    return 'Invalid image URL format';
  }
  
  return true;
};

/**
 * Hook for managing trainers data and operations
 * @returns {Object} Trainers state and functions
 */
export default function useTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch trainers on mount
  useEffect(() => {
    fetchTrainers();
  }, []);

  /**
   * Fetch all trainers from the API
   */
  const fetchTrainers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/trainers");
      const data = await response.json();
      
      if (data.success) {
        setTrainers(data.data || []);
      } else {
        setTrainers([]);
        toast.error(data.error || "Failed to fetch trainers");
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast.error("Failed to fetch trainers");
      setTrainers([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new trainer
   * @param {Object} trainerData - The trainer data to add
   */
  const addTrainer = async (trainerData) => {
    try {
      setIsSubmitting(true);
      
      // Validate data before sending
      const validationResult = validateTrainer(trainerData);
      if (validationResult !== true) {
        toast.error(validationResult);
        return false;
      }
      
      const response = await fetch("/api/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainerData),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Trainer added successfully");
        await fetchTrainers(); // Refresh the trainers list
        return true;
      } else {
        toast.error(data.error || "Failed to add trainer");
        return false;
      }
    } catch (error) {
      console.error("Error adding trainer:", error);
      toast.error("Failed to add trainer");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete a trainer by ID
   * @param {string} id - The trainer ID to delete
   */
  const deleteTrainer = async (id) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/trainers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Trainer deleted successfully");
        await fetchTrainers(); // Refresh the trainers list
        return true;
      } else {
        toast.error(data.error || "Failed to delete trainer");
        return false;
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
      toast.error("Failed to delete trainer");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Update an existing trainer
   * @param {string} id - The ID of the trainer to update
   * @param {Object} trainerData - The updated trainer data
   */
  const updateTrainer = async (id, trainerData) => {
    try {
      setIsSubmitting(true);
      
      // Validate data before sending
      const validationResult = validateTrainer(trainerData);
      if (validationResult !== true) {
        toast.error(validationResult);
        return false;
      }
      
      const response = await fetch(`/api/trainers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainerData),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Trainer updated successfully");
        await fetchTrainers(); // Refresh the trainers list
        return true;
      } else {
        toast.error(data.error || "Failed to update trainer");
        return false;
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
      toast.error("Failed to update trainer");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    trainers,
    isLoading,
    isSubmitting,
    isDeleting,
    fetchTrainers,
    addTrainer,
    deleteTrainer,
    updateTrainer,
  };
} 