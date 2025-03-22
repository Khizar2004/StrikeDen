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
  return timeString;
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
    dayOfWeek: "monday",
    startTimeString: "",
    endTimeString: "",
    trainer: "",
    description: ""
  });
  const [isAuth, setIsAuth] = useState(false);
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
  const [offeredClasses, setOfferedClasses] = useState([]);
  const [newOfferedClass, setNewOfferedClass] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    shortDescription: ""
  });
  const [isLoadingOfferedClasses, setIsLoadingOfferedClasses] = useState(false);
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
          fetchOfferedClasses();
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
      
      // Always fetch all schedules with the new day-of-week system
      const response = await fetch('/api/schedules');
      const data = await response.json();
      
      if (data.success) {
        setSchedules(data.data || []);
      } else {
        setSchedules([]);
        toast.error(data.message || "Failed to fetch schedules");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to fetch schedules");
      setSchedules([]);
    } finally {
      setIsLoading({...isLoading, schedules: false});
    }
  };

  const fetchOfferedClasses = async () => {
    try {
      setIsLoadingOfferedClasses(true);
      const response = await fetch('/api/classes');
      const data = await response.json();
      
      if (data.success) {
        setOfferedClasses(data.classes || []);
      } else {
        toast.error(data.error || 'Failed to fetch offered classes');
        setOfferedClasses([]);
      }
    } catch (error) {
      console.error("Error fetching offered classes:", error);
      toast.error("Failed to fetch offered classes");
      setOfferedClasses([]);
    } finally {
      setIsLoadingOfferedClasses(false);
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
        'Day of Week': newClass.dayOfWeek,
        'Start Time': newClass.startTimeString,
        'End Time': newClass.endTimeString,
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

      // Check if end time is after start time
      const [startHour, startMinute] = newClass.startTimeString.split(':').map(Number);
      const [endHour, endMinute] = newClass.endTimeString.split(':').map(Number);
      
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      
      if (endMinutes <= startMinutes) {
        toast.error("End time must be after start time");
        setIsLoading(prev => ({...prev, addSchedule: false}));
        return;
      }

      // Create a clean object with correctly formatted data
      const classData = {
        className: newClass.className.trim(),
        classType: newClass.classType,
        dayOfWeek: newClass.dayOfWeek,
        startTimeString: newClass.startTimeString,
        endTimeString: newClass.endTimeString,
        trainer: newClass.trainer,
        capacity: 20 // Default capacity
      };
      
      // Add optional fields only if they have values
      if (newClass.description) classData.description = newClass.description.trim();

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
        toast.success("Class added successfully");
        
        // Reset the form
        setNewClass({
          className: "",
          classType: "",
          dayOfWeek: "monday",
          startTimeString: "",
          endTimeString: "",
          trainer: "",
          description: ""
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

  const handleAddOfferedClass = async () => {
    try {
      // Basic validation
      if (!newOfferedClass.title || !newOfferedClass.slug) {
        toast.error("Title and slug are required");
        return;
      }
      
      // Set loading state
      setIsLoading(prev => ({...prev, addOfferedClass: true}));
      
      // Prepare the data
      const classData = {
        title: newOfferedClass.title.trim(),
        slug: newOfferedClass.slug.trim().toLowerCase().replace(/\s+/g, '-'),
        image: newOfferedClass.image || '',
        description: newOfferedClass.description || '',
        shortDescription: newOfferedClass.shortDescription || ''
      };
      
      // Make the API request
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Class added successfully');
        
        // Reset the form
        setNewOfferedClass({
          title: "",
          slug: "",
          image: "",
          description: "",
          shortDescription: ""
        });
        
        // Refresh the class list
        fetchOfferedClasses();
      } else {
        toast.error(data.error || 'Failed to add class');
      }
    } catch (error) {
      console.error('Error adding offered class:', error);
      toast.error(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsLoading(prev => ({...prev, addOfferedClass: false}));
    }
  };

  const handleDeleteOfferedClass = async (id) => {
    try {
      setIsLoading(prev => ({...prev, deleteOfferedClass: true}));
      const response = await fetch(`/api/classes?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Class deleted successfully');
        fetchOfferedClasses();
      } else {
        toast.error(data.error || 'Failed to delete class');
      }
    } catch (error) {
      console.error('Error deleting offered class:', error);
      toast.error('Failed to delete class');
    } finally {
      setIsLoading(prev => ({...prev, deleteOfferedClass: false}));
    }
  };

  const confirmDeleteOfferedClass = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Class",
      message: "Are you sure you want to delete this class? This action cannot be undone.",
      onConfirm: () => handleDeleteOfferedClass(id),
      itemId: id
    });
  };

  // Render nothing until authentication is confirmed and theme is mounted
  if (!isAuth || !mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      {/* Confirmation Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({...confirmModal, isOpen: false})}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">StrikeDen Admin</span>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              <button
                onClick={() => setActiveTab("trainers")}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === "trainers" 
                    ? "bg-red-600 text-white font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-sm font-medium">Manage Trainers</span>
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === "schedule" 
                    ? "bg-red-600 text-white font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-sm font-medium">Manage Schedule</span>
              </button>
              <button
                onClick={() => setActiveTab("offeredClasses")}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === "offeredClasses" 
                    ? "bg-red-600 text-white font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-sm font-medium">Manage Classes</span>
              </button>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Mobile header */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">StrikeDen Admin</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLogout}
                className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </header>

          {/* Mobile nav */}
          <div className="md:hidden flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab("trainers")}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
                activeTab === "trainers" 
                  ? "border-red-600 text-red-600 dark:text-red-500" 
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Trainers
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
                activeTab === "schedule" 
                  ? "border-red-600 text-red-600 dark:text-red-500" 
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab("offeredClasses")}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
                activeTab === "offeredClasses" 
                  ? "border-red-600 text-red-600 dark:text-red-500" 
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Classes
            </button>
          </div>

          {/* Main content container */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {/* Debug toggle button */}
            <div className="mb-4 flex justify-end">
              <button 
                onClick={() => setShowDebug(!showDebug)}
                className={`px-3 py-1 rounded-md text-xs ${
                  debugInfo.lastApiResponse?.status === 400 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 animate-pulse' 
                  : debugInfo.lastApiResponse 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}
                title="Toggle debugging information"
              >
                {showDebug ? 'Hide Debug' : debugInfo.lastApiResponse?.status === 400 ? '🔴 Debug (Error Found)' : 'Debug'}
              </button>
            </div>

            {/* Debug Information (hidden by default) */}
            {showDebug && (
              <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 text-xs">
                  <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Debug Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">Last API Call:</h4>
                      <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 overflow-auto max-h-40">
                        {debugInfo.lastApiCall ? JSON.stringify(debugInfo.lastApiCall, null, 2) : 'No API call yet'}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">API Response:</h4>
                      <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 overflow-auto max-h-40">
                        {debugInfo.lastApiResponse ? JSON.stringify(debugInfo.lastApiResponse, null, 2) : 'No response yet'}
                      </pre>
                    </div>
                    {debugInfo.error && (
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-red-600 dark:text-red-400">Error:</h4>
                        <pre className="mt-1 p-2 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300 rounded border border-red-200 dark:border-red-800 overflow-auto max-h-40">
                          {debugInfo.error}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab content */}
            <div className="w-full">
              
              {activeTab === "trainers" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trainers</h2>
                  </div>
                  
                  {/* Add New Trainer Form */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Trainer</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fill in the information below to add a new trainer to the system.</p>
                    </div>
                    
                    <div className="px-6 py-4">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTrainer();
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="trainerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Trainer Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="trainerName"
                              type="text"
                              placeholder="Enter trainer's full name"
                              value={newTrainer?.name || ''}
                              onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Specialization <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="specialization"
                              value={newTrainer?.specialization || ''}
                              onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              required
                            >
                              <option value="">Select Specialization</option>
                              {['Boxing', 'Kickboxing', 'MMA', 'Taekwondo', 'Judo'].map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Years of Experience <span className="text-red-500">*</span>
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
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Profile Image URL 
                              <span className="ml-1 text-gray-500">(optional)</span>
                              <Tooltip text="Paste a URL to an image of the trainer. You can upload images to free hosting sites like Imgur or use photos from your gym's website.">
                                <span className="ml-1 text-gray-500 cursor-help">(?)</span>
                              </Tooltip>
                            </label>
                            <input
                              id="imageUrl"
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              value={newTrainer?.image || ''}
                              onChange={(e) => setNewTrainer({ ...newTrainer, image: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Add a link to the trainer's profile photo</p>
                          </div>

                          <div className="md:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Bio <span className="text-gray-500">(optional)</span>
                            </label>
                            <textarea
                              id="bio"
                              placeholder="Short biography about the trainer"
                              value={newTrainer?.bio || ''}
                              onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows="3"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Certifications <span className="text-gray-500">(optional, max 5)</span>
                            </label>
                            <div className="mt-1 flex flex-wrap gap-2 mb-2">
                              {(newTrainer?.certifications || []).map((cert, index) => (
                                <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{cert}</span>
                                  <button
                                    onClick={() => {
                                      const newCerts = [...(newTrainer?.certifications || [])];
                                      newCerts.splice(index, 1);
                                      setNewTrainer({ ...newTrainer, certifications: newCerts });
                                    }}
                                    className="ml-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 focus:outline-none"
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
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Type a certification and press Enter to add it</p>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddTrainer();
                            }}
                            disabled={isLoading.addTrainer}
                            className={`px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                              ${isLoading.addTrainer ? 'opacity-75 cursor-wait' : ''}`}
                          >
                            {isLoading.addTrainer ? 'Adding Trainer...' : 'Add Trainer'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Display Trainers */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Trainers</h3>
                    
                    {isLoading.trainers ? (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">Loading trainers...</p>
                      </div>
                    ) : trainers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainers.map((trainer) => (
                          <div key={trainer._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="h-48 overflow-hidden relative">
                              <img
                                src={trainer.image || 'https://via.placeholder.com/150?text=No+Image'}
                                alt={trainer.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                }}
                              />
                              <button
                                onClick={() => confirmDeleteTrainer(trainer._id)}
                                disabled={isLoading.deleteTrainer}
                                className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-900 rounded-full text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 shadow-sm focus:outline-none"
                                aria-label="Delete trainer"
                              >
                                ×
                              </button>
                            </div>
                            <div className="p-4">
                              <div className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{trainer.name}</h3>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    {trainer.specialization}
                                  </span>
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    {trainer.experience} years
                                  </span>
                                </div>
                              </div>
                              {trainer.bio && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{trainer.bio}</p>}
                              {trainer.certifications?.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Certifications</p>
                                  <div className="flex flex-wrap gap-1">
                                    {trainer.certifications.map((cert, index) => (
                                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        {cert}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No trainers added yet.</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Use the form above to add your first trainer.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Schedule</h2>
                    {schedules.length > 0 && (
                      <button
                        onClick={confirmDeleteAllSchedules}
                        disabled={isLoading.deleteSchedule}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        {isLoading.deleteSchedule ? 'Deleting...' : 'Delete All Classes'}
                      </button>
                    )}
                  </div>
                  
                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Add Class Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Class</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fill in the class details to add it to the schedule.</p>
                      </div>
                      
                      <div className="px-6 py-4">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleAddSchedule();
                        }}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Class Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={newClass.className}
                                onChange={(e) => setNewClass({...newClass, className: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g. Beginner Boxing"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Class Type <span className="text-red-500">*</span>
                              </label>
                              <select
                                required
                                value={newClass.classType}
                                onChange={(e) => setNewClass({...newClass, classType: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              >
                                <option value="">Select Class Type</option>
                                <option value="Boxing">Boxing</option>
                                <option value="Kickboxing">Kickboxing</option>
                                <option value="MMA">MMA</option>
                                <option value="Taekwondo">Taekwondo</option>
                                <option value="Judo">Judo</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Day of Week <span className="text-red-500">*</span>
                              </label>
                              <select
                                required
                                value={newClass.dayOfWeek}
                                onChange={(e) => setNewClass({...newClass, dayOfWeek: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              >
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Trainer <span className="text-red-500">*</span>
                              </label>
                              <select
                                required
                                value={newClass.trainer}
                                onChange={(e) => setNewClass({...newClass, trainer: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              >
                                <option value="">Select Trainer</option>
                                {trainers.map((trainer) => (
                                  <option key={trainer._id} value={trainer._id}>
                                    {trainer.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Start Time <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                                placeholder="13:00"
                                value={newClass.startTimeString}
                                onChange={(e) => setNewClass({...newClass, startTimeString: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">24-hour format (e.g., 13:00)</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                End Time <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                                placeholder="14:30"
                                value={newClass.endTimeString}
                                onChange={(e) => setNewClass({...newClass, endTimeString: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">24-hour format (e.g., 14:30)</p>
                            </div>
                            
                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description <span className="text-gray-400">(optional)</span>
                              </label>
                              <textarea
                                value={newClass.description}
                                onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                rows="3"
                                placeholder="Brief description of the class"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <button
                              type="submit"
                              disabled={isLoading.addSchedule}
                              className={`w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                ${isLoading.addSchedule ? 'opacity-75 cursor-wait' : ''}`}
                            >
                              {isLoading.addSchedule ? 'Adding Class...' : 'Add Class to Schedule'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    
                    {/* Schedule Display */}
                    <div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Weekly Schedule</h3>
                          <button 
                            onClick={fetchSchedules}
                            disabled={isLoading.schedules}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            {isLoading.schedules ? 
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading
                              </span> : 
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                              </span>
                            }
                          </button>
                        </div>
                      </div>
                      
                      {/* Class Cards */}
                      {isLoading.schedules ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
                          <div className="flex flex-col items-center justify-center py-6">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading classes...</p>
                          </div>
                        </div>
                      ) : schedules.length > 0 ? (
                        <div className="space-y-6">
                          {/* Group classes by day of week */}
                          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                            const dayClasses = schedules.filter(s => s.dayOfWeek === day);
                            if (dayClasses.length === 0) return null;
                            
                            return (
                              <div key={day} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transform transition duration-200 hover:shadow-lg">
                                <div className="bg-gradient-to-r from-red-50 to-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                  <h4 className="font-bold text-lg text-gray-900 dark:text-red-400 capitalize">{day}</h4>
                                </div>
                                <div>
                                  {dayClasses.map((schedule, index) => (
                                    <div 
                                      key={schedule._id} 
                                      className={`px-6 py-5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 ${
                                        index !== dayClasses.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                                      }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                          <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h4 className="font-semibold text-base text-gray-900 dark:text-white">{schedule.className}</h4>
                                            <div className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                              {schedule.classType}
                                            </div>
                                          </div>
                                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              <span className="font-medium">{formatTime(schedule.startTimeString)} - {formatTime(schedule.endTimeString)}</span>
                                            </div>
                                            <div className="flex items-center">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                              </svg>
                                              <span>{schedule.trainer?.name || 'Unknown Trainer'}</span>
                                            </div>
                                          </div>
                                          {schedule.description && (
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                                              {schedule.description}
                                            </p>
                                          )}
                                        </div>
                                        <button
                                          onClick={() => confirmDeleteSchedule(schedule._id)}
                                          disabled={isLoading.deleteSchedule}
                                          className="ml-4 flex-shrink-0 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none transition-colors"
                                          aria-label="Delete class"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
                          <div className="flex flex-col items-center justify-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">No classes scheduled yet.</p>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Use the form to add your first class.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "offeredClasses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Offered Classes</h2>
                  </div>
                  
                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Add Class Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Class</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">These classes appear on the website for potential members.</p>
                      </div>
                      
                      <div className="px-6 py-4">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleAddOfferedClass();
                        }}>
                          <div className="space-y-5">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={newOfferedClass.title}
                                onChange={(e) => setNewOfferedClass({...newOfferedClass, title: e.target.value})}
                                placeholder="e.g. Boxing Fundamentals"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                URL Slug <span className="text-red-500">*</span>
                                <span className="ml-1 text-xs text-gray-500">(used in page URL)</span>
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 sm:text-sm">
                                  /classes/
                                </span>
                                <input
                                  type="text"
                                  required
                                  value={newOfferedClass.slug}
                                  onChange={(e) => setNewOfferedClass({...newOfferedClass, slug: e.target.value})}
                                  placeholder="boxing-fundamentals"
                                  className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newOfferedClass.title) {
                                      const slug = newOfferedClass.title.toLowerCase().replace(/\s+/g, '-');
                                      setNewOfferedClass({...newOfferedClass, slug});
                                    }
                                  }}
                                  className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Generate
                                </button>
                              </div>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Use hyphens instead of spaces</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Image URL <span className="text-gray-400">(optional)</span>
                              </label>
                              <input
                                type="text"
                                value={newOfferedClass.image}
                                onChange={(e) => setNewOfferedClass({...newOfferedClass, image: e.target.value})}
                                placeholder="https://example.com/image.jpg"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image shown on the class page and listings</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Short Description <span className="text-gray-400">(optional)</span>
                              </label>
                              <textarea
                                value={newOfferedClass.shortDescription}
                                onChange={(e) => setNewOfferedClass({...newOfferedClass, shortDescription: e.target.value})}
                                placeholder="Brief description shown in class listings"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                rows="2"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Description <span className="text-gray-400">(optional)</span>
                              </label>
                              <textarea
                                value={newOfferedClass.description}
                                onChange={(e) => setNewOfferedClass({...newOfferedClass, description: e.target.value})}
                                placeholder="Detailed description shown on the class page"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                rows="4"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <button
                              type="submit"
                              disabled={isLoading.addOfferedClass}
                              className={`w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                ${isLoading.addOfferedClass ? 'opacity-75 cursor-wait' : ''}`}
                            >
                              {isLoading.addOfferedClass ? 'Adding Class...' : 'Add Class'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    
                    {/* Current Classes Display */}
                    <div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Offered Classes</h3>
                        </div>
                        
                        <div className="px-6 py-4">
                          {isLoadingOfferedClasses ? (
                            <div className="py-8 text-center">
                              <p className="text-gray-500 dark:text-gray-400">Loading classes...</p>
                            </div>
                          ) : offeredClasses.length > 0 ? (
                            <div className="space-y-4">
                              {offeredClasses.map((cls) => (
                                <div key={cls._id} className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                  {cls.image && (
                                    <div className="w-24 h-24 shrink-0">
                                      <img
                                        src={cls.image}
                                        alt={cls.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 p-4 relative">
                                    <div className="pr-8">
                                      <h4 className="text-base font-medium text-gray-900 dark:text-white">{cls.title}</h4>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        <span className="font-medium">URL:</span> /classes/{cls.slug}
                                      </p>
                                      {cls.shortDescription && (
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{cls.shortDescription}</p>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => confirmDeleteOfferedClass(cls._id)}
                                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 focus:outline-none"
                                      aria-label="Delete class"
                                      title="Delete class"
                                    >
                                      ×
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-8 text-center">
                              <p className="text-gray-500 dark:text-gray-400">No classes added yet.</p>
                              <p className="text-gray-500 dark:text-gray-400 mt-1">Use the form to add your first class.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
