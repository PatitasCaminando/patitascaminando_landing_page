import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#153970] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#5F6B70] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
