import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};
