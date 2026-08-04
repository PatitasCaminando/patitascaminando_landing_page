import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-[#F69222] text-white hover:bg-[#D67C14] hover:shadow-patitas",
    secondary: "bg-[#FFE2C2] text-[#D67C14] hover:bg-[#F69222] hover:text-white",
    outline: "border-2 border-[#F69222] text-[#F69222] hover:bg-[#F69222] hover:text-white",
    ghost: "text-[#5F6B70] hover:text-[#F69222] hover:bg-[#FFF7EA]"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
