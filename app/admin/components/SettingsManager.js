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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Site Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Global Promotion Banner
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            This message will appear at the top of the pricing page when set. Leave empty to hide the banner.
          </p>
          <textarea
            value={globalPromotion}
            onChange={(e) => setGlobalPromotion(e.target.value)}
            placeholder="Enter promotional message (e.g., '50% off all classes this month!')"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            rows="3"
            maxLength="300"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              {globalPromotion.length}/300 characters
            </span>
            {globalPromotion && (
              <button
                onClick={() => setGlobalPromotion('')}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        {globalPromotion && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview
            </label>
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-lg">
              <div className="text-lg font-semibold text-center whitespace-pre-line">
                {globalPromotion}
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
