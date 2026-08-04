'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import perrito7 from '@/assets/perritos/perrito7.jpg';
import doodleCorazon from '@/assets/ilustraciones/doodles/doodle_corazon.png';
import doodleHuesitos from '@/assets/ilustraciones/doodles/doodle_huesitos.png';

export const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto relative">
        <img 
          src={doodleHuesitos.src} 
          alt="" 
          aria-hidden="true" 
          className="hidden md:block absolute -top-4 lg:-top-4 left-0 lg:-left-12 w-24 md:w-32 lg:w-48 opacity-80 pointer-events-none select-none z-0 rotate-12"
        />
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#153970] mb-4">
            Sobre Patitas Caminando
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-[#F1D9BD]"></div>
            <Heart size={20} className="text-[#F69222] fill-current" />
            <div className="h-[2px] w-12 bg-[#F1D9BD]"></div>
          </div>
          <p className="text-lg text-[#5F6B70] max-w-2xl mx-auto">
            Una labor construida con amor, comunidad y segundas oportunidades.
          </p>
        </div>
        
        <div className="relative mt-12 bg-[#FFF7EA] p-8 md:p-12 rounded-[60px] border border-[#F1D9BD] shadow-sm">
          <img 
            src={doodleCorazon.src} 
            alt="" 
            aria-hidden="true" 
            className="absolute bottom-10 right-8 md:right-16 w-24 md:w-32 opacity-70 pointer-events-none -rotate-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="order-2 md:order-1 relative w-full h-[350px] md:h-[450px] rounded-[40px] overflow-hidden shadow-patitas">
              <img 
                src={perrito7.src} 
                alt="Caminamos por segundas oportunidades" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#153970] mb-4">
                Caminamos por segundas oportunidades
              </h3>
              <div className="w-12 h-[3px] bg-[#F69222] mb-6"></div>
              <p className="text-lg text-[#5F6B70] mb-8 leading-relaxed">
                Patitas Caminando fue creada en febrero de 2023 con el propósito de cambiar el destino de animales de compañía que han sido olvidados, abandonados o maltratados. Desde entonces, su labor se centra en rescatar, cuidar, rehabilitar y buscar hogares responsables para quienes más lo necesitan.
              </p>
              <Link href="/publicaciones/sobre-patitas-caminando" className="text-[#F69222] font-bold border-b-2 border-[#F69222] pb-1 hover:text-[#D67C14] hover:border-[#D67C14] transition-colors inline-flex items-center gap-2 group">
                Conoce nuestra historia <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
