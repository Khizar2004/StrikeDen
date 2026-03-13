"use client";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function SettingsManager() {
  const [globalPromotion, setGlobalPromotion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current global promotion
  useEffect(() => {
    const fetchGlobalPromotion = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success) {
          setGlobalPromotion(data.globalPromotion);
        }
      } catch (error) {
        console.error('Error fetching global promotion:', error);
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobalPromotion();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ globalPromotion }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Global promotion updated successfully');
      } else {
        toast.error(data.message || 'Failed to update global promotion');
      }
    } catch (error) {
      console.error('Error saving global promotion:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-[#E50914] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <h2 className="text-xl font-bold uppercase tracking-wide mb-8" style={{ color: "#EDEBE6" }}>
        Site Settings
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "rgba(237,235,230,0.5)" }}>
            Global Promotion Banner
          </label>
          <p className="text-sm mb-3" style={{ color: "rgba(237,235,230,0.35)" }}>
            This message will appear at the top of the pricing page when set. Leave empty to hide the banner.
          </p>
          <textarea
            value={globalPromotion}
            onChange={(e) => setGlobalPromotion(e.target.value)}
            placeholder="Enter promotional message (e.g., '50% off all classes this month!')"
            className="w-full px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
            style={{
              background: "#1A1A1A",
              border: "1px solid rgba(237,235,230,0.1)",
              color: "#EDEBE6",
            }}
            rows="3"
            maxLength="300"
            onFocus={(e) => e.currentTarget.style.borderColor = "#E50914"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(237,235,230,0.1)"}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs" style={{ color: "rgba(237,235,230,0.35)" }}>
              {globalPromotion.length}/300 characters
            </span>
            {globalPromotion && (
              <button
                onClick={() => setGlobalPromotion('')}
                className="text-xs uppercase tracking-widest font-bold transition-colors"
                style={{ color: "#E50914" }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        {globalPromotion && (
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "rgba(237,235,230,0.5)" }}>
              Preview
            </label>
            <div className="relative overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(229,9,20,0.2)" }}>
              <div className="absolute top-0 left-0 h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #E50914, transparent)" }} />
              <div className="relative z-10 px-8 py-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-2 h-2 animate-pulse" style={{ background: "#E50914" }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E50914" }}>
                    Ongoing Promotions
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-bold whitespace-pre-line leading-tight tracking-tight" style={{ color: "#EDEBE6" }}>
                  {globalPromotion}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(229,9,20,0.5), transparent)" }} />
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
            style={{ background: "#E50914", color: "#FFFFFF" }}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
