"use client";

import { useState } from "react";
import ImageUpload from "../common/ImageUpload";

/**
 * Form component for adding or editing offered classes
 */
export default function ClassForm({ initialData = {}, onSubmit, isLoading }) {
  const [classData, setClassData] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    image: initialData.image || "",
    description: initialData.description || "",
    shortDescription: initialData.shortDescription || ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUploaded = (imagePath) => {
    setClassData(prev => ({
      ...prev,
      image: imagePath
    }));
  };
  
  const generateSlug = () => {
    if (classData.title) {
      const slug = classData.title.toLowerCase().replace(/\s+/g, '-');
      setClassData(prev => ({
        ...prev,
        slug
      }));
    }
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
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL Slug <span className="text-red-500">*</span>
              <span className="ml-1 text-xs text-gray-500">(used in page URL)</span>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 sm:text-sm">
                /classes/
              </span>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                value={classData.slug}
                onChange={handleChange}
                placeholder="boxing-fundamentals"
                className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Generate
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Use hyphens instead of spaces</p>
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