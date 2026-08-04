import React from 'react';
import { SectionTitle } from '../atoms/SectionTitle';
import { Paragraph } from '../atoms/Paragraph';

interface ContentBlockProps {
  title: string;
  content: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ title, content }) => {
  return (
    <div className="mb-12">
      <SectionTitle as="h3" className="mb-4 text-[#153970]">
        {title}
      </SectionTitle>
      <div className="w-12 h-[3px] bg-[#F69222] mb-6"></div>
      <Paragraph size="lg">
        {content}
      </Paragraph>
    </div>
  );
};
