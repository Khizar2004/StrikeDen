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
            <div className="relative overflow-hidden">
              {/* Main banner container */}
              <div className="relative bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-lg border border-red-600/30 dark:border-red-600/20 backdrop-blur-sm">
                {/* Subtle animated background */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  {/* Subtle dot pattern */}
                  <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(220,38,38,0.15) 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }} />
                  </div>
                  
                  {/* Flowing gradient waves */}
                  <div 
                    className="absolute inset-0 opacity-60 animate-pulse"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.08) 20%, rgba(220,38,38,0.12) 40%, rgba(220,38,38,0.08) 60%, transparent 80%)",
                      backgroundSize: "300% 100%",
                      animation: "gradient-flow 15s linear infinite"
                    }}
                  />
                  
                  {/* Subtle radial highlights */}
                  <div className="absolute top-4 right-8 w-32 h-32 bg-red-500/5 rounded-full blur-xl animate-pulse" />
                  <div className="absolute bottom-4 left-8 w-24 h-24 bg-red-500/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
                  
                  {/* Red accent line */}
                  <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 px-8 py-6 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* Status indicator */}
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-600 dark:text-red-400 text-sm font-medium uppercase tracking-wider">
                      Ongoing Promotions
                    </span>
                  </div>
                  
                  <div className="text-gray-900 dark:text-white text-xl md:text-2xl lg:text-3xl font-black whitespace-pre-line leading-tight tracking-tight">
                    <span style={{
                      textShadow: "0 0 8px rgba(220,38,38,0.3)",
                      animation: "glow 3s ease-in-out infinite"
                    }}>
                      {globalPromotion}
                    </span>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
              </div>
            </div>
            
            {/* Add the keyframes styles */}
            <style jsx>{`
              @keyframes gradient-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }
              
              @keyframes glow {
                0%, 100% { text-shadow: 0 0 0px rgba(220,38,38,0); }
                50% { text-shadow: 0 0 8px rgba(220,38,38,0.3); }
              }
            `}</style>
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
