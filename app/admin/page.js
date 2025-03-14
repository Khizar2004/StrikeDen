"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../../components/ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

// Helper function to format time
const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  return new Date(timeString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
};

// Tooltip Component
const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg -top-1 left-full ml-2">
          {text}
          <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-800 transform rotate-45 -left-1 top-3"></div>
        </div>
      )}
    </div>
  );
};

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl transition-colors duration-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const { theme, setTheme, mounted } = useTheme();
  const [activeTab, setActiveTab] = useState("trainers");
  const [schedules, setSchedules] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    specialization: '',
    experience: '',
    image: '',
    bio: '',
    certifications: []
  });
  const [newClass, setNewClass] = useState({
    className: "",
    classType: "",
    date: new Date().toISOString().split('T')[0],
    startTime: "",
    endTime: "",
    trainer: "",
    description: "",
    isRecurring: false,
    recurringPattern: null
  });
  const [isAuth, setIsAuth] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewAllClasses, setViewAllClasses] = useState(false);
  const [isLoading, setIsLoading] = useState({
    trainers: false,
    schedules: false,
    addTrainer: false,
    deleteTrainer: false,
    addSchedule: false,
    deleteSchedule: false
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    itemId: null
  });
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    lastApiCall: null,
    lastApiResponse: null,
    error: null
  });
  const router = useRouter();

  // Check for authentication and fetch initial data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check-auth', {
          method: 'GET',
          credentials: 'include'
        });
        
        const data = await res.json();
        
        if (data.success) {
          setIsAuth(true);
          fetchTrainers();
          fetchSchedules();
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push("/admin/login");
      }
    };
    
    checkAuth();
  }, [router]);

  const fetchTrainers = async () => {
    try {
      setIsLoading({...isLoading, trainers: true});
      const response = await fetch("/api/trainers");
      const data = await response.json();
      if (data.success) {
        // Check which property contains the trainers data
        if (data.data) {
          setTrainers(data.data);
        } else if (data.trainers) {
          setTrainers(data.trainers);
        } else {
          // Fallback if neither expected property exists
          console.error("Unexpected API response format:", data);
          setTrainers([]);
          toast.error('Unexpected data format from API');
        }
      } else {
        toast.error(data.error || 'Failed to fetch trainers');
        setTrainers([]);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast.error("Failed to fetch trainers");
      setTrainers([]);
    } finally {
      setIsLoading({...isLoading, trainers: false});
    }
  };

  const fetchSchedules = async () => {
    try {
      setIsLoading({...isLoading, schedules: true});
      
      // Build the URL based on whether we want all classes or just for a specific date
      const url = viewAllClasses 
        ? `/api/schedules` 
        : `/api/schedules?date=${selectedDate}`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setSchedules(data.schedules);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to fetch schedules");
    } finally {
      setIsLoading({...isLoading, schedules: false});
    }
  };

  const handleAddSchedule = async () => {
    try {
      console.log("handleAddSchedule function called");
      console.log("Current class data:", newClass);
      
      // Basic validation
      const requiredFields = {
        'Class Name': newClass.className,
        'Class Type': newClass.classType,
        'Date': newClass.date,
        'Start Time': newClass.startTime,
        'End Time': newClass.endTime,
        'Trainer': newClass.trainer
      };
      
      console.log("Required fields check:", requiredFields);
      
      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => {
          console.log(`Checking ${key}:`, value);
          return !value;
        })
        .map(([key]) => key);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`);
        return;
      }

      // Update loading state
      setIsLoading(prev => ({...prev, addSchedule: true}));

      // Format date and time for API
      const formattedStartTime = new Date(`${newClass.date}T${newClass.startTime}`);
      const formattedEndTime = new Date(`${newClass.date}T${newClass.endTime}`);

      // Check if end time is after start time
      if (formattedEndTime <= formattedStartTime) {
        toast.error("End time must be after start time");
        setIsLoading(prev => ({...prev, addSchedule: false}));
        return;
      }

      // Create a clean object with correctly formatted data
      const classData = {
        className: newClass.className.trim(),
        classType: newClass.classType,
        trainer: newClass.trainer,
        startTime: formattedStartTime.toISOString(),
        endTime: formattedEndTime.toISOString(),
        capacity: 20 // Default capacity
      };
      
      // Add optional fields only if they have values
      if (newClass.description) classData.description = newClass.description.trim();
      
      // Add fields for recurring classes
      if (newClass.isRecurring && newClass.recurringPattern) {
        classData.isRecurring = true;
        classData.recurringPattern = newClass.recurringPattern;
        classData.dateTime = formattedStartTime.toISOString(); // API uses dateTime for recurring classes
      }

      console.log("Processed class data to send:", classData);

      // Update debug info
      setDebugInfo(prev => ({
        ...prev,
        lastApiCall: {
          url: '/api/schedules',
          method: 'POST',
          body: classData
        },
        lastApiResponse: null,
        error: null
      }));

      // Make the API request
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });
      
      console.log("API response status:", response.status);
      
      const data = await response.json();
      console.log("API response data:", data);
      
      // Update debug info with response
      setDebugInfo(prev => ({
        ...prev,
        lastApiResponse: {
          status: response.status,
          data: data
        }
      }));

      if (data.success) {
        toast.success(newClass.isRecurring ? 
          "Recurring classes created successfully" : 
          "Class added successfully"
        );
        
        // Reset the form
        setNewClass({
          className: "",
          classType: "",
          date: new Date().toISOString().split('T')[0],
          startTime: "",
          endTime: "",
          trainer: "",
          description: "",
          isRecurring: false,
          recurringPattern: null
        });
        
        // Refresh the schedule list
        fetchSchedules();
      } else {
        toast.error(data.message || "Failed to add class");
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      toast.error(`Error: ${error.message || "Unknown error occurred"}`);
      
      setDebugInfo(prev => ({
        ...prev,
        error: error.toString()
      }));
    } finally {
      setIsLoading(prev => ({...prev, addSchedule: false}));
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      setIsLoading({...isLoading, deleteSchedule: true});
      const response = await fetch(`/api/schedules?id=${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success("Class deleted successfully");
        fetchSchedules(); // Refresh the schedule list
      } else {
        toast.error(data.message || "Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Failed to delete class");
    } finally {
      setIsLoading({...isLoading, deleteSchedule: false});
    }
  };

  const confirmDeleteSchedule = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Class",
      message: "Are you sure you want to delete this class? This action cannot be undone.",
      onConfirm: () => handleDeleteSchedule(id),
      itemId: id
    });
  };

  const handleDeleteAllSchedules = async () => {
    try {
      setIsLoading({...isLoading, deleteSchedule: true});
      
      // Create an array of promises for each schedule deletion
      const deletePromises = schedules.map(schedule => 
        fetch(`/api/schedules?id=${schedule._id}`, {
          method: "DELETE",
        }).then(res => res.json())
      );
      
      // Wait for all deletions to complete
      const results = await Promise.all(deletePromises);
      
      // Check if all deletions were successful
      const allSuccessful = results.every(result => result.success);
      
      if (allSuccessful) {
        toast.success(`Successfully deleted ${schedules.length} classes`);
        // Refresh the schedule list (which will now be empty)
        setSchedules([]);
      } else {
        // Some deletions failed
        const successCount = results.filter(result => result.success).length;
        toast.warning(`Deleted ${successCount} out of ${schedules.length} classes. Some deletions failed.`);
        // Refresh to see what's left
        fetchSchedules();
      }
    } catch (error) {
      console.error("Error deleting all schedules:", error);
      toast.error("Failed to delete all classes");
    } finally {
      setIsLoading({...isLoading, deleteSchedule: false});
    }
  };

  const confirmDeleteAllSchedules = () => {
    setConfirmModal({
      isOpen: true,
      title: "Delete All Classes",
      message: `Are you sure you want to delete all ${schedules.length} displayed classes? This action cannot be undone.`,
      onConfirm: handleDeleteAllSchedules,
      itemId: null
    });
  };

  const handleAddTrainer = async () => {
    try {
      console.log("handleAddTrainer function called");
      console.log("Current trainer data:", newTrainer);
      
      // Create a clean object without undefined values
      const trainerData = {
        name: newTrainer.name?.trim(),
        specialization: newTrainer.specialization,
        experience: parseInt(newTrainer.experience) || 0
      };
      
      // Only include optional fields if they have values
      if (newTrainer.image) trainerData.image = newTrainer.image.trim();
      if (newTrainer.bio) trainerData.bio = newTrainer.bio.trim();
      if (newTrainer.certifications && newTrainer.certifications.length > 0) {
        trainerData.certifications = newTrainer.certifications;
      }
      
      console.log("Processed trainer data to send:", trainerData);
      
      // Update the debug info first
      setDebugInfo(prev => ({
        ...prev,
        lastApiCall: {
          url: '/api/trainers',
          method: 'POST',
          body: trainerData
        },
        lastApiResponse: null,
        error: null
      }));
      
      // Set loading state
      setIsLoading(prev => ({...prev, addTrainer: true}));
      
      // Make the API request
      const response = await fetch('/api/trainers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainerData),
      });
      
      console.log("API response status:", response.status);
      
      const data = await response.json();
      console.log("API response data:", data);
      
      // Update debug info with response
      setDebugInfo(prev => ({
        ...prev,
        lastApiResponse: {
          status: response.status,
          data: data
        }
      }));
      
      if (data.success) {
        toast.success('Trainer added successfully');
        
        // Reset the form
        setNewTrainer({
          name: '',
          specialization: '',
          experience: '',
          image: '',
          bio: '',
          certifications: []
        });
        
        // Refresh the trainers list
        fetchTrainers();
      } else {
        // Display the specific error message from the API
        toast.error(data.error || 'Failed to add trainer');
        console.error('API Error:', data);
      }
    } catch (error) {
      console.error('Error adding trainer:', error);
      toast.error(`Error: ${error.message || 'Unknown error occurred'}`);
      
      setDebugInfo(prev => ({
        ...prev,
        error: error.toString()
      }));
    } finally {
      setIsLoading(prev => ({...prev, addTrainer: false}));
    }
  };

  const handleDeleteTrainer = async (id) => {
    try {
      setIsLoading({...isLoading, deleteTrainer: true});
      const response = await fetch(`/api/trainers/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Trainer deleted successfully');
        fetchTrainers(); // Refresh the trainers list
        // Also refresh schedules as they might reference this trainer
        fetchSchedules();
      } else {
        toast.error(data.error || 'Failed to delete trainer');
      }
    } catch (error) {
      console.error('Error deleting trainer:', error);
      toast.error('Failed to delete trainer');
    } finally {
      setIsLoading({...isLoading, deleteTrainer: false});
    }
  };

  const confirmDeleteTrainer = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Trainer",
      message: "Are you sure you want to delete this trainer? This will also remove them from any classes they are assigned to.",
      onConfirm: () => handleDeleteTrainer(id),
      itemId: id
    });
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success('Logged out successfully');
        router.push("/admin/login");
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    }
  };

  // Render nothing until authentication is confirmed and theme is mounted
  if (!isAuth || !mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      {/* Confirmation Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({...confirmModal, isOpen: false})}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      <header className="bg-black text-white p-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Strike Den Admin Dashboard</h1>
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className={`ml-4 px-2 py-1 rounded-md text-xs ${debugInfo.lastApiResponse?.status === 400 
              ? 'bg-red-600 text-white animate-pulse' 
              : debugInfo.lastApiResponse 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'}`}
            title="Toggle debugging information"
          >
            {showDebug ? 'Hide Debug' : debugInfo.lastApiResponse?.status === 400 ? '🔴 Debug (Error Found)' : 'Debug'}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Debug Information (hidden by default) */}
      {showDebug && (
        <div className="bg-gray-800 text-white p-4 text-xs overflow-auto" style={{ maxHeight: '300px' }}>
          <h3 className="font-bold mb-2">Debug Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold">Last API Call:</h4>
              <pre className="bg-gray-900 p-2 rounded mt-1 overflow-auto">
                {debugInfo.lastApiCall ? JSON.stringify(debugInfo.lastApiCall, null, 2) : 'No API call yet'}
              </pre>
            </div>
            <div>
              <h4 className="font-bold">API Response:</h4>
              <pre className="bg-gray-900 p-2 rounded mt-1 overflow-auto">
                {debugInfo.lastApiResponse ? JSON.stringify(debugInfo.lastApiResponse, null, 2) : 'No response yet'}
              </pre>
            </div>
            {debugInfo.error && (
              <div className="md:col-span-2">
                <h4 className="font-bold text-red-400">Error:</h4>
                <pre className="bg-red-900 p-2 rounded mt-1 overflow-auto">
                  {debugInfo.error}
                </pre>
              </div>
            )}
            <div className="md:col-span-2 mt-2">
              <h4 className="font-bold">Common 400 Errors:</h4>
              <ul className="list-disc pl-5 mt-1 text-yellow-300">
                <li>Missing required fields - name, specialization, or experience</li>
                <li>Invalid specialization - must be one of the allowed values</li>
                <li>Invalid image URL format</li>
                <li>Experience out of range (0-50 years)</li>
                <li>Bio too long (max 200 characters)</li>
                <li>Too many certifications (max 5)</li>
              </ul>
              <div className="mt-2 p-2 bg-blue-900 rounded">
                <p className="text-blue-300 font-bold">Troubleshooting Steps:</p>
                <ol className="list-decimal pl-5 text-white">
                  <li>Check that all required fields are filled</li>
                  <li>Make sure specialization is one of the allowed values</li>
                  <li>Verify any URL format is correct</li>
                  <li>Try with minimal data first (name, specialization, experience only)</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-6">
          <ul>
            <li
              className={`cursor-pointer py-2 px-3 rounded transition-colors duration-200 ${activeTab === "trainers" ? "bg-red-600" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab("trainers")}
            >
              Manage Trainers
            </li>
            <li
              className={`cursor-pointer py-2 px-3 rounded transition-colors duration-200 ${activeTab === "schedule" ? "bg-red-600" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab("schedule")}
            >
              Manage Schedule
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "trainers" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Trainers</h2>
              
              {/* Add New Trainer Form */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-colors duration-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Trainer</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Fill in the information below to add a new trainer to the system. Required fields are marked with *</p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTrainer();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="trainerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Trainer Name *
                      </label>
                      <input
                        id="trainerName"
                        type="text"
                        placeholder="Enter trainer's full name"
                        value={newTrainer?.name || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                        className="p-2 border rounded-lg w-full text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Specialization *
                      </label>
                      <select
                        id="specialization"
                        value={newTrainer?.specialization || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                        className="p-2 border rounded-lg w-full text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        required
                      >
                        <option value="">Select Specialization</option>
                        {['Boxing', 'Kickboxing', 'MMA', 'Taekwondo', 'Judo'].map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Years of Experience *
                      </label>
                      <input
                        id="experience"
                        type="number"
                        placeholder="Enter number of years"
                        value={newTrainer?.experience !== undefined ? newTrainer.experience : ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = value === '' ? '' : parseInt(value);
                          setNewTrainer({ ...newTrainer, experience: numValue });
                        }}
                        min="0"
                        max="50"
                        className="p-2 border rounded-lg w-full text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Profile Image URL <span className="text-gray-500">(optional)</span>
                        <Tooltip text="Paste a URL to an image of the trainer. You can upload images to free hosting sites like Imgur or use photos from your gym's website.">
                          <span className="ml-1 text-gray-500 cursor-help text-xs">(?)</span>
                        </Tooltip>
                      </label>
                      <input
                        id="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={newTrainer?.image || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, image: e.target.value })}
                        className="p-2 border rounded-lg w-full text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                      />
                      <p className="text-sm text-gray-500 mt-1">Add a link to the trainer's profile photo</p>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio <span className="text-gray-500">(optional)</span>
                      </label>
                      <textarea
                        id="bio"
                        placeholder="Short biography about the trainer"
                        value={newTrainer?.bio || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                        className="p-2 border rounded-lg w-full text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        rows="3"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certifications <span className="text-gray-500">(optional, max 5)</span>
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(newTrainer?.certifications || []).map((cert, index) => (
                          <div key={index} className="flex items-center bg-gray-100 p-2 rounded">
                            <span>{cert}</span>
                            <button
                              onClick={() => {
                                const newCerts = [...(newTrainer?.certifications || [])];
                                newCerts.splice(index, 1);
                                setNewTrainer({ ...newTrainer, certifications: newCerts });
                              }}
                              className="ml-2 text-red-600"
                              aria-label="Remove certification"
                              type="button"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Add certification (press Enter)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value) {
                              e.preventDefault();
                              const newCerts = [...(newTrainer?.certifications || []), e.target.value];
                              if (newCerts.length <= 5) {
                                setNewTrainer({ ...newTrainer, certifications: newCerts });
                                e.target.value = '';
                              } else {
                                toast.error('Maximum 5 certifications allowed');
                              }
                            }
                          }}
                          className="p-2 border rounded-lg flex-grow text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Type a certification and press Enter to add it</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddTrainer();
                    }}
                    disabled={isLoading.addTrainer}
                    className={`mt-4 bg-green-600 text-white p-2 rounded-lg w-full hover:bg-green-700 transition-colors 
                      ${isLoading.addTrainer ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading.addTrainer ? 'Adding Trainer...' : 'Add Trainer'}
                  </button>
                  
                  {/* Debug Button - Only visible when debug is enabled */}
                  {showDebug && (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          toast.info("Sending test trainer data...");
                          
                          // Use a minimal test data object
                          const testData = {
                            name: "Test Trainer",
                            specialization: "Boxing",
                            experience: 5
                          };
                          
                          console.log("Sending test data:", testData);
                          
                          const response = await fetch('/api/trainers', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(testData),
                          });
                          
                          console.log("Test API response status:", response.status);
                          const data = await response.json();
                          console.log("Test API response data:", data);
                          
                          if (data.success) {
                            toast.success("Test trainer added successfully!");
                            fetchTrainers();
                          } else {
                            toast.error(`Test failed: ${data.error || 'Unknown error'}`);
                          }
                        } catch (error) {
                          console.error("Test error:", error);
                          toast.error(`Test error: ${error.message}`);
                        }
                      }}
                      className="mt-2 bg-blue-400 text-white p-2 rounded-lg w-full"
                    >
                      Test API with Sample Data
                    </button>
                  )}
                </form>
              </div>

              {/* Display Trainers */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Current Trainers</h3>
              {isLoading.trainers ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">Loading trainers...</p>
                </div>
              ) : trainers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainers.map((trainer) => (
                    <div key={trainer._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-colors duration-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{trainer.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{trainer.specialization}</p>
                        </div>
                        <button
                          onClick={() => confirmDeleteTrainer(trainer._id)}
                          disabled={isLoading.deleteTrainer}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          aria-label="Delete trainer"
                        >
                          ×
                        </button>
                      </div>
                      <img
                        src={trainer.image || 'https://via.placeholder.com/150?text=No+Image'}
                        alt={trainer.name}
                        className="w-full h-48 object-cover rounded-lg my-2"
                      />
                      <p className="text-gray-600 dark:text-gray-300">Experience: {trainer.experience} years</p>
                      {trainer.bio && <p className="text-gray-500 dark:text-gray-400 mt-2">{trainer.bio}</p>}
                      {trainer.certifications?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold text-gray-700 dark:text-gray-300">Certifications:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {trainer.certifications.map((cert, index) => (
                              <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-200">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
                  <p className="text-gray-500 dark:text-gray-400">No trainers added yet.</p>
                  <p className="text-gray-500 dark:text-gray-400">Use the form above to add your first trainer.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add Class</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddSchedule();
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class Name</label>
                        <input
                          type="text"
                          required
                          value={newClass.className}
                          onChange={(e) => setNewClass({...newClass, className: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class Type</label>
                        <select
                          required
                          value={newClass.classType}
                          onChange={(e) => setNewClass({...newClass, classType: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="">Select Class Type</option>
                          <option value="Boxing">Boxing</option>
                          <option value="Kickboxing">Kickboxing</option>
                          <option value="MMA">MMA</option>
                          <option value="Taekwondo">Taekwondo</option>
                          <option value="Judo">Judo</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
                        <input
                          type="date"
                          required
                          value={newClass.date}
                          onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Start Time</label>
                        <input
                          type="time"
                          required
                          value={newClass.startTime}
                          onChange={(e) => setNewClass({...newClass, startTime: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End Time</label>
                        <input
                          type="time"
                          required
                          value={newClass.endTime}
                          onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Trainer</label>
                        <select
                          required
                          value={newClass.trainer}
                          onChange={(e) => setNewClass({...newClass, trainer: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="">Select Trainer</option>
                          {trainers.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                              {trainer.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description (Optional)</label>
                        <textarea
                          value={newClass.description}
                          onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                          rows="3"
                        />
                      </div>
                    </div>
                  
                    <div className="mb-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isRecurring"
                          checked={newClass.isRecurring}
                          onChange={(e) => setNewClass({...newClass, isRecurring: e.target.checked})}
                          className="mr-2"
                        />
                        <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Make this a recurring class
                        </label>
                      </div>
                    </div>
                  
                    {newClass.isRecurring && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Recurring Pattern</label>
                        <select
                          required={newClass.isRecurring}
                          value={newClass.recurringPattern || ""}
                          onChange={(e) => setNewClass({...newClass, recurringPattern: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="">Select Pattern</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}
                  
                    <button
                      type="submit"
                      disabled={isLoading.addSchedule}
                      className={`mt-4 bg-green-600 text-white p-2 rounded-lg w-full hover:bg-green-700 transition-colors
                      ${isLoading.addSchedule ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isLoading.addSchedule 
                        ? (newClass.isRecurring ? 'Creating Recurring Classes...' : 'Adding Class...') 
                        : (newClass.isRecurring ? 'Create Recurring Classes' : 'Add Class')}
                    </button>
                  </form>

                  {showDebug && (
                    <div className="mt-6 border-t pt-4">
                      <h4 className="text-lg font-semibold mb-2">Test API</h4>
                      <button
                        onClick={async () => {
                          // Set loading
                          setIsLoading(prev => ({...prev, testApi: true}));
                          
                          // Create test data
                          const testData = {
                            className: "Test Class",
                            classType: "Boxing",
                            trainer: trainers.length > 0 ? trainers[0]._id : "MockTrainerID",
                            startTime: new Date().toISOString(),
                            endTime: new Date(Date.now() + 3600000).toISOString(),
                            capacity: 20
                          };
                          
                          console.log("Sending test class data:", testData);
                          
                          try {
                            // Update debug info
                            setDebugInfo(prev => ({
                              ...prev,
                              lastApiCall: {
                                url: '/api/schedules',
                                method: 'POST',
                                body: testData
                              },
                              lastApiResponse: null,
                              error: null
                            }));
                            
                            // Make API call
                            const response = await fetch("/api/schedules", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(testData),
                            });
                            
                            console.log("Test API response status:", response.status);
                            const data = await response.json();
                            console.log("Test API response data:", data);
                            
                            // Update debug info
                            setDebugInfo(prev => ({
                              ...prev,
                              lastApiResponse: {
                                status: response.status,
                                data: data
                              }
                            }));
                            
                            if (data.success) {
                              toast.success("Test class added successfully!");
                              fetchSchedules();
                            } else {
                              toast.error(`Test failed: ${data.message || "Unknown error"}`);
                            }
                          } catch (error) {
                            console.error("Test API error:", error);
                            toast.error(`Test error: ${error.message}`);
                            
                            setDebugInfo(prev => ({
                              ...prev,
                              error: error.toString()
                            }));
                          } finally {
                            setIsLoading(prev => ({...prev, testApi: false}));
                          }
                        }}
                        disabled={isLoading.testApi}
                        className="bg-purple-600 text-white p-2 rounded-lg w-full hover:bg-purple-700 transition-colors mt-2"
                      >
                        {isLoading.testApi ? "Testing API..." : "Test API with Sample Data"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Schedule View Controls */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">View Schedule</h3>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="viewAllClasses"
                          checked={viewAllClasses}
                          onChange={(e) => setViewAllClasses(e.target.checked)}
                          className="mr-1"
                        />
                        <label htmlFor="viewAllClasses" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          View all classes
                        </label>
                      </div>
                      
                      {!viewAllClasses && (
                        <div className="flex items-center gap-2">
                          <label htmlFor="dateFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Filter by date:
                          </label>
                          <input
                            id="dateFilter"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                            }}
                            className="p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      )}
                      
                      <button 
                        onClick={fetchSchedules}
                        disabled={isLoading.schedules}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                      >
                        {isLoading.schedules ? 'Loading...' : viewAllClasses ? 'View All Classes' : 'View Classes for Date'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Display Schedules */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {viewAllClasses ? 'All Classes' : `Classes for ${new Date(selectedDate).toLocaleDateString()}`}
                    </h3>
                    
                    {schedules.length > 0 && (
                      <button
                        onClick={confirmDeleteAllSchedules}
                        disabled={isLoading.deleteSchedule}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        {isLoading.deleteSchedule ? 'Deleting...' : 'Delete All Classes'}
                      </button>
                    )}
                  </div>
                  
                  {isLoading.schedules ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">Loading classes...</p>
                    </div>
                  ) : schedules.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {schedules.map((schedule) => (
                        <div key={schedule._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800 dark:text-white">{schedule.className}</h4>
                            <button
                              onClick={() => confirmDeleteSchedule(schedule._id)}
                              disabled={isLoading.deleteSchedule}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              aria-label="Delete class"
                            >
                              ×
                            </button>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Date:</span> {new Date(schedule.startTime).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Type:</span> {schedule.classType}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Time:</span> {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Trainer:</span> {schedule.trainer?.name || 'Unknown'}
                          </div>
                          {schedule.description && (
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                              <span className="font-medium">Description:</span> {schedule.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <p className="text-gray-500 dark:text-gray-400">
                        {viewAllClasses ? 'No classes found.' : 'No classes scheduled for this date.'}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">Use the form above to add a new class.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
