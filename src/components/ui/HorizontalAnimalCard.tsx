import React from 'react';
import { Animal } from '@/types';
import { PawPrint, Dog, Cat } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const HorizontalAnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
  const getSpeciesIcon = () => {
    switch (animal.category.toLowerCase()) {
      case 'perro':
      case 'perra': return <Dog size={14} className="text-[#8A969B]" />;
      case 'gata':
      case 'gato': return <Cat size={14} className="text-[#8A969B]" />;
      default: return <PawPrint size={14} className="text-[#8A969B]" />;
    }
  }

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-patitas-sm border border-[#F1D9BD] flex w-full h-[220px] shrink-0 hover:-translate-y-1 hover:shadow-patitas transition-all duration-300 mx-auto">
      
      {/* Image Side - slightly adjusted for 1:1 aspect feel */}
      <div className="w-[45%] h-full shrink-0 relative bg-[#F7E5CF]">
        <Image
          src={typeof animal.imageUrl === 'string' ? animal.imageUrl : animal.imageUrl?.src}
          alt={animal.name}
          className="object-cover object-top"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content Side */}
      <div className="w-[55%] p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#153970] mb-1 leading-tight">{animal.name}</h3>
          <div className="flex items-center gap-1.5 mb-2">
            {getSpeciesIcon()}
            <p className="text-[#8A969B] text-[13px] font-medium">
              {animal.category} • {animal.age}
            </p>
          </div>
          <p className="text-[#8A969B] text-xs line-clamp-2 leading-snug">
            {animal.observation || `Descubre a ${animal.name}, está buscando un hogar lleno de amor.`}
          </p>
        </div>

        <Link 
          href={`/adopciones/${animal.slug}`}
          className="w-full py-1.5 border-2 border-[#FFE2C2] text-[#F69222] font-bold text-sm rounded-full hover:border-[#F69222] hover:bg-[#FFF7EA] transition-colors flex items-center justify-center gap-1.5 mt-2"
        >
          <PawPrint size={14} /> {animal.cta}
        </Link>
      </div>

    </div>
  );
};
