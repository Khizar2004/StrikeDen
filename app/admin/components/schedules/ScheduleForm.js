"use client";

import { useState, useEffect } from "react";

// Helper function to format time
const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  
  try {
    // Format from 24-hour to 12-hour with AM/PM
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch (e) {
    return timeString;
  }
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
    classType: "",
    dayOfWeek: "monday",
    startTimeString: "",
    endTimeString: "",
    trainer: "",
    description: ""
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
    
    // For backward compatibility, set the className as the classType
    const dataToSubmit = {
      ...scheduleData,
      className: scheduleData.classType,
    };
    
    onSubmit(dataToSubmit);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add New Class
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Schedule a new class on the weekly calendar</p>
      </div>
      
      <div className="px-6 py-5 space-y-5">
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
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Select a class type</option>
            {CLASS_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
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
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
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
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>
        </div>
        
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
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Select a trainer</option>
            {trainers.map(trainer => (
              <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={scheduleData.description}
            onChange={handleChange}
            placeholder="Brief description of the class"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          ></textarea>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Class...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Class to Schedule
            </>
          )}
        </button>
      </div>
    </form>
  );
} 