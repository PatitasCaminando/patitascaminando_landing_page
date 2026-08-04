import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import imagotipoTransparente from '@/assets/logos/imagotipo/09_imagotipo_color_primario_transparente.png';

export interface AuthIllustrationPanelProps {
  title: string;
  subtitle: string;
  image: StaticImageData | string;
}

export const AuthIllustrationPanel: React.FC<AuthIllustrationPanelProps> = ({ title, subtitle, image }) => {
  return (
    <div className="flex-1 flex flex-col h-full relative z-10 text-white">
      {/* Decorative Dots (CSS) */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
        backgroundSize: '16px 16px'
      }}></div>

      <div className="mb-8 self-start z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-[#F69222] px-4 py-2 rounded-full font-bold transition-all shadow-sm hover:shadow-md text-sm md:text-base border border-white/50"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Inicio
        </Link>
      </div>

      <div className="mb-10 z-10 relative">
        <Image 
          src={imagotipoTransparente} 
          alt="Patitas Caminando" 
          width={180} 
          height={180} 
          className="object-contain brightness-0 invert" 
        />
      </div>
      
      <div className="mb-8 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{title}</h2>
        <p className="text-white/90 text-lg leading-relaxed max-w-md">{subtitle}</p>
      </div>

      <div className="mt-auto flex-1 flex items-end justify-center relative -mx-4 md:-mx-12 -mb-8 md:-mb-12">
        <Image 
          src={image} 
          alt="Ilustración de Patitas Caminando" 
          width={600}
          height={500}
          className="object-contain w-[90%] md:w-full h-auto max-h-[400px] md:max-h-[500px]"
          priority
        />
      </div>
    </div>
  );
};
