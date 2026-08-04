import React from 'react';

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className = '', hasError = false, ...props }, ref) => {
    const baseClasses = "w-full px-4 py-3 bg-white border rounded-xl text-base outline-none transition-all duration-300 text-gray-800";
    const normalClasses = "border-gray-200 focus:border-[#F69222] focus:ring-2 focus:ring-[#F69222]/20";
    const errorClasses = "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";
    
    return (
      <input
        ref={ref}
        className={`${baseClasses} ${hasError ? errorClasses : normalClasses} ${className}`}
        {...props}
      />
    );
  }
);

AuthInput.displayName = 'AuthInput';
