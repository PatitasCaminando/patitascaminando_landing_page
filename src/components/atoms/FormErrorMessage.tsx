import React from 'react';

export interface FormErrorMessageProps {
  message?: string;
  className?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <p className={`text-sm text-red-500 mt-1.5 ${className}`}>
      {message}
    </p>
  );
};
