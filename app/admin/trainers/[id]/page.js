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
  'MMA Coach'
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
    specialization: [],
    experience: '',
    bio: '',
    certifications: []
  });
  
  // For handling specializations
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [customSpecializations, setCustomSpecializations] = useState([]);
  const [newCustomSpecialization, setNewCustomSpecialization] = useState('');
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
          
          // Handle specializations
          const specs = Array.isArray(trainer.specialization) 
            ? trainer.specialization 
            : [trainer.specialization];
          
          // Separate predefined specializations from custom ones
          const predefined = specs.filter(spec => SPECIALIZATIONS.includes(spec));
          const custom = specs.filter(spec => !SPECIALIZATIONS.includes(spec));
          
          setSelectedSpecializations(predefined);
          setCustomSpecializations(custom);
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

  // Update trainer data whenever specializations change
  useEffect(() => {
    const allSpecializations = [...selectedSpecializations, ...customSpecializations];
    
    setTrainerData(prev => ({
      ...prev,
      specialization: allSpecializations
    }));
  }, [selectedSpecializations, customSpecializations]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTrainerData({
      ...trainerData,
      [name]: type === 'checkbox' ? checked : value
    });
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
    
    if (!trainerData.name || !trainerData.specialization || trainerData.specialization.length === 0) {
      toast.error('Name and at least one specialization are required');
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
          
          {/* Specializations */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specializations*
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
                  <label htmlFor={`spec-${spec}`} className="ml-2 text-sm text-gray-700">
                    {spec}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-3">
              <label htmlFor="customSpecialization" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Specializations
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  id="customSpecialization"
                  value={newCustomSpecialization}
                  onChange={(e) => setNewCustomSpecialization(e.target.value)}
                  placeholder="Enter custom specialization"
                  className="flex-1 p-2 border rounded-l-md"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSpecialization}
                  className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
                >
                  Add
                </button>
              </div>
              
              {customSpecializations.length > 0 && (
                <div className="space-y-2 mt-2">
                  {customSpecializations.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center bg-blue-50 p-2 rounded-md">
                      <span className="text-blue-800">{spec}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomSpecialization(index)}
                        className="text-blue-500 hover:text-blue-700"
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
                <p className="text-sm font-medium text-gray-700 mb-1">Selected Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecializations.map(spec => (
                    <span 
                      key={spec} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {spec}
                    </span>
                  ))}
                  {customSpecializations.map((spec, index) => (
                    <span 
                      key={`custom-${index}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certifications
            </label>
            
            <div className="flex mb-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Add certification"
                className="flex-1 p-2 border rounded-l-md"
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
              <div className="space-y-2 mt-2">
                {trainerData.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                    <span>{cert}</span>
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
              <p className="text-gray-500 mt-2">No certifications added</p>
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
            disabled={isSubmitting || (selectedSpecializations.length === 0 && customSpecializations.length === 0)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Update Trainer'}
          </button>
        </div>
      </form>
    </div>
  );
} 