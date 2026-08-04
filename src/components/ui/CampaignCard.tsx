import React from 'react';
import { Campaign } from '@/types';

export const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  return (
    <div className="bg-white rounded-[24px] p-8 shadow-patitas-sm hover:shadow-patitas transition-shadow flex flex-col border border-[#F1D9BD]">
      <div className="inline-block bg-[#FFF2DF] text-[#D67C14] text-sm font-bold px-4 py-1.5 rounded-full mb-5 self-start">
        {campaign.category}
      </div>
      <h3 className="text-xl font-bold text-[#153970] mb-3 leading-tight">{campaign.title}</h3>
      <p className="text-[#5F6B70] mb-6 flex-1">{campaign.description}</p>
      <div className="flex justify-between items-center border-t border-[#F1D9BD] pt-5 mt-auto">
        <span className="text-sm font-semibold text-[#8A969B]">{campaign.dateOrStatus}</span>
        <button className="text-[#F69222] font-bold hover:text-[#D67C14] transition-colors inline-flex items-center">
          Ver campaña <span className="ml-1">&rarr;</span>
        </button>
      </div>
    </div>
  );
};
