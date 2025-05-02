'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageUpload from '../../components/common/ImageUpload';

// Specialization options - same as in TrainerForm
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
  'Custom'
];

export default function EditTrainer() {
  const params = useParams();
  const trainerId = params.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trainerData, setTrainerData] = useState({
    name: '',
    image: '',
    specialization: '',
    experience: '',
    bio: '',
    certifications: []
  });
  
  const [isCustom, setIsCustom] = useState(false);
  const [customSpecialization, setCustomSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');

  // Fetch trainer data
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await fetch(`/api/trainers/${trainerId}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const trainer = data.data;
          setTrainerData(trainer);
          
          // Check if specialization is custom
          if (trainer.specialization && !SPECIALIZATIONS.includes(trainer.specialization)) {
            setIsCustom(true);
            setCustomSpecialization(trainer.specialization);
          }
        } else {
          toast.error('Trainer not found');
          router.push('/admin?tab=trainers');
        }
      } catch (error) {
        toast.error('Failed to load trainer data');
        router.push('/admin?tab=trainers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainer();
  }, [trainerId, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'specialization' && value === 'Custom') {
      setIsCustom(true);
    } else if (name === 'specialization') {
      setIsCustom(false);
    }
    
    setTrainerData({
      ...trainerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleCustomSpecializationChange = (e) => {
    const value = e.target.value;
    setCustomSpecialization(value);
    setTrainerData(prev => ({ ...prev, specialization: value }));
  };

  const handleImageUploaded = (imagePath) => {
    setTrainerData({
      ...trainerData,
      image: imagePath
    });
  };
  
  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setTrainerData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()]
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!trainerData.name || !trainerData.specialization) {
      toast.error('Name and specialization are required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/trainers/${trainerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainerData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Trainer updated successfully');
        router.push('/admin?tab=trainers');
      } else {
        toast.error(data.message || 'Failed to update trainer');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Trainer</h1>
        <button
          onClick={() => router.push('/admin?tab=trainers')}
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
          
          {/* Specialization - Dropdown */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization*
            </label>
            <select
              name="specialization"
              value={isCustom ? 'Custom' : trainerData.specialization}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a specialization</option>
              {SPECIALIZATIONS.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            
            {isCustom && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Specialization*
                </label>
                <input
                  type="text"
                  value={customSpecialization}
                  onChange={handleCustomSpecializationChange}
                  placeholder="Enter custom specialization"
                  className="w-full p-2 border rounded-md"
                  required={isCustom}
                />
              </div>
            )}
          </div>
          
          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trainer Image
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              initialImage={trainerData.image}
            />
          </div>
          
          {/* Experience */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years)
            </label>
            <input
              type="text"
              name="experience"
              value={trainerData.experience || ''}
              onChange={handleChange}
              placeholder="e.g., 5 years, 3+ years experience, etc."
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
              value={trainerData.bio || ''}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          
          {/* Certifications */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certifications
            </label>
            
            <div className="flex mb-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                className="flex-1 p-2 border rounded-l-md"
                placeholder="Add certification"
              />
              <button
                type="button"
                onClick={handleAddCertification}
                className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
              >
                Add
              </button>
            </div>
            
            {trainerData.certifications && trainerData.certifications.length > 0 ? (
              <div className="mt-2 space-y-2">
                {trainerData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span className="text-sm">{cert}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No certifications added yet</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin?tab=trainers')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Update Trainer'}
          </button>
        </div>
      </form>
    </div>
  );
} 