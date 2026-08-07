import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { WifiOff } from 'lucide-react';

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
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const shadows = {
    orange: 'shadow-[0_10px_25px_-5px_rgba(246,146,34,0.4)]',
    blue: 'shadow-[0_10px_25px_-5px_rgba(21,57,112,0.4)]',
    green: 'shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)]',
    turquoise: 'shadow-[0_18px_45px_rgba(98,217,217,0.22)]',
    none: 'shadow-none'
  };

  if (hasError || !src) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-full relative overflow-hidden ${containerClassName}`}>
        <WifiOff size={40} className="text-gray-300" />
      </div>
    );
  }

  return (
    <div className={`flex items-end justify-center bg-white rounded-full relative overflow-hidden [transform:translateZ(0)] ${shadows[shadowColor]} ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 rounded-full overflow-hidden">
           <div className="w-full h-full rounded-full bg-gray-200 animate-pulse" />
        </div>
      )}
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        className={`object-contain rounded-full drop-shadow-sm transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
