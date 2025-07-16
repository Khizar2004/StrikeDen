"use client";

/**
 * Admin sidebar component with navigation links
 */
export default function AdminSidebar({ activeTab, setActiveTab, handleLogout }) {
  const navItems = [
    { id: "trainers", label: "Manage Trainers" },
    { id: "schedules", label: "Class Schedule" },
    { id: "offeredClasses", label: "Offered Classes" },
    { id: "settings", label: "Site Settings" },
  ];

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">StrikeDen Admin</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === item.id 
                  ? "bg-red-600 text-white font-medium" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 mt-6 text-left rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
} 