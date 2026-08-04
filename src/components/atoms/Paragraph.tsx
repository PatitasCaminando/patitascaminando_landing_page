import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}

export const Paragraph: React.FC<ParagraphProps> = ({ 
  children, 
  className = '',
  size = 'base'
}) => {
  const sizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base md:text-lg leading-relaxed',
    lg: 'text-lg md:text-xl leading-relaxed'
  };

  return (
    <p className={`text-[#5F6B70] ${sizes[size]} ${className}`}>
      {children}
    </p>
  );
};
