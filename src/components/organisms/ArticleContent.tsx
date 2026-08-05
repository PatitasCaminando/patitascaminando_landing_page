import React from 'react';
import { Container } from '../atoms/Container';
import { Heart, Target, Stethoscope } from 'lucide-react';

import doodlePilaresSeparador from '@/assets/ilustraciones/doodles/about/doodle_about_pilares_separador.png';
import doodleFooterEsquinaDerecho from '@/assets/ilustraciones/doodles/user/doodle_esquinero_inferior_derecho.png';
import doodleFooterEsquinaIzquierdo from '@/assets/ilustraciones/doodles/user/doodle_esquinero_inferior_izquierdo.png';

export const ArticleContent: React.FC<any> = () => {
  const cards = [
    {
      id: 1,
      title: 'Misión',
      content: 'Dar segundas oportunidades a los animales de compañía en condición de vulnerabilidad, ofreciéndoles refugio, atención veterinaria y buscando un nuevo hogar para ellos, involucrando activamente a la comunidad.',
      list: null,
      icon: <Heart size={24} />,
      primaryColor: '#F69222',
      bgIcon: 'bg-[#F69222]',
      textIcon: 'text-white',
      borderCard: 'border-[#F69222]/30'
    },
    {
      id: 2,
      title: 'Visión',
      content: 'Ser una organización que transforma vidas mediante el rescate y la reintegración responsable de animales de compañía, construyendo una sociedad más consciente, solidaria y comprometida con la protección de la fauna urbana.',
      list: null,
      icon: <Target size={24} />,
      primaryColor: '#153970',
      bgIcon: 'bg-[#153970]',
      textIcon: 'text-white',
      borderCard: 'border-[#153970]/20'
    },
    {
      id: 3,
      title: 'Servicios',
      content: null,
      list: [
        { strong: 'Rescate', text: ' de animales de compañía en condiciones de vulnerabilidad.' },
        { strong: 'Refugio temporal', text: ', atención veterinaria y rehabilitación física y socialización.' },
        { strong: 'Eventos de adopción responsable', text: ' y educación al adoptante.' },
        { strong: 'Gestión de turnos de esterilización gratuita', text: ', priorizando familias en situación vulnerable.' },
        { strong: 'Apoyo a animales comunitarios', text: ' con alimento y casitas.' }
      ],
      icon: <Stethoscope size={24} />,
      primaryColor: '#62D9D9',
      bgIcon: 'bg-[#62D9D9]',
      textIcon: 'text-[#153970]',
      borderCard: 'border-[#62D9D9]/30'
    }
  ];

  return (
    <section className="pb-32 md:pb-40 lg:pb-48 bg-white relative overflow-x-clip pt-8">
      {/* Separador Pilares */}
      <div className="w-full flex justify-center mb-16 md:mb-24 opacity-50 pointer-events-none select-none">
        <img 
          src={doodlePilaresSeparador.src} 
          alt="" 
          aria-hidden="true" 
          className="w-[500px] md:w-[600px] lg:w-[800px] xl:w-[1000px] max-w-none object-contain"
        />
      </div>

      {/* Doodle Footer Esquina Izquierda */}
      <img 
        src={doodleFooterEsquinaIzquierdo.src} 
        alt="" 
        aria-hidden="true" 
        className="absolute -bottom-10 md:-bottom-16 lg:-bottom-24 -left-4 md:-left-8 lg:-left-12 w-56 sm:w-72 md:w-80 lg:w-[450px] pointer-events-none select-none z-0"
      />

      {/* Doodle Footer Esquina Derecha */}
      <img 
        src={doodleFooterEsquinaDerecho.src} 
        alt="" 
        aria-hidden="true" 
        className="absolute -bottom-10 md:-bottom-16 lg:-bottom-24 -right-4 md:-right-8 lg:-right-12 w-56 sm:w-72 md:w-80 lg:w-[450px] pointer-events-none select-none z-0"
      />

      <Container size="lg" className="relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#153970]">
            Nuestro propósito institucional
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 lg:gap-x-8 gap-y-14 md:gap-y-8 mt-4 md:mt-0">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`relative bg-white rounded-[32px] pt-12 pb-8 px-8 flex flex-col h-full shadow-patitas-sm hover:shadow-patitas-lg transition-all duration-300 border ${card.borderCard} hover:-translate-y-2 group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)]`}
            >
              {/* Badge Flotante Top-Left */}
              <div className={`absolute -top-7 left-8 w-14 h-14 rounded-full ${card.bgIcon} ${card.textIcon} flex items-center justify-center shadow-sm border-4 border-white z-10 transition-transform duration-300 group-hover:-translate-y-1`}>
                {card.icon}
              </div>

              <h3 className="text-2xl font-extrabold text-[#153970] mb-3">{card.title}</h3>
              
              {/* Línea Acento Corto */}
              <div 
                className="h-1.5 w-12 rounded-full mb-6 transition-all duration-300 group-hover:w-16" 
                style={{ backgroundColor: card.primaryColor }}
              />

              <div className="text-[#5F6B70] leading-[1.7] text-[15px] flex-grow">
                {card.content && <p>{card.content}</p>}
                {card.list && (
                  <ul className="space-y-3 list-disc pl-4 marker:text-[#F1D9BD]">
                    {card.list.map((item, index) => (
                      <li key={index}>
                        <strong className="font-semibold text-[#5F6B70]">{item.strong}</strong>{item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
