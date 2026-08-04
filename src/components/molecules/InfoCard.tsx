import React from 'react';
import { SectionTitle } from '../atoms/SectionTitle';
import { Paragraph } from '../atoms/Paragraph';

interface InfoCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon }) => {
  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-[#F1D9BD] hover:shadow-md transition-shadow duration-300">
      {icon && (
        <div className="shrink-0 rounded-2xl bg-[#FFE2C2] p-3 text-[#F69222] shadow-sm w-max mb-4">
          {icon}
        </div>
      )}
      <SectionTitle as="h4" className="mb-3">
        {title}
      </SectionTitle>
      <Paragraph size="base">
        {content}
      </Paragraph>
    </div>
  );
};
