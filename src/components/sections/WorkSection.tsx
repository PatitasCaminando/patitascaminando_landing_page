import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { HeartHandshake, Users, PawPrint } from 'lucide-react';
import doodleDog from '@/assets/ilustraciones/doodles/doodle_perrito_derecho.png';
import doodleCat from '@/assets/ilustraciones/doodles/doodle_gatito_izquierdo.png';
import marca1 from '@/assets/perritos/marca1.png';
import marca2 from '@/assets/perritos/marca2.png';
import marca3 from '@/assets/perritos/marca3.png';

export const WorkSection = () => {
  const cards = [
    {
      id: 1,
      image: marca1.src,
      title: 'Responsabilidad Social',
      description: 'Promovemos la empatía, la adopción responsable y la participación activa de la comunidad para construir una sociedad más consciente y comprometida con la protección de la fauna urbana.',
      icon: <HeartHandshake size={24} />,
      primaryColor: '#153970',
      secondaryColor: '#F69222',
      bgIcon: 'bg-[#153970]',
      textIcon: 'text-white',
      borderCard: 'border-[#153970]/20'
    },
    {
      id: 2,
      image: marca2.src,
      title: 'Acción Colaborativa',
      description: 'Unimos esfuerzos con voluntarios, adoptantes, profesionales y la comunidad, porque cada aporte cuenta y cada mano extendida ayuda a transformar vidas.',
      icon: <Users size={24} />,
      primaryColor: '#F69222',
      secondaryColor: '#62D9D9',
      bgIcon: 'bg-[#F69222]',
      textIcon: 'text-white',
      borderCard: 'border-[#F69222]/30'
    },
    {
      id: 3,
      image: marca3.src,
      title: 'Bienestar Animal',
      description: 'Protegemos la integridad física y emocional de los animales, brindándoles atención, respeto y un entorno seguro mientras encuentran un hogar definitivo.',
      icon: <PawPrint size={24} />,
      primaryColor: '#62D9D9',
      secondaryColor: '#153970',
      bgIcon: 'bg-[#62D9D9]',
      textIcon: 'text-[#153970]',
      borderCard: 'border-[#62D9D9]/30'
    }
  ];

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
          subtitle="Trabajamos junto a la comunidad para promover el cuidado, la protección y las segundas oportunidades para animales de compañía." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-10 lg:gap-y-8 mt-12">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`bg-white rounded-[32px] overflow-hidden shadow-patitas-sm hover:shadow-patitas-lg transition-all duration-300 border ${card.borderCard} hover:-translate-y-2 flex flex-col h-full group`}
            >
              {/* Imagen Protagonista */}
              <div className="relative w-full h-56 sm:h-64 bg-[#FDF3E7] shrink-0">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Contenido con Badge Flotante */}
              <div className="relative pt-10 pb-8 px-8 flex flex-col flex-grow text-left bg-white">
                
                {/* Badge Flotante en la intersección de imagen y contenido */}
                <div className={`absolute -top-7 left-8 w-14 h-14 rounded-full ${card.bgIcon} ${card.textIcon} flex items-center justify-center shadow-sm border-4 border-white z-10 transition-transform duration-300 group-hover:-translate-y-1`}>
                  {card.icon}
                </div>

                <h3 className="text-2xl font-extrabold text-[#153970] mb-3">{card.title}</h3>
                
                {/* Línea Acento Corto */}
                <div 
                  className="h-1.5 w-12 rounded-full mb-4 transition-all duration-300 group-hover:w-16" 
                  style={{ backgroundColor: card.primaryColor }}
                />

                <p className="text-[#5F6B70] leading-[1.7] text-[15px] flex-grow">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
