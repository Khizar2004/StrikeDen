'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function NewTrainer() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trainerData, setTrainerData] = useState({
    name: '',
    image: '',
    specialization: '',
    experience: '',
    bio: '',
    active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTrainerData({
      ...trainerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!trainerData.name || !trainerData.specialization) {
      toast.error('Name and specialization are required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/trainers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainerData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Trainer added successfully');
        router.push('/admin/trainers');
      } else {
        toast.error(data.message || 'Failed to add trainer');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Trainer</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name*
            </label>
            <input
              type="text"
              name="name"
              value={trainerData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          {/* Image URL */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={trainerData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          {/* Specialization */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization*
            </label>
            <input
              type="text"
              name="specialization"
              value={trainerData.specialization}
              onChange={handleChange}
              placeholder="MMA, Judo, etc."
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          {/* Experience */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              value={trainerData.experience}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          {/* Bio */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={trainerData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          
          {/* Active Status */}
          <div className="col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={trainerData.active}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Trainer'}
          </button>
        </div>
      </form>
    </div>
  );
} 