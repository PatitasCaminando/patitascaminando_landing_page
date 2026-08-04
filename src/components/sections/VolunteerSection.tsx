import React from 'react';
import { Button } from '../ui/Button';
import { Users } from 'lucide-react';
import doodleNubes from '@/assets/ilustraciones/doodles/doodle_nubes_superiores_izquieda.png';
import doodleCuerda from '@/assets/ilustraciones/doodles/doodle_cuerda_superior_derecha.png';
import doodlePatitasDerSup from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_derecha_superior.png';
import doodleVoluntario from '@/assets/ilustraciones/doodles/doodle_voluntario.png';
import doodleApadrinar from '@/assets/ilustraciones/doodles/doodle_apadrinar.png';

export const VolunteerSection = () => {
  return (
    <section id="participa" className="py-24 px-4 bg-[#EAF4F5] relative overflow-hidden">
      {/* Decorative doodle nubes */}
      <img
        src={doodleNubes.src}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-16 sm:bottom-auto top-auto sm:top-0 -left-10 sm:left-0 w-48 md:w-56 lg:w-72 opacity-80 pointer-events-none select-none z-0 block"
      />

      {/* Decorative doodle cuerda */}
      <img
        src={doodleCuerda.src}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-[180px] md:w-[280px] lg:w-[380px] opacity-80 pointer-events-none select-none z-0 hidden sm:block"
      />

      {/* Decorative doodle patitas (Mobile only) */}
      <img
        src={doodlePatitasDerSup.src}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-32 opacity-60 pointer-events-none select-none z-0 block sm:hidden"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-patitas flex flex-col justify-center items-start border border-white hover:border-[#6FCF7D] transition-colors relative overflow-hidden group">
          <div className="mt-4 mb-3 relative z-10">
            <img src={doodleVoluntario.src} alt="" className="w-32 md:w-[150px] object-contain" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#153970] mb-4 relative z-10">Hazte Voluntario</h3>
          <p className="text-[#5F6B70] text-lg mb-10 max-w-md relative z-10">
            Dona tu tiempo y habilidades. Necesitamos manos en el refugio, en ferias de adopción y en el área administrativa.
          </p>
          <Button variant="primary" className="bg-[#2A9D8F] hover:bg-[#1f7c71] border-none shadow-none text-white z-10 px-8 relative">
            Quiero ser voluntario
          </Button>
        </div>

        <div className="bg-[#FFF7EA] rounded-[40px] p-10 md:p-14 shadow-patitas flex flex-col justify-center items-start border border-[#F1D9BD] hover:border-[#F69222] transition-colors relative overflow-hidden group">
          <div className="mt-4 mb-3 relative z-10">
            <img src={doodleApadrinar.src} alt="" className="w-32 md:w-[150px] object-contain" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#153970] mb-4 relative z-10">Apadrina un peludito</h3>
          <p className="text-[#5F6B70] text-lg mb-10 max-w-md relative z-10">
            Si no puedes adoptar, el apadrinamiento es ideal. Cubres los gastos básicos de un animalito específico del refugio.
          </p>
          <Button variant="primary" className="z-10 px-8 relative">
            Quiero apadrinar
          </Button>
        </div>

      </div>
    </section>
  );
};
