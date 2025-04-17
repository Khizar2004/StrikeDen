"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryData, setRecoveryData] = useState({
    username: "",
    recoveryKey: "",
    newPassword: ""
  });
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    // Check if already logged in
    fetch('/api/auth/check-auth', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        router.push('/admin');
      }
    })
    .catch(err => {
      console.error('Auth check error:', err);
    });
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ 
      ...prev, 
      [name]: value
    }));
  };

  const handleRecoveryChange = (e) => {
    const { name, value } = e.target;
    setRecoveryData(prev => ({ 
      ...prev, 
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include' // Include cookies
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success('Login successful');
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      toast.error('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecovery = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch('/api/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recoveryData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success('Password reset successful');
        setIsRecoveryMode(false);
        setCredentials({
          username: recoveryData.username,
          password: ""
        });
      } else {
        setError(data.message || 'Recovery failed');
        toast.error(data.message || 'Recovery failed');
      }
    } catch (err) {
      setError('An error occurred during recovery');
      toast.error('An error occurred during recovery');
      console.error('Recovery error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecoveryMode = () => {
    setIsRecoveryMode(!isRecoveryMode);
    setError("");
    if (!isRecoveryMode) {
      setRecoveryData(prev => ({ ...prev, username: credentials.username }));
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isRecoveryMode ? 'Account Recovery' : 'Admin Login'}
        </h2>
        
        {isRecoveryMode ? (
          // Recovery Form
          <form onSubmit={handleRecovery}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={recoveryData.username}
                onChange={handleRecoveryChange}
                placeholder="Enter username"
                className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Recovery Key
              </label>
              <input
                type="text"
                name="recoveryKey"
                value={recoveryData.recoveryKey}
                onChange={handleRecoveryChange}
                placeholder="Enter recovery key"
                className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter the recovery key provided during setup
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={recoveryData.newPassword}
                onChange={handleRecoveryChange}
                placeholder="Create a secure password"
                className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Must be at least 12 characters with uppercase, lowercase, numbers, and special characters
              </p>
            </div>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={toggleRecoveryMode}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Log In'}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={toggleRecoveryMode}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
