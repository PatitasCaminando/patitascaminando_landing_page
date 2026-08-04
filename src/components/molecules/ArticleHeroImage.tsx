import React from 'react';
import { Image } from '../atoms/Image';
import { StaticImageData } from 'next/image';

interface ArticleHeroImageProps {
  src: string | StaticImageData;
  alt: string;
}

export const ArticleHeroImage: React.FC<ArticleHeroImageProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-patitas mb-8 border-4 border-white">
      <Image 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
        priority 
      />
    </div>
  );
};
