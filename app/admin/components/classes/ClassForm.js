"use client";

import { useState } from "react";
import ImageUpload from "../common/ImageUpload";

/**
 * Form component for adding or editing offered classes
 */
export default function ClassForm({ initialData = {}, onSubmit, isLoading }) {
  const [classData, setClassData] = useState({
    title: initialData.title || "",
    image: initialData.image || "",
    description: initialData.description || "",
    shortDescription: initialData.shortDescription || "",
    pricing: initialData.pricing || {
      walkIn: 0,
      weekly: 0,
      monthly: 0,
      annual: 0
    }
  });
  
  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setClassData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [pricingField]: parseFloat(value) || 0
        }
      }));
    } else {
      setClassData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleImageUploaded = (imagePath) => {
    setClassData(prev => ({
      ...prev,
      image: imagePath
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Class</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">These classes appear on the website for potential members.</p>
      </div>
      
      <div className="px-6 py-4">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={classData.title}
              onChange={handleChange}
              placeholder="e.g. Boxing Fundamentals"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Class Image
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              initialImage={classData.image}
            />
          </div>
          
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Short Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={classData.shortDescription}
              onChange={handleChange}
              placeholder="Brief description shown in class listings"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows="2"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={classData.description}
              onChange={handleChange}
              placeholder="Detailed description shown on the class page"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows="4"
            ></textarea>
          </div>
          
          {/* Pricing Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pricing.walkIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Walk-in Price (PKR)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₨</span>
                  <input
                    type="number"
                    id="pricing.walkIn"
                    name="pricing.walkIn"
                    min="0"
                    step="0.01"
                    value={classData.pricing.walkIn}
                    onChange={handleChange}
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pricing.weekly" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Weekly Price (PKR)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₨</span>
                  <input
                    type="number"
                    id="pricing.weekly"
                    name="pricing.weekly"
                    min="0"
                    step="0.01"
                    value={classData.pricing.weekly}
                    onChange={handleChange}
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pricing.monthly" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Monthly Price (PKR)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₨</span>
                  <input
                    type="number"
                    id="pricing.monthly"
                    name="pricing.monthly"
                    min="0"
                    step="0.01"
                    value={classData.pricing.monthly}
                    onChange={handleChange}
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pricing.annual" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Annual Price (PKR)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₨</span>
                  <input
                    type="number"
                    id="pricing.annual"
                    name="pricing.annual"
                    min="0"
                    step="0.01"
                    value={classData.pricing.annual}
                    onChange={handleChange}
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
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
          {isLoading ? 'Adding Class...' : initialData._id ? 'Update Class' : 'Add Class'}
        </button>
      </div>
    </form>
  );
} 