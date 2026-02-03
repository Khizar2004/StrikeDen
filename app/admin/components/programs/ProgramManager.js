"use client";    //Combines both components side-by-side

import ProgramForm from "./ProgramForm";
import ProgramsList from "./ProgramsList";

/**
 * Program manager component that combines form and list
 */
export default function ProgramManager({
  programs,
  isLoading,
  handleAddProgram,
  confirmDeleteProgram
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Offered Programs</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Add Program Form */}
        <div>
          <ProgramForm
            onSubmit={handleAddProgram}
            isLoading={isLoading.addOfferedProgram}
          />
        </div>

        {/* Right Column - Programs List */}
        <div>
          <ProgramsList
            programs={programs}
            onDelete={confirmDeleteProgram}
            isLoading={isLoading.offeredPrograms}
          />
        </div>
      </div>
    </div>
  );
}
