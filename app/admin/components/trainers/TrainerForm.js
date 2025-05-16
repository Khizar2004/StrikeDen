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
  const [debug, setDebug] = useState('');
  
  // For handling the specializations
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [customSpecializations, setCustomSpecializations] = useState([]);
  const [newCustomSpecialization, setNewCustomSpecialization] = useState('');
  
  // Set initial specializations
  useEffect(() => {
    if (initialData.specialization) {
      // Handle both string and array for backward compatibility
      const specs = Array.isArray(initialData.specialization) 
        ? initialData.specialization 
        : [initialData.specialization];
      
      // Separate predefined specializations from custom ones
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
    console.log("Image uploaded:", imagePath);
    setDebug("Image path: " + imagePath);
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
    console.log("Submitting trainer data:", trainerData);
    onSubmit(trainerData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {initialData._id ? 'Edit Trainer' : 'Add New Trainer'}
        </h3>
      </div>
      
      <div className="px-6 py-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={trainerData.name}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Specializations <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {SPECIALIZATIONS.map(spec => (
              <div key={spec} className="flex items-center">
                <input
                  id={`spec-${spec}`}
                  type="checkbox"
                  checked={selectedSpecializations.includes(spec)}
                  onChange={() => handleSpecializationChange(spec)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor={`spec-${spec}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {spec}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <label htmlFor="customSpecialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Specializations
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                id="customSpecialization"
                value={newCustomSpecialization}
                onChange={(e) => setNewCustomSpecialization(e.target.value)}
                placeholder="Enter custom specialization"
                className="flex-1 rounded-l-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddCustomSpecialization}
                className="px-4 py-2 rounded-r-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
              >
                Add
              </button>
            </div>
            
            {customSpecializations.length > 0 && (
              <div className="mt-2 space-y-2">
                {customSpecializations.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
                    <span className="text-sm text-blue-800 dark:text-blue-200">{spec}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomSpecialization(index)}
                      className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selected Specializations:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSpecializations.map(spec => (
                  <span 
                    key={spec} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  >
                    {spec}
                  </span>
                ))}
                {customSpecializations.map((spec, index) => (
                  <span 
                    key={`custom-${index}`} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={trainerData.experience}
            onChange={handleChange}
            placeholder="e.g., 5 years, 3+ years experience, etc."
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Image
          </label>
          <ImageUpload 
            onImageUploaded={handleImageUploaded} 
            initialImage={trainerData.image}
          />
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Biography
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            value={trainerData.bio}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Certifications
          </label>
          
          <div className="flex mb-2">
            <input
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className="flex-1 rounded-l-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Add certification"
            />
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-2 rounded-r-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            >
              Add
            </button>
          </div>
          
          {trainerData.certifications.length > 0 ? (
            <div className="mt-2 space-y-2">
              {trainerData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                  <span className="text-sm text-gray-800 dark:text-gray-200">{cert}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No certifications added yet</p>
          )}
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={isLoading || (selectedSpecializations.length === 0 && customSpecializations.length === 0)}
          className={`w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isLoading || (selectedSpecializations.length === 0 && customSpecializations.length === 0) ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Saving...' : initialData._id ? 'Update Trainer' : 'Add Trainer'}
        </button>
      </div>
    </form>
  );
} 