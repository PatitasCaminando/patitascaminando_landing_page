'use client';

import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from '@/components/ui/ErrorStateTemplate';
import doodle404 from '@/assets/errors/error_404.png';
import doodleInferiorIzquierdo from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_inferior_derecha.png';
import doodleInferiorDerecho from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_superior_derecha.png';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center py-20 mt-16 relative">
        {/* Esquinero Inferior Izquierdo (cerca del footer) */}
        <img 
          src={doodleInferiorIzquierdo.src} 
          alt="" 
          aria-hidden="true"
          className="absolute -bottom-10 md:-bottom-16 lg:-bottom-24 -left-6 md:-left-10 lg:-left-14 w-32 md:w-48 lg:w-72 z-0 pointer-events-none" 
        />
        {/* Esquinero Inferior Derecho (cerca del footer) */}
        <img 
          src={doodleInferiorDerecho.src} 
          alt="" 
          aria-hidden="true"
          className="absolute -bottom-8 md:-bottom-12 lg:-bottom-16 -right-6 md:-right-10 lg:-right-14 w-40 md:w-64 lg:w-96 z-0 pointer-events-none" 
        />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          <ErrorStateTemplate
            title="Esta huellita no nos llevó a ningún lugar"
            message="La página que buscas no existe o ya no está disponible."
            doodleSrc={doodle404.src}
            primaryActionLabel="Volver"
            onPrimaryAction={() => router.back()}
            isGlobal={true}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
