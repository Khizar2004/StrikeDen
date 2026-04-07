"use client";

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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>Offered Programs</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ProgramForm
            onSubmit={handleAddProgram}
            isLoading={isLoading.addOfferedProgram}
          />
        </div>
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
