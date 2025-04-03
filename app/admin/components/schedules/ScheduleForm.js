"use client";

import { useState } from "react";

// Helper function to format time
const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  return timeString;
};

const DAYS_OF_WEEK = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

// Define valid class types to match the model's enum validation
const CLASS_TYPES = [
  "Boxing",
  "Brazilian Jiu-Jitsu",
  "Muay Thai",
  "Wrestling",
  "MMA",
  "Conditioning",
  "Kickboxing",
  "Taekwondo",
  "Judo"
];

/**
 * Form component for adding or editing class schedules
 */
export default function ScheduleForm({ trainers, onSubmit, isLoading }) {
  const [scheduleData, setScheduleData] = useState({
    className: "",
    classType: "",
    dayOfWeek: "monday",
    startTimeString: "",
    endTimeString: "",
    trainer: "",
    description: "",
    capacity: 20
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(scheduleData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Class</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Schedule a new class on the weekly calendar</p>
      </div>
      
      <div className="px-6 py-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="className"
              name="className"
              required
              value={scheduleData.className}
              onChange={handleChange}
              placeholder="e.g. Boxing Fundamentals"
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="classType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class Type <span className="text-red-500">*</span>
            </label>
            <select
              id="classType"
              name="classType"
              required
              value={scheduleData.classType}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a class type</option>
              {CLASS_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Day <span className="text-red-500">*</span>
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              required
              value={scheduleData.dayOfWeek}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="startTimeString" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="startTimeString"
              name="startTimeString"
              required
              value={scheduleData.startTimeString}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="endTimeString" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="endTimeString"
              name="endTimeString"
              required
              value={scheduleData.endTimeString}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="trainer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trainer <span className="text-red-500">*</span>
            </label>
            <select
              id="trainer"
              name="trainer"
              required
              value={scheduleData.trainer}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a trainer</option>
              {trainers.map(trainer => (
                <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              min="1"
              max="50"
              required
              value={scheduleData.capacity}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={scheduleData.description}
            onChange={handleChange}
            placeholder="Brief description of the class"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Adding Class...' : 'Add Class to Schedule'}
        </button>
      </div>
    </form>
  );
} 