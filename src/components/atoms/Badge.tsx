import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: 'orange' | 'petrol' | 'cream';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className = '',
  color = 'orange'
}) => {
  const colors = {
    orange: 'bg-[#FFE2C2] text-[#F69222]',
    petrol: 'bg-[#E1ECEF] text-[#153970]',
    cream: 'bg-white border border-[#F1D9BD] text-[#5F6B70]'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};
