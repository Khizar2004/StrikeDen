"use client";

import Link from "next/link";

export default function AdminSidebar({ activeTab, setActiveTab, handleLogout }) {
  const navItems = [
    { id: "trainers", label: "Trainers" },
    { id: "schedules", label: "Schedule" },
    { id: "offeredClasses", label: "Classes" },
    { id: "offeredPrograms", label: "Programs" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-56 h-full" style={{ background: "#111111", borderRight: "1px solid rgba(237,235,230,0.06)" }}>
        {/* Brand */}
        <div className="px-6 h-16 flex items-center" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
          <span className="font-display uppercase text-lg" style={{ color: "#EDEBE6", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#E50914" }}>S</span>D Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex items-center w-full px-3 py-2.5 text-left text-xs uppercase tracking-widest font-medium transition-colors"
              style={{
                background: activeTab === item.id ? "#E50914" : "transparent",
                color: activeTab === item.id ? "#FFFFFF" : "rgba(237,235,230,0.5)",
              }}
              onMouseEnter={(e) => { if (activeTab !== item.id) e.currentTarget.style.color = "#EDEBE6"; }}
              onMouseLeave={(e) => { if (activeTab !== item.id) e.currentTarget.style.color = "rgba(237,235,230,0.5)"; }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 space-y-1" style={{ borderTop: "1px solid rgba(237,235,230,0.06)" }}>
          <Link
            href="/"
            className="flex items-center w-full px-3 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors"
            style={{ color: "rgba(237,235,230,0.35)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#EDEBE6"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.35)"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors"
            style={{ color: "rgba(237,235,230,0.35)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#E50914"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.35)"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
