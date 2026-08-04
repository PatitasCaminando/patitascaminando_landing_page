'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const targetSection = document.getElementById('donaciones');
      if (targetSection) {
        // Si el tope de la sección 'donaciones' está por encima del fondo de la ventana (es decir, ya entró a la pantalla)
        if (targetSection.getBoundingClientRect().top < window.innerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(window.scrollY > 1500);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 md:bottom-10 md:right-10 p-3 md:p-4 rounded-full bg-white text-[#F69222] border-2 border-[#F69222] shadow-patitas transition-all duration-300 hover:bg-[#FFE2C2] hover:-translate-y-1 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Volver arriba"
    >
      <ArrowUp size={24} />
    </button>
  );
};
