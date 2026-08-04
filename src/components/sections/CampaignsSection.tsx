import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { CampaignCard } from '../ui/CampaignCard';
import { featuredCampaigns } from '@/data/campaigns';
import doodleCorazones from '@/assets/ilustraciones/doodles/doodle_corazones_esquina_superior_izquierda.png';
import doodlePerritoCampanas from '@/assets/ilustraciones/doodles/doodle_perrito_campañas.png';

export const CampaignsSection = () => {
  return (
    <section id="campanias" className="py-20 px-4 bg-white relative">
      {/* Decorative doodle corazones */}
      <img
        src={doodleCorazones.src}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-0 w-32 md:w-48 lg:w-56 opacity-60 pointer-events-none select-none z-0"
      />

      {/* Decorative doodle perrito asomado */}
      <img
        src={doodlePerritoCampanas.src}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] opacity-30 md:opacity-90 pointer-events-none select-none z-0 block"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader 
          title="Campañas y Eventos" 
          subtitle="Únete a nuestras iniciativas solidarias y marca la diferencia en la vida de cientos de animales." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {featuredCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
};
