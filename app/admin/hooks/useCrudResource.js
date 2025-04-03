"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Generic hook for handling CRUD operations on API resources
 * @param {string} resourcePath - API path for the resource
 * @param {Object} options - Configuration options
 * @returns {Object} State and methods for managing the resource
 */
export default function useCrudResource(resourcePath, options = {}) {
  const {
    initialData = [],
    idField = '_id',
    resourceName = 'Resource',
    fetchOnMount = true,
    validateItem = () => true,  // Default validator always passes
    transformItem = item => item, // Default transformer returns item unchanged
  } = options;

  const [items, setItems] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch items on mount if requested
  useEffect(() => {
    if (fetchOnMount) {
      fetchItems();
    }
  }, [fetchOnMount, resourcePath]);

  /**
   * Fetch all items from the API
   */
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/${resourcePath}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resourceName.toLowerCase()}s: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setItems(data.data || []);
      } else {
        throw new Error(data.error || `Failed to fetch ${resourceName.toLowerCase()}s`);
      }
    } catch (error) {
      console.error(`Error fetching ${resourceName.toLowerCase()}s:`, error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new item
   * @param {Object} itemData - The item data to add
   */
  const addItem = async (itemData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Validate data before sending
      const validationResult = validateItem(itemData);
      if (validationResult !== true) {
        throw new Error(validationResult || `Invalid ${resourceName.toLowerCase()} data`);
      }
      
      // Transform the data if needed
      const transformedData = transformItem(itemData);
      
      const response = await fetch(`/api/${resourcePath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Server returned ${response.status}: ${response.statusText}`
        );
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`${resourceName} added successfully`);
        await fetchItems(); // Refresh the items list
        return true;
      } else {
        throw new Error(data.error || `Failed to add ${resourceName.toLowerCase()}`);
      }
    } catch (error) {
      console.error(`Error adding ${resourceName.toLowerCase()}:`, error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete an item by ID
   * @param {string} id - The item ID to delete
   */
  const deleteItem = async (id) => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const response = await fetch(`/api/${resourcePath}/${id}`, {
        method: "DELETE",
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success(`${resourceName} deleted successfully`);
        await fetchItems(); // Refresh the items list
        return true;
      } else {
        throw new Error(data.error || `Failed to delete ${resourceName.toLowerCase()}`);
      }
    } catch (error) {
      console.error(`Error deleting ${resourceName.toLowerCase()}:`, error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Update an existing item
   * @param {string} id - The ID of the item to update
   * @param {Object} itemData - The updated item data
   */
  const updateItem = async (id, itemData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Validate data before sending
      const validationResult = validateItem(itemData);
      if (validationResult !== true) {
        throw new Error(validationResult || `Invalid ${resourceName.toLowerCase()} data`);
      }
      
      // Transform the data if needed
      const transformedData = transformItem(itemData);
      
      const response = await fetch(`/api/${resourcePath}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Server returned ${response.status}: ${response.statusText}`
        );
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`${resourceName} updated successfully`);
        await fetchItems(); // Refresh the items list
        return true;
      } else {
        throw new Error(data.error || `Failed to update ${resourceName.toLowerCase()}`);
      }
    } catch (error) {
      console.error(`Error updating ${resourceName.toLowerCase()}:`, error);
      toast.error(`Error: ${error.message}`);
      setError(error.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchItems,
    addItem,
    deleteItem,
    updateItem,
  };
} 