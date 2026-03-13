"use client";

import ClassForm from "./ClassForm";
import ClassesList from "./ClassesList";

/**
 * Class manager component that combines form and list
 */
export default function ClassManager({
  classes,
  isLoading,
  handleAddClass,
  confirmDeleteClass
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>Offered Classes</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ClassForm
            onSubmit={handleAddClass}
            isLoading={isLoading.addOfferedClass}
          />
        </div>
        <div>
          <ClassesList
            classes={classes}
            onDelete={confirmDeleteClass}
            isLoading={isLoading.offeredClasses}
          />
        </div>
      </div>
    </div>
  );
}
