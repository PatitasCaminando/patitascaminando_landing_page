import React from 'react';

export interface AuthLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const AuthLabel: React.FC<AuthLabelProps> = ({ className = '', children, ...props }) => {
  return (
    <label 
      className={`block text-sm font-medium text-[#5F6B70] mb-1.5 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
