import React from 'react';
import { BookOpen, FileText } from 'lucide-react';

interface CategoryBreadcrumbProps {
  category: string;
}

export const CategoryBreadcrumb: React.FC<CategoryBreadcrumbProps> = ({ category }) => {
  return (
    <div className="flex items-center gap-2 mb-4 font-semibold">
      <BookOpen size={18} className="text-[#F69222]" />
      <span className="text-[#F69222]">Publicaciones</span>
      <span className="text-[#D9D9D9] mx-1">/</span>
      <span className="text-[#5F6B70]">{category}</span>
    </div>
  );
};
