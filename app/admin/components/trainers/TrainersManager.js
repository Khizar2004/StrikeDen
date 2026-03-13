"use client";

import { useState } from "react";
import TrainerForm from "./TrainerForm";
import TrainersList from "./TrainersList";

/**
 * TrainersManager component that manages trainer creation and deletion
 */
export default function TrainersManager({
  trainers,
  isLoading,
  handleAddTrainer,
  confirmDeleteTrainer
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>Trainer Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column - Add Trainer Form */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <TrainerForm
            onSubmit={handleAddTrainer}
            isLoading={isLoading.addTrainer}
          />
        </div>

        {/* Right Column - Trainers List */}
        <div>
          <TrainersList
            trainers={trainers}
            onDelete={confirmDeleteTrainer}
            isLoading={isLoading.trainers}
          />
        </div>
      </div>
    </div>
  );
}
