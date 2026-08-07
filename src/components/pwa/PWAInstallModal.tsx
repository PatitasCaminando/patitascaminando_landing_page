'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

export const PWAInstallModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Detectar si es iOS (Safari)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    const handleShowInstall = () => {
      setIsIOSDevice(isIOS);
      setShowModal(true);
    };

    window.addEventListener('show-manual-install', handleShowInstall);
    
    return () => {
      window.removeEventListener('show-manual-install', handleShowInstall);
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-[#153970]/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-[scaleIn_0.3s_ease-out] flex flex-col items-center text-center">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="w-20 h-20 bg-[#FFF7EA] rounded-3xl mb-4 flex items-center justify-center shadow-inner relative overflow-hidden shrink-0">
             {!imgError ? (
               <Image 
                 src="/favicon-rounded.png" 
                 alt="Patitas Caminando" 
                 width={64} 
                 height={64} 
                 className="rounded-xl" 
                 onError={() => setImgError(true)}
               />
             ) : (
               <div className="text-[#F69222]">🐾</div>
             )}
          </div>
          
          <h3 className="text-xl font-extrabold text-[#153970] mb-2 font-brand">
            Instala nuestra App
          </h3>
          <p className="text-[#5F6B70] text-sm mb-6 leading-relaxed">
            Agrega Patitas Caminando a tu pantalla de inicio para un acceso más rápido y mejor experiencia sin conexión.
          </p>
          
          {isIOSDevice ? (
            <div className="w-full bg-gray-50 rounded-2xl p-4 mb-4 text-left border border-gray-100">
              <p className="text-sm text-[#153970] mb-2 font-bold">Para instalar en iOS:</p>
              <ol className="text-sm text-[#5F6B70] list-decimal pl-4 space-y-2">
                <li>Toca el botón <b>Compartir</b> (el cuadrado con la flecha) en la barra inferior de Safari.</li>
                <li>Desliza hacia abajo y selecciona <b>Agregar a inicio</b>.</li>
                <li>Toca <b>Agregar</b> en la esquina superior.</li>
              </ol>
            </div>
          ) : (
            <div className="w-full bg-gray-50 rounded-2xl p-4 mb-4 text-left border border-gray-100">
              <p className="text-sm text-[#153970] mb-2 font-bold">Para instalar en Android:</p>
              <ol className="text-sm text-[#5F6B70] list-decimal pl-4 space-y-2">
                <li>Toca el botón de <b>Opciones</b> (los 3 puntos) en la barra de tu navegador.</li>
                <li>Selecciona <b>Instalar aplicación</b> o <b>Agregar a la pantalla principal</b>.</li>
                <li>Confirma seleccionando <b>Instalar</b> o <b>Añadir</b>.</li>
              </ol>
            </div>
          )}
          
          <div className="w-full flex flex-col gap-3">
            <Button variant="outline" onClick={handleClose} className="w-full justify-center text-[#5F6B70] border-transparent hover:bg-gray-50 py-3">
              Entendido
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
