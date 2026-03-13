"use client";

import { useState, useEffect } from "react";
import ImageUpload from "../common/ImageUpload";

// Specialization options
const SPECIALIZATIONS = [
  'Boxing',
  'Brazilian Jiu-Jitsu',
  'Muay Thai',
  'Wrestling',
  'MMA',
  'Conditioning',
  'Strength Training',
  'Boxing Coach',
  'MMA Coach'
];

const inputStyle = {
  background: "#1A1A1A",
  border: "1px solid rgba(237,235,230,0.1)",
  color: "#EDEBE6",
};

const labelClass = "block text-xs uppercase tracking-widest font-bold mb-2";
const labelStyle = { color: "rgba(237,235,230,0.5)" };

/**
 * Form for adding or editing a trainer
 */
export default function TrainerForm({ initialData = {}, onSubmit, isLoading }) {
  const [trainerData, setTrainerData] = useState({
    name: initialData.name || '',
    specialization: initialData.specialization || [],
    experience: initialData.experience || '',
    image: initialData.image || '',
    bio: initialData.bio || '',
    certifications: initialData.certifications || []
  });

  const [newCertification, setNewCertification] = useState('');

  // For handling the specializations
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [customSpecializations, setCustomSpecializations] = useState([]);
  const [newCustomSpecialization, setNewCustomSpecialization] = useState('');

  // Set initial specializations
  useEffect(() => {
    if (initialData.specialization) {
      const specs = Array.isArray(initialData.specialization)
        ? initialData.specialization
        : [initialData.specialization];

      const predefined = specs.filter(spec => SPECIALIZATIONS.includes(spec));
      const custom = specs.filter(spec => !SPECIALIZATIONS.includes(spec));

      setSelectedSpecializations(predefined);
      setCustomSpecializations(custom);
    }
  }, [initialData]);

  // Update trainer data whenever specializations change
  useEffect(() => {
    const allSpecializations = [...selectedSpecializations, ...customSpecializations];

    setTrainerData(prev => ({
      ...prev,
      specialization: allSpecializations
    }));
  }, [selectedSpecializations, customSpecializations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecializations(prev => {
      if (prev.includes(specialization)) {
        return prev.filter(item => item !== specialization);
      } else {
        return [...prev, specialization];
      }
    });
  };

  const handleAddCustomSpecialization = () => {
    if (newCustomSpecialization.trim()) {
      setCustomSpecializations(prev => [...prev, newCustomSpecialization.trim()]);
      setNewCustomSpecialization('');
    }
  };

  const handleRemoveCustomSpecialization = (index) => {
    setCustomSpecializations(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUploaded = (imagePath) => {
    setTrainerData(prev => ({ ...prev, image: imagePath }));
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setTrainerData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (index) => {
    setTrainerData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(trainerData);
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#EDEBE6" }}>
          {initialData._id ? 'Edit Trainer' : 'Add New Trainer'}
        </h3>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div>
          <label htmlFor="name" className={labelClass} style={labelStyle}>
            Name <span style={{ color: "#E50914" }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={trainerData.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>
            Specializations <span style={{ color: "#E50914" }}>*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {SPECIALIZATIONS.map(spec => (
              <div key={spec} className="flex items-center">
                <input
                  id={`spec-${spec}`}
                  type="checkbox"
                  checked={selectedSpecializations.includes(spec)}
                  onChange={() => handleSpecializationChange(spec)}
                  className="h-4 w-4 accent-[#E50914]"
                  style={{ accentColor: "#E50914" }}
                />
                <label htmlFor={`spec-${spec}`} className="ml-2 text-sm" style={{ color: "rgba(237,235,230,0.6)" }}>
                  {spec}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <label htmlFor="customSpecialization" className={labelClass} style={labelStyle}>
              Custom Specializations
            </label>
            <div className="flex">
              <input
                type="text"
                id="customSpecialization"
                value={newCustomSpecialization}
                onChange={(e) => setNewCustomSpecialization(e.target.value)}
                placeholder="Enter custom specialization"
                className="flex-1 px-4 py-3 text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              />
              <button
                type="button"
                onClick={handleAddCustomSpecialization}
                className="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                style={{ background: "#E50914", color: "#FFFFFF" }}
              >
                Add
              </button>
            </div>

            {customSpecializations.length > 0 && (
              <div className="mt-2 space-y-2">
                {customSpecializations.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between p-2" style={{ background: "rgba(248,163,72,0.08)", border: "1px solid rgba(248,163,72,0.15)" }}>
                    <span className="text-sm" style={{ color: "#F8A348" }}>{spec}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomSpecialization(index)}
                      className="ml-2 transition-colors"
                      style={{ color: "rgba(237,235,230,0.35)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Display selected specializations */}
          {(selectedSpecializations.length > 0 || customSpecializations.length > 0) && (
            <div className="mt-3">
              <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "rgba(237,235,230,0.35)" }}>Selected:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSpecializations.map(spec => (
                  <span
                    key={spec}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{ background: "rgba(229,9,20,0.15)", color: "#E50914" }}
                  >
                    {spec}
                  </span>
                ))}
                {customSpecializations.map((spec, index) => (
                  <span
                    key={`custom-${index}`}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{ background: "rgba(248,163,72,0.12)", color: "#F8A348" }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="experience" className={labelClass} style={labelStyle}>
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={trainerData.experience}
            onChange={handleChange}
            placeholder="e.g., 5 years, 3+ years experience, etc."
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>
            Profile Image
          </label>
          <ImageUpload
            onImageUploaded={handleImageUploaded}
            initialImage={trainerData.image}
          />
        </div>

        <div>
          <label htmlFor="bio" className={labelClass} style={labelStyle}>
            Biography
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            value={trainerData.bio}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          ></textarea>
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>
            Certifications
          </label>

          <div className="flex">
            <input
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className="flex-1 px-4 py-3 text-sm focus:outline-none transition-colors"
              style={inputStyle}
              placeholder="Add certification"
              onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
            />
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ background: "#E50914", color: "#FFFFFF" }}
            >
              Add
            </button>
          </div>

          {trainerData.certifications.length > 0 ? (
            <div className="mt-2 space-y-2">
              {trainerData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-2" style={{ background: "#1A1A1A", border: "1px solid rgba(237,235,230,0.06)" }}>
                  <span className="text-sm" style={{ color: "rgba(237,235,230,0.7)" }}>{cert}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="ml-2 transition-colors"
                    style={{ color: "#E50914" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs mt-2" style={{ color: "rgba(237,235,230,0.3)" }}>No certifications added yet</p>
          )}
        </div>
      </div>

      <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(237,235,230,0.06)" }}>
        <button
          type="submit"
          disabled={isLoading || (selectedSpecializations.length === 0 && customSpecializations.length === 0)}
          className="w-full py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
          style={{ background: "#E50914", color: "#FFFFFF" }}
        >
          {isLoading ? 'Saving...' : initialData._id ? 'Update Trainer' : 'Add Trainer'}
        </button>
      </div>
    </form>
  );
}
