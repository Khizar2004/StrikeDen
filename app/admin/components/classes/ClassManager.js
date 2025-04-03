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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Offered Classes</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Add Class Form */}
        <div>
          <ClassForm
            onSubmit={handleAddClass}
            isLoading={isLoading.addOfferedClass}
          />
        </div>
        
        {/* Right Column - Classes List */}
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