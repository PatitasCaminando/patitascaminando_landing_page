'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Animal } from '@/types';
import { HorizontalAnimalCard } from '../ui/HorizontalAnimalCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const RelatedAnimalsSlider: React.FC<{ animals: Animal[] }> = ({ animals }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const showSlider = animals.length > 3;

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth > 768 ? 380 : container.clientWidth;
      
      // If we're at the end, jump to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth > 768 ? 380 : container.clientWidth;
      
      // If we're at the beginning, jump to end
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (!showSlider || isHovered) return;

    const intervalId = setInterval(scrollNext, 4000);
    return () => clearInterval(intervalId);
  }, [showSlider, isHovered]);

  if (!showSlider) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto">
        {animals.map(a => (
          <HorizontalAnimalCard key={a.id} animal={a} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className="relative flex items-center justify-center w-full max-w-7xl mx-auto group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsHovered(false), 2000);
      }}
    >
      <button 
        onClick={scrollPrev}
        className="absolute left-0 lg:-left-6 z-10 bg-white border border-[#F1D9BD] text-[#153970] p-2.5 rounded-full shadow-sm hover:bg-[#FFF7EA] hover:text-[#F69222] transition-colors hidden md:block"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 py-4 px-4 max-w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scroll-smooth::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {animals.map(a => (
          <div key={a.id} className="snap-center shrink-0 w-[85vw] sm:w-[420px]">
            <HorizontalAnimalCard animal={a} />
          </div>
        ))}
      </div>

      <button 
        onClick={scrollNext}
        className="absolute right-0 lg:-right-6 z-10 bg-white border border-[#F1D9BD] text-[#153970] p-2.5 rounded-full shadow-sm hover:bg-[#FFF7EA] hover:text-[#F69222] transition-colors hidden md:block"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
