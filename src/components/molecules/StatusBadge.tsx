import React from 'react';
import { IndexStatus } from '@/lib/types';
import { Badge } from '@/components/atoms/Badge';

interface StatusBadgeProps {
  status: IndexStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getVariant = (status: IndexStatus) => {
    switch (status) {
      case 'Indexed':
        return 'success';
      case 'Not Indexed':
        return 'error'; // using error for red color
      case 'Invalid':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <Badge variant={getVariant(status)} size="md">
      {status}
    </Badge>
  );
};
