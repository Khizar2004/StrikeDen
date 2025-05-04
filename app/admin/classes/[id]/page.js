'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageUpload from '../../components/common/ImageUpload';

export default function EditClass() {
  const params = useParams();
  const classId = params.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classData, setClassData] = useState({
    title: '',
    image: '',
    shortDescription: '',
    description: '',
    pricing: {
      walkIn: 0,
      weekly: 0,
      monthly: 0,
      annual: 0
    }
  });

  // Fetch class data
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/classes/${classId}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setClassData(data.data);
        } else {
          toast.error('Class not found');
          router.push('/admin');
        }
      } catch (error) {
        toast.error('Failed to load class data');
        router.push('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClass();
  }, [classId, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setClassData({
        ...classData,
        [parent]: {
          ...classData[parent],
          [child]: type === 'number' ? Number(value) : value
        }
      });
    } else {
      setClassData({
        ...classData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!classData.title) {
      toast.error('Class title is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/classes/${classId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Class updated successfully');
        router.push('/admin');
      } else {
        toast.error(data.message || 'Failed to update class');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploaded = (imagePath) => {
    setClassData({
      ...classData,
      image: imagePath
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Class</h1>
        <button
          onClick={() => router.push('/admin')}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={classData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Image
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              initialImage={classData.image}
            />
          </div>
          
          {/* Short Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              value={classData.shortDescription || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          {/* Full Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Description
            </label>
            <textarea
              name="description"
              value={classData.description || ''}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          
          {/* Pricing - Walk-in */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Walk-in Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.walkIn"
                value={classData.pricing?.walkIn || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>
          
          {/* Pricing - Weekly */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.weekly"
                value={classData.pricing?.weekly || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>
          
          {/* Pricing - Monthly */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.monthly"
                value={classData.pricing?.monthly || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>
          
          {/* Pricing - Annual */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.annual"
                value={classData.pricing?.annual || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Update Class'}
          </button>
        </div>
      </form>
    </div>
  );
} 