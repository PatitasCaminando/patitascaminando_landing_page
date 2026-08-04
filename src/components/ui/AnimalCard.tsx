import React from 'react';
import { Animal } from '@/types';
import { Heart, CheckCircle2, XCircle, PawPrint, Dog, Cat, Rabbit, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const AnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
  const getBadgeStyle = () => {
    switch (animal.status) {
      case 'Adopción disponible':
        return { bg: 'bg-white/95', text: 'text-[#4CA456]', icon: <CheckCircle2 size={14} className="mr-1" /> };
      case 'Adopción no disponible':
        return { bg: 'bg-white/95', text: 'text-[#E86F61]', icon: <XCircle size={14} className="mr-1" /> };

      default:
        return { bg: 'bg-white/95', text: 'text-[#F69222]', icon: null };
    }
  };

  const getSpeciesIcon = () => {
    switch (animal.category.toLowerCase()) {
      case 'perro':
      case 'perra': return <Dog size={16} className="text-[#8A969B]" />;
      case 'gata':
      case 'gato': return <Cat size={16} className="text-[#8A969B]" />;
      default: return <PawPrint size={16} className="text-[#8A969B]" />;
    }
  }

  const style = getBadgeStyle();

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-patitas-sm hover:shadow-patitas hover:-translate-y-1 transition-all duration-300 flex flex-col border border-[#F1D9BD]">
      <div className="relative h-[340px] w-full bg-[#F7E5CF]">
        <img
          src={typeof animal.imageUrl === 'string' ? animal.imageUrl : animal.imageUrl?.src}
          alt={animal.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center flex-1 flex flex-col justify-between">
        <div>
          <div className={`flex items-center justify-center mb-1 ${style.text} text-sm font-medium`}>
            {style.icon}
            <span className="whitespace-nowrap">{animal.status}</span>
          </div>
          <h3 className="text-2xl font-bold text-[#153970] mb-1">{animal.name}</h3>
          <div className="flex flex-col items-center justify-center gap-1 mb-4">
            <div className="flex items-center gap-2">
              {getSpeciesIcon()}
              <p className="text-[#8A969B] font-medium">{animal.category} • {animal.age}</p>
            </div>
            {animal.sex && (
              <p className="text-[#8A969B] text-sm">{animal.sex}</p>
            )}
          </div>
        </div>
        <Link 
          href={`/adopciones/${animal.slug}`}
          className="w-full py-2.5 border-2 border-[#FFE2C2] text-[#F69222] font-bold rounded-full hover:border-[#F69222] hover:bg-[#FFF7EA] transition-colors flex items-center justify-center gap-2"
        >
          <PawPrint size={16} /> {animal.cta}
        </Link>
      </div>
    </div>
  );
};
