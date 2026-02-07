"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Failed to load trainer profile</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't load this trainer's information. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
