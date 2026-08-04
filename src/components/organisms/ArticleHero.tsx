import React from 'react';
import { ArticleHeader } from '../molecules/ArticleHeader';
import { ArticleMeta } from '../molecules/ArticleMeta';
import { CategoryBreadcrumb } from '../molecules/CategoryBreadcrumb';
import { Container } from '../atoms/Container';
import { Image as AtomImage } from '../atoms/Image';
import { StaticImageData } from 'next/image';

import doodleAboutHeroHuesitos from '@/assets/ilustraciones/doodles/about/doodle_about_hero_huesitos_huellas.png';

interface ArticleHeroProps {
  title: string;
  summary: string;
  date: string;
  image: string | StaticImageData;
  category: string;
}

export const ArticleHero: React.FC<ArticleHeroProps> = ({ title, summary, date, image, category }) => {
  return (
    <section className="relative overflow-hidden bg-[#FFF7EA] pt-32 pb-16 md:pt-40 md:pb-24 w-full">
      {/* Decorative Corner Doodles (Expanded) */}
      <img 
        src={doodleAboutHeroHuesitos.src} 
        alt="" 
        aria-hidden="true" 
        className="absolute -top-12 md:-top-24 lg:-top-32 -left-12 md:-left-24 lg:-left-32 w-64 sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] opacity-30 pointer-events-none select-none z-0 block"
      />

      <Container size="lg" className="relative z-10">
        <div className="w-full relative">
          


          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center relative z-10">
            
            {/* MOBILE ONLY: Title and Summary (appears before image) */}
            <div className="w-full block lg:hidden order-1">
              <CategoryBreadcrumb category={category} />
              <ArticleHeader title={title} summary={summary} />
            </div>

            {/* Content (Left in desktop, order-3 in mobile) */}
            <div className="w-full lg:w-[55%] xl:w-1/2 order-3 lg:order-1 relative flex flex-col justify-center">
              {/* DESKTOP ONLY: Title and Summary */}
              <div className="hidden lg:block">
                <CategoryBreadcrumb category={category} />
                <ArticleHeader title={title} summary={summary} />
              </div>
              
              {/* Metadata and Share (Appears at the bottom of the column in desktop, or after image in mobile) */}
              <div className="lg:mt-4 pt-6 border-t border-[#F1D9BD]/60">
                <ArticleMeta date={date} title={title} text={summary} />
              </div>


            </div>

            {/* Image (Right in desktop, order-2 in mobile) */}
            <div className="w-full lg:w-[45%] xl:w-1/2 order-2 lg:order-2 relative">
              <div className="w-full h-[350px] sm:h-[450px] lg:h-[480px] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-patitas relative border-4 border-white">
                <AtomImage 
                  src={image} 
                  alt={`Imagen destacada de ${title}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  priority 
                />
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};
