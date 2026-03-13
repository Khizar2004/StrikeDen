"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryData, setRecoveryData] = useState({ username: "", recoveryKey: "", newPassword: "" });
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/auth/check-auth', { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => { if (data.success) router.push('/admin'); })
      .catch(err => console.error('Auth check error:', err));
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleRecoveryChange = (e) => {
    const { name, value } = e.target;
    setRecoveryData(prev => ({ ...prev, [name]: value }));
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
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        if (data.csrfToken) sessionStorage.setItem('csrfToken', data.csrfToken);
        toast.success('Login successful');
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      toast.error('An error occurred during login');
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
        setCredentials({ username: recoveryData.username, password: "" });
      } else {
        setError(data.message || 'Recovery failed');
        toast.error(data.message || 'Recovery failed');
      }
    } catch (err) {
      setError('An error occurred during recovery');
      toast.error('An error occurred during recovery');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecoveryMode = () => {
    setIsRecoveryMode(!isRecoveryMode);
    setError("");
    if (!isRecoveryMode) setRecoveryData(prev => ({ ...prev, username: credentials.username }));
  };

  if (!isMounted) return null;

  const inputClass = "w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(237,235,230,0.1)] text-[#EDEBE6] text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-[rgba(237,235,230,0.3)]";
  const labelClass = "block mb-2 text-xs uppercase tracking-widest font-bold text-[rgba(237,235,230,0.5)]";

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F0F0F" }}>
      <div className="w-full max-w-md px-6">
        {/* Brand */}
        <div className="mb-12 text-center">
          <h1 className="font-display uppercase text-4xl tracking-tight" style={{ color: "#EDEBE6", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#E50914" }}>Strike</span>Den
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: "rgba(237,235,230,0.4)" }}>
            {isRecoveryMode ? "Account Recovery" : "Admin Panel"}
          </p>
        </div>

        {/* Form card */}
        <div className="p-8" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
          {isRecoveryMode ? (
            <form onSubmit={handleRecovery} className="space-y-5">
              <div>
                <label className={labelClass}>Username</label>
                <input type="text" name="username" value={recoveryData.username} onChange={handleRecoveryChange} placeholder="Enter username" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Recovery Key</label>
                <input type="text" name="recoveryKey" value={recoveryData.recoveryKey} onChange={handleRecoveryChange} placeholder="Enter recovery key" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>New Password</label>
                <input type="password" name="newPassword" value={recoveryData.newPassword} onChange={handleRecoveryChange} placeholder="Create a secure password" className={inputClass} required />
                <p className="mt-2 text-xs" style={{ color: "rgba(237,235,230,0.35)" }}>
                  Min 12 characters with uppercase, lowercase, numbers, and special characters
                </p>
              </div>

              {error && <p className="text-sm" style={{ color: "#E50914" }}>{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                style={{ background: "#E50914", color: "#FFFFFF" }}
              >
                {isLoading ? "Processing..." : "Reset Password"}
              </button>

              <button type="button" onClick={toggleRecoveryMode} className="w-full text-center text-xs uppercase tracking-widest transition-colors hover:text-[#EDEBE6]" style={{ color: "rgba(237,235,230,0.4)" }}>
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className={labelClass}>Username</label>
                <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Enter username" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Enter password" className={inputClass} required />
              </div>

              {error && <p className="text-sm" style={{ color: "#E50914" }}>{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                style={{ background: "#E50914", color: "#FFFFFF" }}
              >
                {isLoading ? "Processing..." : "Log In"}
              </button>

              <button type="button" onClick={toggleRecoveryMode} className="w-full text-center text-xs uppercase tracking-widest transition-colors hover:text-[#EDEBE6]" style={{ color: "rgba(237,235,230,0.4)" }}>
                Forgot Password?
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
