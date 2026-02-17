import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center sm:text-left">
      <h1 className="text-3xl font-bold bg-clip-text  from-primary to-secondary">
        URL Indexation Checker
      </h1>
      <p className="text-gray-500 mt-2">
        Monitor Google Index status for your URLs. Automated daily checks at 9:00 AM IST.
      </p> 
    </div>
  );
};
