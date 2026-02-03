'use client';  //this file is used to edit a specific program
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageUpload from '../../components/common/ImageUpload';

export default function EditProgram() {
  const params = useParams();
  const programId = params.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [programData, setProgramData] = useState({
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

  // Fetch program data
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`/api/programs/${programId}`);
        const data = await response.json();

        if (data.success && data.data) {
          setProgramData(data.data);
        } else {
          toast.error('Program not found');
          router.push('/admin?tab=offeredPrograms');
        }
      } catch (error) {
        toast.error('Failed to load program data');
        router.push('/admin?tab=offeredPrograms');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgram();
  }, [programId, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProgramData({
        ...programData,
        [parent]: {
          ...programData[parent],
          [child]: type === 'number' ? Number(value) : value
        }
      });
    } else {
      setProgramData({
        ...programData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!programData.title) {
      toast.error('Program title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Program updated successfully');
        router.push('/admin?tab=offeredPrograms');
      } else {
        toast.error(data.message || 'Failed to update program');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploaded = (imagePath) => {
    setProgramData({
      ...programData,
      image: imagePath
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Program</h1>
        <button
          onClick={() => router.push('/admin?tab=offeredPrograms')}
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
              value={programData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Image
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              initialImage={programData.image}
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
              value={programData.shortDescription || ''}
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
              value={programData.description || ''}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>

          {/* Pricing - Walk-in */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Walk-in Price <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.walkIn"
                value={programData.pricing?.walkIn || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>

          {/* Pricing - Weekly */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Price <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.weekly"
                value={programData.pricing?.weekly || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>

          {/* Pricing - Monthly */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Price <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.monthly"
                value={programData.pricing?.monthly || 0}
                onChange={handleChange}
                min="0"
                className="w-full p-2 pl-8 border rounded-md"
              />
            </div>
          </div>

          {/* Pricing - Annual */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Price <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₨</span>
              <input
                type="number"
                name="pricing.annual"
                value={programData.pricing?.annual || 0}
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
            onClick={() => router.push('/admin?tab=offeredPrograms')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Update Program'}
          </button>
        </div>
      </form>
    </div>
  );
}
