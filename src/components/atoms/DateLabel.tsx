import React from 'react';
import { Calendar } from 'lucide-react';

interface DateLabelProps {
  date: string;
  className?: string;
}

export const DateLabel: React.FC<DateLabelProps> = ({ date, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 border border-[#F1D9BD] rounded-full px-6 py-2.5 bg-white text-[#153970] text-base font-medium shadow-sm ${className}`}>
      <Calendar size={18} className="text-[#F69222]" />
      <time dateTime={date}>{date}</time>
    </div>
  );
};
