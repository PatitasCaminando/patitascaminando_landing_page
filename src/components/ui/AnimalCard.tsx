import React from 'react';
import { Animal } from '@/types';
import { Heart, PawPrint, Dog, Cat, Calendar, Ruler } from 'lucide-react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/loading.json';

export const AnimalCard: React.FC<{ 
  animal: Animal;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ animal, index = 0, className, style }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const animalStatusMap: Record<string, { label: string; textClass: string; bgClass: string; iconBgClass: string }> = {
    disponible: { label: 'Adopción disponible', textClass: 'text-[#4CA456]', bgClass: 'bg-[#E6F4EA]', iconBgClass: 'bg-[#4CA456]' },
    en_proceso: { label: 'En proceso', textClass: 'text-[#62D9D9]', bgClass: 'bg-[#EAF4F5]', iconBgClass: 'bg-[#62D9D9]' },
    adoptado: { label: 'Adoptado', textClass: 'text-[#8A969B]', bgClass: 'bg-[#F1F3F4]', iconBgClass: 'bg-[#8A969B]' },
    no_disponible: { label: 'No disponible', textClass: 'text-[#F69222]', bgClass: 'bg-[#FFF7EA]', iconBgClass: 'bg-[#F69222]' },
    archivado: { label: 'Archivado', textClass: 'text-[#8A969B]', bgClass: 'bg-[#F1F3F4]', iconBgClass: 'bg-[#8A969B]' },
  };

  const statusConfig = animalStatusMap[animal.status] || animalStatusMap.no_disponible;

  const getSpeciesIcon = () => {
    switch (animal.category.toLowerCase()) {
      case 'perro':
      case 'perra': return <Dog size={24} className="text-[#153970] shrink-0" />;
      case 'gata':
      case 'gato': return <Cat size={24} className="text-[#153970] shrink-0" />;
      default: return <PawPrint size={24} className="text-[#153970] shrink-0" />;
    }
  };

  const lineColors = ['bg-[#F69222]', 'bg-[#62D9D9]', 'bg-[#153970]', 'bg-[#612758]'];
  const lineColor = lineColors[index % 4];

  return (
    <div 
      className={`group bg-white rounded-[32px] overflow-hidden shadow-patitas-sm hover:shadow-patitas hover:-translate-y-1 transition-all duration-300 flex flex-col border border-[#F1D9BD] ${className || ''}`}
      style={style}
    >
      <div className="relative h-[300px] w-full bg-[#F7E5CF] overflow-hidden">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 bg-[#F7E5CF] animate-pulse" />
        )}
        <img
          src={typeof animal.imageUrl === 'string' ? animal.imageUrl : animal.imageUrl?.src}
          alt={animal.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      </div>
      <div className="relative p-5 pt-8 text-center flex-1 flex flex-col justify-between bg-white">
        
        {/* Floating Badge (Nuestra Labor Style) */}
        <div 
          className={`absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full ${statusConfig.iconBgClass} text-white flex items-center justify-center shadow-sm border-4 border-white z-10 transition-transform duration-300 group-hover:-translate-y-1`}
          title={statusConfig.label}
        >
          <PawPrint size={24} />
        </div>

        <div className="flex-1 flex flex-col items-center w-full px-2">
          <h3 className="text-2xl font-bold text-[#153970] mb-2">{animal.name}</h3>
          <div className={`animal-card-status-divider animal-card-status-divider--${animal.status}`}></div>
          
          <div className="w-full relative mb-4">
            <div className="grid grid-cols-4 w-full gap-2 text-[11px] text-[#5F6B70] font-medium text-center px-0.5">
              <div className="flex flex-col items-center justify-start gap-1.5">
                {getSpeciesIcon()}
                <span className="line-clamp-2 leading-tight">{animal.category}</span>
              </div>
              <div className="flex flex-col items-center justify-start gap-1.5">
                <Calendar size={24} className="text-[#F69222] shrink-0" />
                <span className="line-clamp-2 leading-tight">{animal.age}</span>
              </div>
              <div className="flex flex-col items-center justify-start gap-1.5">
                <Heart size={24} className="text-[#612758] shrink-0" />
                <span className="capitalize line-clamp-2 leading-tight">{animal.sex}</span>
              </div>
              <div className="flex flex-col items-center justify-start gap-1.5">
                <Ruler size={24} className="text-[#62D9D9] shrink-0" />
                <span className="leading-tight line-clamp-2">{animal.size && animal.size !== 'No especificado' ? animal.size.charAt(0).toUpperCase() + animal.size.slice(1).toLowerCase() : 'No especificado'}</span>
              </div>
            </div>
          </div>
          
          <div className={`mb-5 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mx-auto ${statusConfig.textClass} ${statusConfig.bgClass}`}>
            {statusConfig.label}
          </div>
        </div>
        
        <Link 
          href={`/adopciones/${animal.slug}`}
          className="w-full py-3.5 border-2 border-[#FFE2C2] text-[#F69222] font-bold rounded-full hover:border-[#F69222] hover:bg-[#FDF3E7] hover:text-[#D67C14] transition-colors flex items-center justify-center gap-2 mt-auto"
        >
          <PawPrint size={18} /> {animal.cta}
        </Link>
      </div>
    </div>
  );
};
