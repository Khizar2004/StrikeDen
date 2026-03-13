"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import UI components
import AdminSidebar from "./components/layout/AdminSidebar";
import MobileNav from "./components/layout/MobileNav";
import ConfirmModal from "./components/ui/ConfirmModal";
import TrainersManager from "./components/trainers/TrainersManager";
import ScheduleManager from "./components/schedules/ScheduleManager";
import ClassManager from "./components/classes/ClassManager";
import ProgramManager from "./components/programs/ProgramManager";
import SettingsManager from "./components/SettingsManager";

// Import custom hooks
import useAuth from "./hooks/useAuth";
import useTrainers from "./hooks/useTrainers";
import useSchedules from "./hooks/useSchedules";
import useClasses from "./hooks/useClasses";
import usePrograms from "./hooks/usePrograms";
import useConfirmModal from "./hooks/useConfirmModal";


/**
 * Admin Dashboard Page
 */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("trainers");
  const router = useRouter();

  // Check URL parameters for tab selection
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['trainers', 'schedules', 'offeredClasses', 'offeredPrograms', 'settings'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

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
    programs: offeredPrograms,
    isLoading: isProgramsLoading,
    isSubmitting: isAddingProgram,
    isDeleting: isDeletingProgram,
    addProgram,
    deleteProgram
  } = usePrograms();

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
    deleteOfferedClass: isDeletingClass,
    offeredPrograms: isProgramsLoading,
    addOfferedProgram: isAddingProgram,
    deleteOfferedProgram: isDeletingProgram
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

  const confirmDeleteProgram = (id) => {
    openConfirmModal({
      title: "Delete Program",
      message: "Are you sure you want to delete this program? This action cannot be undone.",
      onConfirm: deleteProgram,
      itemId: id
    });
  };

  // Memoize the enriched schedules
  const enrichedSchedules = useMemo(() => {
    if (!schedules.length) return [];

    return schedules.map(schedule => {
      // Check if trainer is already a populated object or just an ID
      if (schedule.trainer && typeof schedule.trainer === 'object' && schedule.trainer._id) {
        return schedule; // Already populated, no need to enrich
      } else if (!schedule.trainer) {
        // No trainer assigned (null or undefined)
        return {
          ...schedule,
          trainer: { name: 'No Instructor' }
        };
      } else {
        // Find the trainer in our local state
        const trainer = trainers.find(t => t._id === schedule.trainer);
        return {
          ...schedule,
          trainer: trainer || { name: 'No Instructor' } // Fallback if trainer not found
        };
      }
    });
  }, [schedules, trainers]);

  // Show loading state while data is being fetched
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F0F0F" }}>
        <div className="animate-spin h-10 w-10 border-2 border-[#E50914] border-t-transparent"></div>
      </div>
    );
  }

  // Show error state if not authenticated
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F0F0F" }}>
        <div className="text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-4" style={{ color: "#E50914" }}>Access Denied</h2>
          <p className="text-sm" style={{ color: "rgba(237,235,230,0.5)" }}>Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F", color: "#EDEBE6" }}>
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

          <main className="flex-1 overflow-y-auto" style={{ background: "#0F0F0F" }}>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
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

              {activeTab === "offeredPrograms" && (
                <ProgramManager
                  programs={offeredPrograms}
                  isLoading={isLoading}
                  handleAddProgram={addProgram}
                  confirmDeleteProgram={confirmDeleteProgram}
                />
              )}

              {activeTab === "settings" && (
                <SettingsManager />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
