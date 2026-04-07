'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageUpload from '../../components/common/ImageUpload';

const inputStyle = {
  background: "#1A1A1A",
  border: "1px solid rgba(237,235,230,0.1)",
  color: "#EDEBE6",
};

const labelClass = "block text-xs uppercase tracking-widest font-bold mb-2";
const labelStyle = { color: "rgba(237,235,230,0.5)" };

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
    <div className="min-h-screen py-8 px-4" style={{ background: "#0F0F0F" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>Edit Program</h1>
          <button
            onClick={() => router.push('/admin?tab=offeredPrograms')}
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
            {/* Title */}
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass} style={labelStyle}>
                Title <span style={{ color: "#E50914" }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={programData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
                style={inputStyle}
                required
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Program Image
              </label>
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                initialImage={programData.image}
              />
            </div>

            {/* Short Description */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={programData.shortDescription || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              />
            </div>

            {/* Full Description */}
            <div className="col-span-2">
              <label className={labelClass} style={labelStyle}>
                Full Description
              </label>
              <textarea
                name="description"
                value={programData.description || ''}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
              ></textarea>
            </div>

            {/* Pricing */}
            {[
              { name: "pricing.walkIn", label: "Walk-in Price", value: programData.pricing?.walkIn || 0 },
              { name: "pricing.weekly", label: "Weekly Price", value: programData.pricing?.weekly || 0 },
              { name: "pricing.monthly", label: "Monthly Price", value: programData.pricing?.monthly || 0 },
              { name: "pricing.annual", label: "Annual Price", value: programData.pricing?.annual || 0 },
            ].map(field => (
              <div key={field.name} className="col-span-2 md:col-span-1">
                <label className={labelClass} style={labelStyle}>
                  {field.label} <span style={{ color: "rgba(237,235,230,0.25)" }}>(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs" style={{ color: "rgba(237,235,230,0.3)" }}>₨</span>
                  <input
                    type="number"
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    min="0"
                    className="w-full pl-8 pr-4 py-3 text-sm focus:outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin?tab=offeredPrograms')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ color: "rgba(237,235,230,0.5)", border: "1px solid rgba(237,235,230,0.1)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
              style={{ background: "#E50914", color: "#FFFFFF" }}
            >
              {isSubmitting ? 'Saving...' : 'Update Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
