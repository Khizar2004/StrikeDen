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

const inputStyle = {
  background: "#1A1A1A",
  border: "1px solid rgba(237,235,230,0.1)",
  color: "#EDEBE6",
};

const labelClass = "block text-xs uppercase tracking-widest font-bold mb-2";
const labelStyle = { color: "rgba(237,235,230,0.5)" };

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

          const specs = Array.isArray(trainer.specialization)
            ? trainer.specialization
            : [trainer.specialization];

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
    <div className="min-h-screen py-8 px-4" style={{ background: "#0F0F0F" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>Edit Trainer</h1>
          <button
            onClick={() => router.push('/admin?tab=trainers')}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
            style={{ color: "rgba(237,235,230,0.5)", border: "1px solid rgba(237,235,230,0.1)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#EDEBE6"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.5)"}
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass} style={labelStyle}>
                Name <span style={{ color: "#E50914" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={trainerData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
                style={inputStyle}
                required
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              />
            </div>

            {/* Experience */}
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass} style={labelStyle}>
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={trainerData.experience || ''}
                onChange={handleChange}
                placeholder="e.g., 5 years, 3+ years experience, etc."
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              />
            </div>

            {/* Specializations */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Specializations <span style={{ color: "#E50914" }}>*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {SPECIALIZATIONS.map(spec => (
                  <div key={spec} className="flex items-center">
                    <input
                      id={`edit-spec-${spec}`}
                      type="checkbox"
                      checked={selectedSpecializations.includes(spec)}
                      onChange={() => handleSpecializationChange(spec)}
                      className="h-4 w-4"
                      style={{ accentColor: "#E50914" }}
                    />
                    <label htmlFor={`edit-spec-${spec}`} className="ml-2 text-sm" style={{ color: "rgba(237,235,230,0.6)" }}>
                      {spec}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <label className={labelClass} style={labelStyle}>
                  Custom Specializations
                </label>
                <div className="flex">
                  <input
                    type="text"
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
                    className="px-4 py-3 text-xs font-bold uppercase tracking-widest"
                    style={{ background: "#E50914", color: "#FFFFFF" }}
                  >
                    Add
                  </button>
                </div>

                {customSpecializations.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {customSpecializations.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center p-2" style={{ background: "rgba(248,163,72,0.08)", border: "1px solid rgba(248,163,72,0.15)" }}>
                        <span className="text-sm" style={{ color: "#F8A348" }}>{spec}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomSpecialization(index)}
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

              {(selectedSpecializations.length > 0 || customSpecializations.length > 0) && (
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "rgba(237,235,230,0.35)" }}>Selected:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecializations.map(spec => (
                      <span key={spec} className="inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(229,9,20,0.15)", color: "#E50914" }}>
                        {spec}
                      </span>
                    ))}
                    {customSpecializations.map((spec, index) => (
                      <span key={`custom-${index}`} className="inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(248,163,72,0.12)", color: "#F8A348" }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Trainer Image
              </label>
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                initialImage={trainerData.image}
              />
            </div>

            {/* Bio */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Bio
              </label>
              <textarea
                name="bio"
                value={trainerData.bio || ''}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              ></textarea>
            </div>

            {/* Certifications */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Certifications
              </label>

              <div className="flex">
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add certification"
                  className="flex-1 px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-widest"
                  style={{ background: "#E50914", color: "#FFFFFF" }}
                >
                  Add
                </button>
              </div>

              {trainerData.certifications && trainerData.certifications.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {trainerData.certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between items-center p-2" style={{ background: "#1A1A1A", border: "1px solid rgba(237,235,230,0.06)" }}>
                      <span className="text-sm" style={{ color: "rgba(237,235,230,0.7)" }}>{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(index)}
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
                <p className="text-xs mt-2" style={{ color: "rgba(237,235,230,0.3)" }}>No certifications added</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin?tab=trainers')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ color: "rgba(237,235,230,0.5)", border: "1px solid rgba(237,235,230,0.1)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (selectedSpecializations.length === 0 && customSpecializations.length === 0)}
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
              style={{ background: "#E50914", color: "#FFFFFF" }}
            >
              {isSubmitting ? 'Saving...' : 'Update Trainer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
