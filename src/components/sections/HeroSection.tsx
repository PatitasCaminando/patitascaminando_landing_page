'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { AlertReportModal } from '../organisms/AlertReportModal';
import { AlertSuccessModal } from '../organisms/AlertSuccessModal';
import { AlertErrorModal } from '../organisms/AlertErrorModal';
import { PawPrint, Heart, HeartHandshake, Home } from 'lucide-react';

import dogHeroImg from '@/assets/perritos/perrito4.jpg';
import doodleTopLeft from '@/assets/ilustraciones/doodles/doodle_marca_esquinero_superior_izquierdo.png';
import doodleBottomRight from '@/assets/ilustraciones/doodles/doodle_marca_esquinero_inferior_derecho.png';

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Modal State
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isAlertLoading, setIsAlertLoading] = useState(false);
  const [isAlertSuccessModalOpen, setIsAlertSuccessModalOpen] = useState(false);
  const [isAlertErrorModalOpen, setIsAlertErrorModalOpen] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);
  const [alertFormKey, setAlertFormKey] = useState(0);

  const slides = [
    {
      title: <>Tu ayuda <br /> cambia vidas</>,
      text: 'Cada aporte de alimento, insumos o difusión nos permite seguir rescatando, cuidando y acompañando a animalitos en situación de vulnerabilidad.',
      icon: PawPrint,
      cta: { text: 'Conócenos', href: '#sobre' }
    },
    {
      title: 'Caminamos con la comunidad',
      text: 'Puedes apoyar reportando casos, compartiendo adopciones o coordinando donaciones para perritos y gatitos rescatados.',
      icon: Heart,
    },
    {
      title: 'Adoptar es dar una segunda oportunidad',
      text: 'Cada animal merece una familia responsable, amorosa y comprometida con su bienestar.',
      icon: Home,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
        setIsFading(false);
      }, 400); // tiempo del fade out
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleAlertSubmit = async (data: any) => {
    setIsAlertLoading(true);
    setAlertError(null);
    
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // throw new Error("Test error"); // Descomentar para forzar error en el reporte
      console.log('Reporte enviado', data);
      setIsAlertModalOpen(false);
      setIsAlertSuccessModalOpen(true);
      setAlertFormKey(prev => prev + 1);
    } catch (err) {
      setIsAlertModalOpen(false);
      setIsAlertErrorModalOpen(true);
    } finally {
      setIsAlertLoading(false);
    }
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
    setTimeout(() => {
      setIsAlertSuccessModalOpen(false);
      setAlertError(null);
    }, 300);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[88vh] overflow-hidden bg-[#FFF7EA] px-4 pt-36 pb-24 flex items-center justify-center"
    >
      {/* Decorative Corner Doodles */}
      <img
        src={doodleTopLeft.src}
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-32 md:w-48 lg:w-64 xl:w-72 opacity-60 sm:opacity-80 pointer-events-none select-none z-0 block"
      />

      <img
        src={doodleBottomRight.src}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-32 md:w-48 lg:w-64 xl:w-[320px] opacity-60 md:opacity-80 pointer-events-none select-none z-0 block"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
        {/* Text Content */}
        <div className="relative z-20 w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-[#153970]">
            Cada animal <br className="hidden lg:block" />
            merece una <br className="hidden lg:block" />
            <span className="text-[#F69222]">
              segunda oportunidad
            </span>
          </h1>

          <p className="mx-auto lg:mx-0 mb-10 max-w-xl text-lg md:text-xl leading-relaxed text-[#5F6B70]">
            Rescatamos, cuidamos y acompañamos a animales de compañía en situación de abandono o maltrato, conectándolos con hogares responsables y una comunidad solidaria.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="#adopciones">
              <Button
                variant="primary"
                size="lg"
                className="flex items-center gap-2 px-8 py-4 text-lg shadow-md hover:-translate-y-1 transition-transform"
              >
                <PawPrint size={22} />
                Adoptar
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsAlertModalOpen(true)}
              className="group flex items-center gap-2 px-8 py-4 text-lg bg-white shadow-sm border-[#F1D9BD] hover:border-[#F69222] hover:-translate-y-1 transition-all"
            >
              <HeartHandshake size={22} className="text-[#F69222] group-hover:text-white transition-colors" />
              Reportar un caso
            </Button>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative z-20 w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
          <div className="relative z-10 w-full max-w-[520px] aspect-[4/5] overflow-hidden rounded-tl-[120px] rounded-br-[120px] rounded-tr-[42px] rounded-bl-[42px] border-4 border-white bg-white shadow-patitas">
            <img
              src={dogHeroImg.src}
              alt="Perro feliz rescatado por Patitas Caminando"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Card superpuesta a la imagen */}
          <div className="absolute z-20 -bottom-14 md:-bottom-7 left-1/2 -translate-x-1/2 lg:left-[-32px] lg:translate-x-0 w-full max-w-[290px] sm:max-w-[320px] min-h-[280px] rounded-[40px] border border-[#F1D9BD] bg-white p-6 md:p-8 shadow-patitas hover:-translate-y-2 transition-transform flex flex-col justify-between">
            <div
              className={`flex-1 transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="shrink-0 rounded-2xl bg-[#FFE2C2] p-3 text-[#F69222] shadow-sm">
                  {React.createElement(slides[activeSlide].icon, { size: 28 })}
                </div>

                <h4 className="text-xl font-bold leading-tight text-[#153970]">
                  {slides[activeSlide].title}
                </h4>
              </div>

              <p className="mb-6 leading-relaxed text-[#5F6B70] text-[15px]">
                {slides[activeSlide].text}
              </p>

              {slides[activeSlide].cta && (
                <Link href={slides[activeSlide].cta.href}>
                  <Button variant="primary" size="sm" className="w-full py-3 mb-2">
                    {slides[activeSlide].cta.text}
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'bg-[#F69222] w-4' : 'bg-[#D9D9D9]'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AlertReportModal 
        key={`alert-form-${alertFormKey}`}
        isOpen={isAlertModalOpen}
        onClose={closeAlertModal}
        onSubmit={handleAlertSubmit}
        loading={isAlertLoading}
        error={alertError}
      />

      <AlertSuccessModal 
        isOpen={isAlertSuccessModalOpen}
        onClose={() => setIsAlertSuccessModalOpen(false)}
      />

      <AlertErrorModal 
        isOpen={isAlertErrorModalOpen}
        onRetry={() => {
          setIsAlertErrorModalOpen(false);
          setIsAlertModalOpen(true);
        }}
        onClose={() => setIsAlertErrorModalOpen(false)}
      />
    </section>
  );
};