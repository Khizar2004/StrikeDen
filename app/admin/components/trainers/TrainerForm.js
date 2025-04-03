"use client";

import { useState } from "react";
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
  'MMA Coach',
  'Custom' // Added custom option
];

/**
 * Form for adding or editing a trainer
 */
export default function TrainerForm({ initialData = {}, onSubmit, isLoading }) {
  const [trainerData, setTrainerData] = useState({
    name: initialData.name || '',
    specialization: initialData.specialization || '',
    experience: initialData.experience || '',
    image: initialData.image || '',
    bio: initialData.bio || '',
    certifications: initialData.certifications || []
  });
  
  const [newCertification, setNewCertification] = useState('');
  const [debug, setDebug] = useState('');
  const [customSpecialization, setCustomSpecialization] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'specialization' && value === 'Custom') {
      setIsCustom(true);
    } else if (name === 'specialization') {
      setIsCustom(false);
    }
    
    setTrainerData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCustomSpecializationChange = (e) => {
    const value = e.target.value;
    setCustomSpecialization(value);
    setTrainerData(prev => ({ ...prev, specialization: value }));
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
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Specialization <span className="text-red-500">*</span>
          </label>
          <select
            id="specialization"
            name="specialization"
            required
            value={isCustom ? 'Custom' : trainerData.specialization}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select a specialization</option>
            {SPECIALIZATIONS.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          
          {isCustom && (
            <div className="mt-2">
              <label htmlFor="customSpecialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Custom Specialization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customSpecialization"
                value={customSpecialization}
                onChange={handleCustomSpecializationChange}
                required={isCustom}
                placeholder="Enter custom specialization"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
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
          {/* Alternate option for direct URL input */}
          <div className="mt-2">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
              Or enter image URL directly:
            </label>
            <input
              type="text"
              name="image"
              value={trainerData.image}
              onChange={handleChange}
              placeholder="e.g., /uploads/image.jpg"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
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
          disabled={isLoading}
          className={`w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Saving...' : initialData._id ? 'Update Trainer' : 'Add Trainer'}
        </button>
      </div>
    </form>
  );
} 