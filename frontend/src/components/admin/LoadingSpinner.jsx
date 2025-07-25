import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <RefreshCw className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

export default LoadingSpinner;
