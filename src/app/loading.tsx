'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/loading.json';

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-16 py-20">
        
        <div className="mb-4">
          {/* @ts-ignore - Some lottie type issues might appear but it works */}
          <Lottie animationData={loadingAnimation} loop={true} className="w-48 h-48 mx-auto" />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#153970] mb-3">
          Buscando huellitas...
        </h2>
        
        <p className="text-lg text-[#5F6B70] max-w-md mx-auto font-medium">
          Estamos cargando la información de nuestros animalitos.
        </p>

      </div>
      <Footer />
    </main>
  );
}
