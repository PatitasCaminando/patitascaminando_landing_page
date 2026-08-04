import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95';
  
  const variants = {
    primary: 'bg-[#F69222] text-white hover:bg-[#D67C14]',
    outline: 'bg-white border border-[#F1D9BD] text-[#F69222] hover:border-[#F69222] hover:text-white hover:bg-[#F69222]',
    ghost: 'bg-transparent text-[#5F6B70] hover:bg-[#FFE2C2] hover:text-[#F69222] shadow-none hover:shadow-none'
  };

  const sizes = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
