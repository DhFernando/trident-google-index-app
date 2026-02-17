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
      
      <div className="mt-4 p-4 bg-base-100 rounded-lg text-sm text-gray-500 border border-base-200">
        <p className="font-semibold mb-1">Indexation Verification Logic:</p>
        <p>
          This dashboard currently uses a <span className="font-medium text-warning">simulation</span> for demonstration. 
          Real verification requires Google Search Console API integration. 
          The current logic checks URL format, simulates network latency, and validates known sites (e.g., Google, GitHub) as "Indexed".
        </p>
      </div>
    </div>
  );
};
