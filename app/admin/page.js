"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../../components/ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

// Import UI components
import AdminSidebar from "./components/layout/AdminSidebar";
import MobileNav from "./components/layout/MobileNav";
import ConfirmModal from "./components/ui/ConfirmModal";
import TrainersManager from "./components/trainers/TrainersManager";
import ScheduleManager from "./components/schedules/ScheduleManager";
import ClassManager from "./components/classes/ClassManager";

// Import custom hooks
import useAuth from "./hooks/useAuth";
import useTrainers from "./hooks/useTrainers";
import useSchedules from "./hooks/useSchedules";
import useClasses from "./hooks/useClasses";
import useConfirmModal from "./hooks/useConfirmModal";

// Move Tooltip to a separate component file
import Tooltip from "./components/ui/Tooltip";

// Helper function to format time
const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  return timeString;
};

/**
 * Admin Dashboard Page
 */
export default function AdminPage() {
  const { theme, mounted } = useTheme();
  const [activeTab, setActiveTab] = useState("trainers");
  
  // Initialize hooks
  const { isAuth, isLoading: isAuthLoading, handleLogout } = useAuth();
  const { 
    trainers, 
    isLoading: isTrainersLoading, 
    isSubmitting: isAddingTrainer, 
    isDeleting: isDeletingTrainer, 
    addTrainer, 
    deleteTrainer 
  } = useTrainers();
  
  const { 
    schedules, 
    isLoading: isSchedulesLoading, 
    isSubmitting: isAddingSchedule, 
    isDeleting: isDeletingSchedule, 
    addSchedule, 
    deleteSchedule 
  } = useSchedules();
  
  const { 
    classes: offeredClasses, 
    isLoading: isClassesLoading, 
    isSubmitting: isAddingClass, 
    isDeleting: isDeletingClass, 
    addClass, 
    deleteClass 
  } = useClasses();
  
  const { 
    confirmModal, 
    openConfirmModal, 
    closeConfirmModal, 
    handleConfirm 
  } = useConfirmModal();

  // Loading states for UI components
  const isLoading = {
    trainers: isTrainersLoading,
    schedules: isSchedulesLoading,
    addTrainer: isAddingTrainer,
    deleteTrainer: isDeletingTrainer,
    addSchedule: isAddingSchedule,
    deleteSchedule: isDeletingSchedule,
    offeredClasses: isClassesLoading,
    addOfferedClass: isAddingClass,
    deleteOfferedClass: isDeletingClass
  };

  // Handler functions for confirmation modals
  const confirmDeleteTrainer = (id) => {
    openConfirmModal({
      title: "Delete Trainer",
      message: "Are you sure you want to delete this trainer? This will also remove them from any classes they are assigned to.",
      onConfirm: deleteTrainer,
      itemId: id
    });
  };

  const confirmDeleteSchedule = (id) => {
    openConfirmModal({
      title: "Delete Class from Schedule",
      message: "Are you sure you want to remove this class from the schedule?",
      onConfirm: deleteSchedule,
      itemId: id
    });
  };

  const confirmDeleteClass = (id) => {
    openConfirmModal({
      title: "Delete Class",
      message: "Are you sure you want to delete this class? This action cannot be undone.",
      onConfirm: deleteClass,
      itemId: id
    });
  };

  // Memoize the enriched schedules
  const enrichedSchedules = useMemo(() => {
    if (!schedules.length || !trainers.length) return [];
    
    return schedules.map(schedule => ({
      ...schedule,
      trainer: trainers.find(t => t._id === schedule.trainer)
    }));
  }, [schedules, trainers]);

  // Show loading state while data is being fetched
  if (isAuthLoading || !mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state if not authenticated
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      {/* Confirmation Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation (Desktop) */}
        <AdminSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Navigation */}
          <MobileNav 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
          />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="container mx-auto px-4 py-6">
              {/* Tab Content */}
              {activeTab === "trainers" && (
                <TrainersManager 
                  trainers={trainers}
                  isLoading={isLoading}
                  handleAddTrainer={addTrainer}
                  confirmDeleteTrainer={confirmDeleteTrainer}
                />
              )}

              {activeTab === "schedules" && (
                <ScheduleManager 
                  schedules={enrichedSchedules}
                  trainers={trainers}
                  isLoading={isLoading}
                  handleAddSchedule={addSchedule}
                  confirmDeleteSchedule={confirmDeleteSchedule}
                />
              )}

              {activeTab === "offeredClasses" && (
                <ClassManager 
                  classes={offeredClasses}
                  isLoading={isLoading}
                  handleAddClass={addClass}
                  confirmDeleteClass={confirmDeleteClass}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
