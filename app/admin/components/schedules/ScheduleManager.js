"use client";

import ScheduleForm from "./ScheduleForm";
import ScheduleDisplay from "./ScheduleDisplay";

/**
 * Schedule manager that combines form and display
 */
export default function ScheduleManager({
  schedules,
  trainers,
  isLoading,
  handleAddSchedule,
  confirmDeleteSchedule
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>Class Schedule</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column - Add Schedule Form */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ScheduleForm
            trainers={trainers}
            onSubmit={handleAddSchedule}
            isLoading={isLoading.addSchedule}
          />
        </div>

        {/* Right Column - Schedule Display */}
        <div>
          <ScheduleDisplay
            schedules={schedules}
            onDelete={confirmDeleteSchedule}
            isLoading={isLoading.schedules}
          />
        </div>
      </div>
    </div>
  );
}
