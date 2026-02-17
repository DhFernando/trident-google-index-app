import React from 'react';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
};
