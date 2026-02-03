"use client";   //Displays all existing programs (right side)

/**
 * Component to display a list of offered programs
 */
export default function ProgramsList({ programs, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading programs...</p>
        </div>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No programs added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Offered Programs</h3>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program._id} className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {program.image && (
                <div className="w-24 h-24 shrink-0">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{program.title}</h4>
                  <div className="flex items-center">
                    <a
                      href={`/admin/programs/${program._id}`}
                      className="p-1.5 rounded-full text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none transition-colors mr-2"
                      aria-label="Edit program"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </a>
                  <button
                    onClick={() => onDelete(program._id)}
                      className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none transition-colors"
                    aria-label="Delete program"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  </div>
                </div>

                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-md">
                  {program.shortDescription || 'No description provided'}
                </p>
                {program.pricing && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {program.pricing.walkIn > 0 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                        Walk-in: ₨{program.pricing.walkIn.toLocaleString()}
                      </span>
                    )}
                    {program.pricing.weekly > 0 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                        Weekly: ₨{program.pricing.weekly.toLocaleString()}
                      </span>
                    )}
                    {program.pricing.monthly > 0 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                        Monthly: ₨{program.pricing.monthly.toLocaleString()}
                      </span>
                    )}
                    {program.pricing.annual > 0 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                        Annual: ₨{program.pricing.annual.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
