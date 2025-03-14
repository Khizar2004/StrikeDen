"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "admin", // Default to admin for easier first-time setup
    password: "",
    isReset: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSetup, setIsFirstSetup] = useState(false);
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
      } else {
        // Check if this is first-time setup
        checkAdminExists();
      }
    })
    .catch(err => {
      // Not logged in, check if admin exists
      checkAdminExists();
      console.error('Auth check error:', err);
    });
  }, [router]);

  const checkAdminExists = async () => {
    try {
      const res = await fetch('/api/auth/check-admin-exists');
      const data = await res.json();
      
      if (data.success && !data.adminExists) {
        // If no admin exists, this is first-time setup
        setIsFirstSetup(true);
        setCredentials(prev => ({ ...prev, isReset: true }));
        toast.info('Welcome! Create your admin account for first-time setup.');
      }
    } catch (err) {
      console.error('Error checking admin existence:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value
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

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isFirstSetup ? 'Create Admin Account' : 'Admin Login'}
        </h2>
        
        {isFirstSetup && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Welcome to first-time setup! Create your admin account by setting a password below.
            </p>
          </div>
        )}
        
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
              disabled={isFirstSetup} // Disable username field for first-time setup
              required
            />
            {isFirstSetup && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Default admin username is "admin"
              </p>
            )}
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
              placeholder={isFirstSetup ? "Create a secure password" : "Enter password"}
              className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          {!isFirstSetup && (
            <div className="mb-4">
              <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  name="isReset"
                  checked={credentials.isReset}
                  onChange={handleChange}
                  className="mr-2"
                />
                Reset Password
              </label>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Check this box if you need to reset the admin password.
              </p>
            </div>
          )}
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading 
              ? 'Processing...' 
              : (isFirstSetup 
                  ? 'Create Account' 
                  : (credentials.isReset ? 'Reset & Login' : 'Log In')
                )
            }
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Return to Homepage
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
