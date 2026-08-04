import React from 'react';
import { SectionTitle } from '../atoms/SectionTitle';
import { Paragraph } from '../atoms/Paragraph';
import { Container } from '../atoms/Container';

import doodleLateralHuellas from '@/assets/ilustraciones/doodles/about/doodle_about_lateral_huellas.png';
import doodleLampara from '@/assets/ilustraciones/doodles/about/doodle_lampara.png';

interface ArticleBodyProps {
  title?: string;
  content?: string[];
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ title, content }) => {
  if (!content || content.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-x-clip">
      
      {/* Doodle Lámpara Colgante */}
      <img 
        src={doodleLampara.src} 
        alt="" 
        aria-hidden="true" 
        className="absolute top-0 -left-4 md:-left-12 lg:-left-16 xl:-left-12 w-48 sm:w-56 md:w-80 lg:w-[320px] xl:w-[400px] opacity-15 md:opacity-40 pointer-events-none select-none z-0"
      />
      
      {/* Lateral Decorativo (Solo Desktop) */}
      <img 
        src={doodleLateralHuellas.src} 
        alt="" 
        aria-hidden="true" 
        className="absolute top-1/4 md:top-1/3 -right-6 md:-right-12 w-56 sm:w-64 md:w-64 lg:w-[320px] xl:w-[400px] opacity-20 md:opacity-30 pointer-events-none select-none z-0"
      />

      <Container size="md" className="relative z-10">
        <div className="max-w-3xl mx-auto">
          {title && (
            <SectionTitle as="h3" className="mb-6 text-[#153970]">
              {title}
            </SectionTitle>
          )}
          
          <div className="space-y-6">
            {content.map((paragraph, index) => (
              <Paragraph key={index} size="lg">
                {paragraph}
              </Paragraph>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
