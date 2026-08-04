import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  color?: 'dark' | 'orange' | 'petrol';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  children, 
  as: Tag = 'h2',
  className = '',
  color = 'petrol'
}) => {
  const colors = {
    dark: 'text-[#153970]',
    petrol: 'text-[#153970]', // It's actually a dark petrol green/blue
    orange: 'text-[#F69222]'
  };

  const sizes = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-extrabold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-bold',
    h5: 'text-lg md:text-xl font-bold',
    h6: 'text-base md:text-lg font-bold'
  };

  return (
    <Tag className={`${colors[color]} ${sizes[Tag]} leading-tight ${className}`}>
      {children}
    </Tag>
  );
};
