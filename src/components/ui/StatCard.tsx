import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-patitas-sm flex items-center space-x-4 border border-[#F1D9BD] hover:shadow-patitas transition-shadow">
      <div className="w-16 h-16 rounded-full bg-[#FFF2DF] text-[#F69222] flex items-center justify-center text-3xl shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-[#153970] font-extrabold text-2xl md:text-3xl">{value}</h4>
        <p className="text-[#5F6B70] text-sm font-medium">{label}</p>
      </div>
    </div>
  );
};
