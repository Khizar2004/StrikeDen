import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center py-12 md:py-16 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 