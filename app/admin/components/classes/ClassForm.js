"use client";

import { useState } from "react";
import ImageUpload from "../common/ImageUpload";

const inputStyle = {
  background: "#1A1A1A",
  border: "1px solid rgba(237,235,230,0.1)",
  color: "#EDEBE6",
};

const labelClass = "block text-xs uppercase tracking-widest font-bold mb-2";
const labelStyle = { color: "rgba(237,235,230,0.5)" };

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
    <form onSubmit={handleSubmit} className="overflow-hidden" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#EDEBE6" }}>Add New Class</h3>
        <p className="mt-1 text-xs" style={{ color: "rgba(237,235,230,0.35)" }}>These classes appear on the website for potential members.</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass} style={labelStyle}>
            Title <span style={{ color: "#E50914" }}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={classData.title}
            onChange={handleChange}
            placeholder="e.g. Boxing Fundamentals"
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>
            Class Image
          </label>
          <ImageUpload
            onImageUploaded={handleImageUploaded}
            initialImage={classData.image}
          />
        </div>

        <div>
          <label htmlFor="shortDescription" className={labelClass} style={labelStyle}>
            Short Description <span style={{ color: "rgba(237,235,230,0.25)" }}>(optional)</span>
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={classData.shortDescription}
            onChange={handleChange}
            placeholder="Brief description shown in class listings"
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
            style={inputStyle}
            rows="2"
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          ></textarea>
        </div>

        <div>
          <label htmlFor="description" className={labelClass} style={labelStyle}>
            Full Description <span style={{ color: "rgba(237,235,230,0.25)" }}>(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={classData.description}
            onChange={handleChange}
            placeholder="Detailed description shown on the class page"
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
            style={inputStyle}
            rows="4"
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          ></textarea>
        </div>

        {/* Pricing Section */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#EDEBE6" }}>Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "pricing.walkIn", label: "Walk-in (PKR)" },
              { id: "pricing.weekly", label: "Weekly (PKR)" },
              { id: "pricing.monthly", label: "Monthly (PKR)" },
              { id: "pricing.annual", label: "Annual (PKR)" },
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className={labelClass} style={labelStyle}>
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs" style={{ color: "rgba(237,235,230,0.3)" }}>₨</span>
                  <input
                    type="number"
                    id={field.id}
                    name={field.id}
                    min="0"
                    step="0.01"
                    value={classData.pricing[field.id.split('.')[1]]}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 text-sm focus:outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(237,235,230,0.06)" }}>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
          style={{ background: "#E50914", color: "#FFFFFF" }}
        >
          {isLoading ? 'Adding Class...' : initialData._id ? 'Update Class' : 'Add Class'}
        </button>
      </div>
    </form>
  );
}
