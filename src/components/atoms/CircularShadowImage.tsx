import React from 'react';
import Image, { StaticImageData } from 'next/image';

export type ShadowColorVariant = 'orange' | 'blue' | 'green' | 'turquoise' | 'none';

export interface CircularShadowImageProps {
  src: string | StaticImageData;
  alt: string;
  shadowColor?: ShadowColorVariant;
  containerClassName?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
}

export const CircularShadowImage: React.FC<CircularShadowImageProps> = ({
  src,
  alt,
  shadowColor = 'orange',
  containerClassName = '',
  imageClassName = '',
  width = 300,
  height = 300
}) => {
  const shadows = {
    orange: 'shadow-[0_10px_25px_-5px_rgba(246,146,34,0.4)]',
    blue: 'shadow-[0_10px_25px_-5px_rgba(21,57,112,0.4)]',
    green: 'shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)]',
    turquoise: 'shadow-[0_18px_45px_rgba(98,217,217,0.22)]',
    none: 'shadow-none'
  };

  return (
    <div className={`flex items-end justify-center bg-white rounded-full relative overflow-hidden ${shadows[shadowColor]} ${containerClassName}`}>
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        className={`object-contain drop-shadow-sm ${imageClassName}`}
      />
    </div>
  );
};
