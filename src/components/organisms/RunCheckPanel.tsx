import React from 'react';
import { Button } from '@/components/atoms/Button';
import { useUrlStore } from '@/store/useUrlStore';
import dayjs from 'dayjs';

export const RunCheckPanel: React.FC = () => {
  const { isChecking, lastRun, runCheck } = useUrlStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-base-100 p-4 rounded-box shadow-sm mb-6 border border-base-200">
      <div className="text-sm text-gray-600 mb-4 sm:mb-0">
        <span className="font-semibold block sm:inline">Last Run: </span>
        {lastRun ? (
          <span>{dayjs(lastRun).format('DD MMM YYYY, hh:mm A')} (IST)</span>
        ) : (
          <span className="italic">Never</span>
        )}
      </div>
      
      <Button 
        variant="primary" 
        onClick={runCheck} 
        loading={isChecking}
        disabled={isChecking}
        className="w-full sm:w-auto"
      >
        {isChecking ? 'Checking...' : 'Run Check Now'}
      </Button>
    </div>
  );
};
