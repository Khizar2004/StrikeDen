"use client";

import { useState, useEffect } from "react";
import useClasses from "../../hooks/useClasses";
import { formatTime } from "@/lib/utils";

const DAYS_OF_WEEK = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const inputStyle = {
  background: "#1A1A1A",
  border: "1px solid rgba(237,235,230,0.1)",
  color: "#EDEBE6",
};

const labelClass = "block text-xs uppercase tracking-widest font-bold mb-2";
const labelStyle = { color: "rgba(237,235,230,0.5)" };

/**
 * Form component for adding or editing class schedules
 */
export default function ScheduleForm({ trainers, onSubmit, isLoading }) {
  const { classes, isLoading: classesLoading } = useClasses();

  const [scheduleData, setScheduleData] = useState({
    classType: "",
    dayOfWeek: "monday",
    startTimeString: "",
    endTimeString: "",
    trainer: "",
  });

  const [error, setError] = useState("");

  const validateTimes = (start, end) => {
    if (!start || !end) return true;
    return start < end;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));

    setError("");

    if (name === "startTimeString" || name === "endTimeString") {
      const start = name === "startTimeString" ? value : scheduleData.startTimeString;
      const end = name === "endTimeString" ? value : scheduleData.endTimeString;

      if (start && end && !validateTimes(start, end)) {
        setError("End time must be after start time");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTimes(scheduleData.startTimeString, scheduleData.endTimeString)) {
      setError("End time must be after start time");
      return;
    }

    const dataToSubmit = {
      ...scheduleData,
      className: scheduleData.classType,
      capacity: 20,
    };

    if (dataToSubmit.trainer === "") {
      dataToSubmit.trainer = null;
    }

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#EDEBE6" }}>
          Add New Class
        </h3>
        <p className="mt-1 text-xs" style={{ color: "rgba(237,235,230,0.35)" }}>Schedule a new class on the weekly calendar</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div>
          <label htmlFor="classType" className={labelClass} style={labelStyle}>
            Class Type <span style={{ color: "#E50914" }}>*</span>
          </label>
          <select
            id="classType"
            name="classType"
            required
            value={scheduleData.classType}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors appearance-none"
            style={inputStyle}
            disabled={classesLoading}
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          >
            <option value="">{classesLoading ? "Loading classes..." : "Select a class type"}</option>
            {classes && classes.map(classItem => (
              <option key={classItem._id} value={classItem.title}>{classItem.title}</option>
            ))}
          </select>
          {classes && classes.length === 0 && !classesLoading && (
            <p className="mt-1 text-xs" style={{ color: "#E50914" }}>
              No offered classes found. Please add classes in the &quot;Offered Classes&quot; section first.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dayOfWeek" className={labelClass} style={labelStyle}>
              Day <span style={{ color: "#E50914" }}>*</span>
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              required
              value={scheduleData.dayOfWeek}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm focus:outline-none transition-colors appearance-none"
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startTimeString" className={labelClass} style={labelStyle}>
              Start <span style={{ color: "#E50914" }}>*</span>
            </label>
            <input
              type="time"
              id="startTimeString"
              name="startTimeString"
              required
              value={scheduleData.startTimeString}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
            />
          </div>

          <div>
            <label htmlFor="endTimeString" className={labelClass} style={labelStyle}>
              End <span style={{ color: "#E50914" }}>*</span>
            </label>
            <input
              type="time"
              id="endTimeString"
              name="endTimeString"
              required
              value={scheduleData.endTimeString}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
            />
          </div>
        </div>

        <div>
          <label htmlFor="trainer" className={labelClass} style={labelStyle}>
            Trainer
          </label>
          <select
            id="trainer"
            name="trainer"
            value={scheduleData.trainer}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors appearance-none"
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          >
            <option value="">Select a trainer (optional)</option>
            {trainers.map(trainer => (
              <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(237,235,230,0.06)" }}>
        {error && (
          <div className="mb-4 p-3 text-sm" style={{ background: "rgba(229,9,20,0.1)", color: "#E50914", border: "1px solid rgba(229,9,20,0.2)" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || !!error}
          className="w-full py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
          style={{ background: "#E50914", color: "#FFFFFF" }}
        >
          {isLoading ? 'Adding Class...' : 'Add Class to Schedule'}
        </button>
      </div>
    </form>
  );
}
