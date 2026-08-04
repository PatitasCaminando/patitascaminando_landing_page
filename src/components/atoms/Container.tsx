import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  size = 'lg'
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl'
  };

  return (
    <div className={`mx-auto px-4 w-full ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};
