import React from 'react';
import { SectionTitle } from '../atoms/SectionTitle';

interface ArticleHeaderProps {
  title: string;
  summary: string;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, summary }) => {
  return (
    <header className="mb-6">
      <SectionTitle as="h1" className="mb-4">
        {title}
      </SectionTitle>
      <div className="w-16 h-[4px] bg-[#F69222] mb-6 rounded-full"></div>
      <p className="text-lg md:text-xl text-[#5F6B70] leading-relaxed max-w-2xl">
        {summary}
      </p>
    </header>
  );
};
