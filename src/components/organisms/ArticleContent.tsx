import React from 'react';
import { Container } from '../atoms/Container';
import { InfoCard } from '../molecules/InfoCard';
import { ContentSection } from '@/data/publications';
import { Heart, Target, Info } from 'lucide-react';

import doodlePilaresSeparador from '@/assets/ilustraciones/doodles/about/doodle_about_pilares_separador.png';
import doodleFooterEsquina from '@/assets/ilustraciones/doodles/about/doodle_about_footer_esquina.png';

interface ArticleContentProps {
  sections: ContentSection[];
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ sections }) => {
  const getIconForSection = (iconName?: string) => {
    switch (iconName) {
      case 'heart': return <Heart size={24} />;
      case 'target': return <Target size={24} />;
      default: return <Info size={24} />;
    }
  };

  return (
    <section className="pb-24 bg-white relative overflow-x-clip">
      {/* Separador Pilares */}
      <div className="w-full flex justify-center mb-16 opacity-50 pointer-events-none select-none">
        <img 
          src={doodlePilaresSeparador.src} 
          alt="" 
          aria-hidden="true" 
          className="w-[500px] md:w-[600px] lg:w-[800px] xl:w-[1000px] max-w-none object-contain"
        />
      </div>

      {/* Doodle Footer Esquina */}
      <img 
        src={doodleFooterEsquina.src} 
        alt="" 
        aria-hidden="true" 
        className="absolute -bottom-8 md:-bottom-12 lg:-bottom-24 -right-4 md:-right-12 lg:-right-16 w-64 sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] opacity-60 md:opacity-80 pointer-events-none select-none z-0"
      />

      <Container size="md" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <InfoCard 
              key={index}
              title={section.title}
              content={section.content}
              icon={getIconForSection(section.icon)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
