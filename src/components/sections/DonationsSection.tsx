import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { StatCard } from '../ui/StatCard';
import { Heart, Utensils, Megaphone, Users } from 'lucide-react';
import doodleVoluntario from '@/assets/ilustraciones/doodles/doodle_voluntario.png';
import doodleCorazones from '@/assets/ilustraciones/doodles/doodle_corazones_esquina_superior_izquierda.png';

export const DonationsSection = () => {
  return (
    <section id="donaciones" className="pt-24 pb-16 px-4 bg-white relative overflow-hidden z-20">
      {/* Decorative doodles */}
      <img
        src={doodleCorazones.src}
        alt=""
        aria-hidden="true"
        className="md:hidden absolute top-0 left-0 w-32 opacity-60 pointer-events-none select-none z-0"
      />
      <img
        src={doodleVoluntario.src}
        alt=""
        aria-hidden="true"
        className="absolute top-[60%] lg:top-[65%] -translate-y-1/2 left-[-10px] lg:left-[-20px] w-[220px] md:w-[280px] lg:w-[360px] xl:w-[400px] opacity-90 pointer-events-none select-none z-0 hidden md:block"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader 
          title="Cómo puedes ayudar" 
          subtitle="Tu apoyo permite alimentar, cuidar, difundir y proteger a animalitos que necesitan una segunda oportunidad." 
        />
        
        <div className="flex justify-center mt-12 mb-10">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
            <StatCard 
              icon={<Utensils size={28} />} 
              value="Dona alimento" 
              label="Alimento seco o húmedo para perritos y gatitos rescatados." 
            />
            <StatCard 
              icon={<Heart size={28} />} 
              value="Insumos de cuidado" 
              label="Cobijas, productos de limpieza, medicinas e implementos básicos para su bienestar." 
            />
            <StatCard 
              icon={<Megaphone size={28} />} 
              value="Difunde" 
              label="Comparte adopciones, alertas y publicaciones educativas para llegar a más personas." 
            />
            <StatCard 
              icon={<Users size={28} />} 
              value="Reporta un caso" 
              label="Ayúdanos a alertar sobre mascotas perdidas, abandonadas o en situación de peligro." 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
