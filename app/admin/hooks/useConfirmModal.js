"use client";

import { useState } from "react";

/**
 * Hook for managing confirmation modal state
 * @returns {Object} Modal state and functions
 */
export default function useConfirmModal() {
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    itemId: null
  });

  /**
   * Open the confirmation modal
   * @param {Object} options - Modal options
   * @param {string} options.title - Modal title
   * @param {string} options.message - Modal message
   * @param {Function} options.onConfirm - Callback to execute on confirmation
   * @param {string|number} options.itemId - ID of the item to act upon (optional)
   */
  const openConfirmModal = ({ title, message, onConfirm, itemId = null }) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      itemId
    });
  };

  /**
   * Close the confirmation modal
   */
  const closeConfirmModal = () => {
    setConfirmModal(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  /**
   * Execute the confirmation action and close the modal
   */
  const handleConfirm = () => {
    if (confirmModal.onConfirm) {
      confirmModal.onConfirm(confirmModal.itemId);
    }
    closeConfirmModal();
  };

  return {
    confirmModal,
    openConfirmModal,
    closeConfirmModal,
    handleConfirm
  };
} 