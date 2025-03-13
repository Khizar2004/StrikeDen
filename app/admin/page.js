"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg -top-1 left-full ml-2">
          {text}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -left-1 top-3"></div>
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
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
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
    capacity: 20,
    description: "",
    isRecurring: false,
    recurringPattern: null
  });
  const [isAuth, setIsAuth] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
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
    const stored = localStorage.getItem("adminLoggedIn");
    if (stored === "true") {
      setIsAuth(true);
      fetchTrainers();
      fetchSchedules();
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const fetchTrainers = async () => {
    try {
      setIsLoading({...isLoading, trainers: true});
      const response = await fetch("/api/trainers");
      const data = await response.json();
      if (data.success) {
        setTrainers(data.data); // API returns trainers in data field
      } else {
        toast.error(data.error || 'Failed to fetch trainers');
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast.error("Failed to fetch trainers");
    } finally {
      setIsLoading({...isLoading, trainers: false});
    }
  };

  const fetchSchedules = async () => {
    try {
      setIsLoading({...isLoading, schedules: true});
      const response = await fetch(`/api/schedules?date=${selectedDate}`);
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

      // Ensure capacity is a number
      const capacity = parseInt(newClass.capacity) || 20;

      // Create a clean object with correctly formatted data
      const classData = {
        className: newClass.className.trim(),
        classType: newClass.classType,
        trainer: newClass.trainer,
        startTime: formattedStartTime.toISOString(),
        endTime: formattedEndTime.toISOString(),
        capacity: capacity
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
          capacity: 20,
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

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  // Render nothing until authentication is confirmed
  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-gray-100">
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
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
        >
          Logout
        </button>
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
              className={`cursor-pointer py-2 ${activeTab === "trainers" ? "bg-red-600" : ""}`}
              onClick={() => setActiveTab("trainers")}
            >
              Manage Trainers
            </li>
            <li
              className={`cursor-pointer py-2 ${activeTab === "schedule" ? "bg-red-600" : ""}`}
              onClick={() => setActiveTab("schedule")}
            >
              Manage Schedule
            </li>
            <li
              className={`cursor-pointer py-2 ${activeTab === "members" ? "bg-red-600" : ""}`}
              onClick={() => setActiveTab("members")}
            >
              Manage Members
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "trainers" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Manage Trainers</h2>
              
              {/* Add New Trainer Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Add New Trainer</h3>
                <p className="text-gray-600 mb-4">Fill in the information below to add a new trainer to the system. Required fields are marked with *</p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTrainer();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="trainerName" className="block text-sm font-medium text-gray-700 mb-1">
                        Trainer Name *
                      </label>
                      <input
                        id="trainerName"
                        type="text"
                        placeholder="Enter trainer's full name"
                        value={newTrainer?.name || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization *
                      </label>
                      <select
                        id="specialization"
                        value={newTrainer?.specialization || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                        className="p-2 border rounded-lg w-full"
                        required
                      >
                        <option value="">Select Specialization</option>
                        {['Boxing', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Wrestling', 'MMA', 'Conditioning'].map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="p-2 border rounded-lg w-full"
                      />
                      <p className="text-sm text-gray-500 mt-1">Add a link to the trainer's profile photo</p>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio <span className="text-gray-500">(optional)</span>
                      </label>
                      <textarea
                        id="bio"
                        placeholder="Short biography about the trainer"
                        value={newTrainer?.bio || ''}
                        onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                        className="p-2 border rounded-lg w-full"
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
                          className="p-2 border rounded-lg flex-grow"
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
              <h3 className="text-xl font-semibold mb-4">Current Trainers</h3>
              {isLoading.trainers ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading trainers...</p>
                </div>
              ) : trainers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainers.map((trainer) => (
                    <div key={trainer._id} className="bg-white p-4 rounded-lg shadow-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{trainer.name}</h3>
                          <p className="text-gray-600">{trainer.specialization}</p>
                        </div>
                        <button
                          onClick={() => confirmDeleteTrainer(trainer._id)}
                          disabled={isLoading.deleteTrainer}
                          className="text-red-600 hover:text-red-800"
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
                      <p className="text-gray-600">Experience: {trainer.experience} years</p>
                      {trainer.bio && <p className="text-gray-500 mt-2">{trainer.bio}</p>}
                      {trainer.certifications?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold">Certifications:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {trainer.certifications.map((cert, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
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
                <div className="text-center py-8 bg-white rounded-lg shadow">
                  <p className="text-gray-500">No trainers added yet.</p>
                  <p className="text-gray-500">Use the form above to add your first trainer.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Add Class</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddSchedule();
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Class Name</label>
                        <input
                          type="text"
                          required
                          value={newClass.className}
                          onChange={(e) => setNewClass({...newClass, className: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Class Type</label>
                        <select
                          required
                          value={newClass.classType}
                          onChange={(e) => setNewClass({...newClass, classType: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Class Type</option>
                          <option value="Boxing">Boxing</option>
                          <option value="Brazilian Jiu-Jitsu">Brazilian Jiu-Jitsu</option>
                          <option value="Muay Thai">Muay Thai</option>
                          <option value="Wrestling">Wrestling</option>
                          <option value="MMA">MMA</option>
                          <option value="Conditioning">Conditioning</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                          type="date"
                          required
                          value={newClass.date}
                          onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Start Time</label>
                        <input
                          type="time"
                          required
                          value={newClass.startTime}
                          onChange={(e) => setNewClass({...newClass, startTime: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <input
                          type="time"
                          required
                          value={newClass.endTime}
                          onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Trainer</label>
                        <select
                          required
                          value={newClass.trainer}
                          onChange={(e) => setNewClass({...newClass, trainer: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Trainer</option>
                          {trainers.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                              {trainer.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Capacity</label>
                        <input
                          type="number"
                          required
                          value={newClass.capacity}
                          onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>
                      <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                        <textarea
                          value={newClass.description}
                          onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                        <label htmlFor="isRecurring" className="text-sm font-medium">
                          Make this a recurring class
                        </label>
                      </div>
                    </div>
                  
                    {newClass.isRecurring && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Recurring Pattern</label>
                        <select
                          required={newClass.isRecurring}
                          value={newClass.recurringPattern || ""}
                          onChange={(e) => setNewClass({...newClass, recurringPattern: e.target.value})}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                  <h3 className="text-xl font-semibold mb-4">View Schedule</h3>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                    <label htmlFor="dateFilter" className="text-sm font-medium text-gray-700">
                      Filter by date:
                    </label>
                    <input
                      id="dateFilter"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                      }}
                      className="p-2 border rounded-lg"
                    />
                    <button 
                      onClick={fetchSchedules}
                      disabled={isLoading.schedules}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {isLoading.schedules ? 'Loading...' : 'View Classes'}
                    </button>
                  </div>
                </div>

                {/* Display Schedules */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Classes for {new Date(selectedDate).toLocaleDateString()}</h3>
                  {isLoading.schedules ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading classes...</p>
                    </div>
                  ) : schedules.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {schedules.map((schedule) => (
                        <div key={schedule._id} className="bg-white p-4 rounded-lg shadow-lg">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold">{schedule.className}</h3>
                            <button
                              onClick={() => confirmDeleteSchedule(schedule._id)}
                              disabled={isLoading.deleteSchedule}
                              className="text-red-600 hover:text-red-800"
                              aria-label="Delete class"
                            >
                              ×
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <p className="font-semibold text-gray-800">{schedule.classType}</p>
                            <p>Date: {new Date(schedule.startTime).toLocaleDateString()}</p>
                            <p>Time: {new Date(schedule.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(schedule.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            <p>Trainer: {schedule.trainer?.name}</p>
                            <p className="mt-1">
                              {schedule.enrolledStudents?.length || 0} / {schedule.capacity} spots filled
                            </p>
                            {schedule.description && (
                              <p className="mt-2 text-gray-500">{schedule.description}</p>
                            )}
                            {schedule.isRecurring && (
                              <p className="mt-1 text-blue-600">Recurring: {schedule.recurringPattern}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No classes scheduled for this date.</p>
                      <p className="text-gray-500 mt-2">Use the form above to add a new class.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Manage Members</h2>
              {/* Member management forms will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
