import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { workAreas } from '@/data/workAreas';
import { Ambulance, Utensils, Stethoscope, Home, BookOpen, Heart } from 'lucide-react';
import doodleDog from '@/assets/ilustraciones/doodles/doodle_perrito_derecho.png';
import doodleCat from '@/assets/ilustraciones/doodles/doodle_gatito_izquierdo.png';

export const WorkSection = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'rescue': return <Ambulance size={28} />;
      case 'food': return <Utensils size={28} />;
      case 'medical': return <Stethoscope size={28} />;
      case 'adoption': return <Home size={28} />;
      case 'education': return <BookOpen size={28} />;
      default: return <Heart size={28} />;
    }
  };

  return (
    <section id="labor" className="relative pt-20 pb-[22rem] md:pb-36 px-4 bg-[#FFF7EA] overflow-hidden">
      {/* Gatito Izquierdo */}
      <img 
        src={doodleCat.src} 
        alt="" 
        aria-hidden="true"
        className="absolute bottom-0 left-0 md:-left-[2%] w-[160px] sm:w-[250px] md:w-[350px] lg:w-[420px] opacity-60 md:opacity-90 pointer-events-none select-none z-0" 
      />
      
      {/* Perrito Derecho */}
      <img 
        src={doodleDog.src} 
        alt="" 
        aria-hidden="true"
        className="absolute bottom-0 right-0 md:-right-[2%] w-[160px] sm:w-[250px] md:w-[350px] lg:w-[420px] opacity-60 md:opacity-90 pointer-events-none select-none z-0" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader 
          title="Nuestra Labor" 
          subtitle="Trabajamos en diferentes frentes para proteger, cuidar y acompañar a los animales de compañía que necesitan una segunda oportunidad." 
        />
        
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {workAreas.map((area) => (
            <div 
              key={area.id} 
              className="bg-white p-8 rounded-[32px] shadow-patitas-sm hover:shadow-patitas transition-all border border-[#F1D9BD] hover:-translate-y-1 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[360px] flex flex-col items-start text-left"
            >
              <div className="w-16 h-16 bg-[#FFF2DF] text-[#F69222] flex items-center justify-center rounded-[20px] mb-6 shadow-sm">
                {getIcon(area.iconType)}
              </div>
              <h3 className="text-xl font-bold text-[#153970] mb-3">{area.title}</h3>
              <p className="text-[#5F6B70] leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

