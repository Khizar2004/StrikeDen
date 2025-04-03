"use client";

import useCrudResource from "./useCrudResource";

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
  
  if (!trainerData.specialization || trainerData.specialization.trim() === '') {
    return 'Specialization is required';
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
  const {
    items: trainers,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchItems: fetchTrainers,
    addItem: addTrainer,
    deleteItem: deleteTrainer,
    updateItem: updateTrainer
  } = useCrudResource('trainers', {
    resourceName: 'Trainer',
    validateItem: validateTrainer
  });

  return {
    trainers,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchTrainers,
    addTrainer,
    deleteTrainer,
    updateTrainer
  };
} 