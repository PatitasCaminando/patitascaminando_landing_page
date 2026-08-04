import React from 'react';

export interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#153970] mb-2">{title}</h1>
      <p className="text-[#5F6B70] text-base">{subtitle}</p>
    </div>
  );
};
