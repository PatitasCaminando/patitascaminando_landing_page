'use client';

import React, { useState, useEffect } from 'react';
import { useInstallPrompt } from '@/hooks/use-install-prompt';
import { useCacheConsent } from '@/hooks/use-cache-consent';
import { Button } from '@/components/ui/Button';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

const INSTALL_MODAL_SHOWN_KEY = 'patitas_install_modal_shown';
const DELAY_AFTER_CACHE_CONSENT_MS = 10000; // 10 segundos

export const PWAInstallModal = () => {
  const { isInstallable, promptToInstall } = useInstallPrompt();
  const { hasAcceptedCache } = useCacheConsent();
  const [showModal, setShowModal] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Solo mostrar en mobile (ancho menor a 768px)
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Detectar si es iOS (Safari)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // Detectar si ya está instalada (Standalone mode) en iOS
    const isStandalone = ('standalone' in navigator) && (navigator as any).standalone;

    // Verificar si ya se mostró (definitivamente) antes
    const hasBeenShown = localStorage.getItem(INSTALL_MODAL_SHOWN_KEY);
    if (hasBeenShown === 'true' || isStandalone) return;

    setIsIOSDevice(isIOS);

    const dismissCount = parseInt(localStorage.getItem('pwa_install_dismiss_count') || '0', 10);
    const nextShowTime = parseInt(localStorage.getItem('pwa_install_next_show_time') || '0', 10);

    // Si ya fue pospuesto antes pero no cancelado definitivamente
    if (dismissCount > 0 && dismissCount < 3) {
      const now = Date.now();
      if (now >= nextShowTime) {
        // Ya pasó el tiempo, mostrar con un pequeño retraso
        const timer = setTimeout(() => setShowModal(true), 3000);
        return () => clearTimeout(timer);
      } else {
        // Aún no pasa el tiempo, programar para lo que falta
        const remainingTime = nextShowTime - now;
        const timer = setTimeout(() => setShowModal(true), remainingTime);
        return () => clearTimeout(timer);
      }
    }

    const handleShowInstall = () => {
      setIsIOSDevice(isIOS);
      setShowModal(true);
    };

    let initialTimer: NodeJS.Timeout | null = null;
    if (dismissCount === 0 && localStorage.getItem('patitas_cache_consent') === 'true') {
      // Si la caché ya fue aceptada en una sesión anterior, disparamos el modal con un retraso de 5 segundos
      initialTimer = setTimeout(() => {
        handleShowInstall();
      }, 5000);
    }

    window.addEventListener('show-pwa-install', handleShowInstall);
    
    return () => {
      if (initialTimer) clearTimeout(initialTimer);
      window.removeEventListener('show-pwa-install', handleShowInstall);
    };
  }, []);

  const [imgError, setImgError] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    
    const dismissCount = parseInt(localStorage.getItem('pwa_install_dismiss_count') || '0', 10);
    
    if (dismissCount < 2) {
      // Pospone para 3 minutos después (máximo 3 veces en total)
      localStorage.setItem('pwa_install_dismiss_count', (dismissCount + 1).toString());
      localStorage.setItem('pwa_install_next_show_time', (Date.now() + 3 * 60 * 1000).toString());
      
      // Programar para esta misma sesión si no recargan la página
      setTimeout(() => {
        setShowModal(true);
      }, 3 * 60 * 1000);
    } else {
      // Ya son 3 veces (0, 1, 2), la cancelamos definitivamente
      localStorage.setItem(INSTALL_MODAL_SHOWN_KEY, 'true');
    }
  };

  const handleInstall = async () => {
    await promptToInstall();
    // Si instaló exitosamente o aceptó el prompt, ya no mostrar nunca más
    localStorage.setItem(INSTALL_MODAL_SHOWN_KEY, 'true');
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
                 src="/pwa-images/ios/apple-touch-icon.png" 
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
          
          {isIOSDevice && (
            <div className="w-full bg-gray-50 rounded-2xl p-4 mb-4 text-left border border-gray-100">
              <p className="text-sm text-[#153970] mb-2 font-bold">Para instalar en iOS:</p>
              <ol className="text-sm text-[#5F6B70] list-decimal pl-4 space-y-2">
                <li>Toca el botón <b>Compartir</b> (el cuadrado con la flecha hacia arriba) en la barra de Safari.</li>
                <li>Desliza hacia abajo y selecciona <b>Agregar a inicio</b>.</li>
                <li>Toca <b>Agregar</b> en la esquina superior.</li>
              </ol>
            </div>
          )}

          {!isIOSDevice && !isInstallable && (
            <div className="w-full bg-gray-50 rounded-2xl p-4 mb-4 text-left border border-gray-100">
              <p className="text-sm text-[#153970] mb-2 font-bold">Para instalar en Android:</p>
              <ol className="text-sm text-[#5F6B70] list-decimal pl-4 space-y-2">
                <li>Toca los <b>3 puntos verticales</b> en la esquina superior derecha de Chrome.</li>
                <li>Selecciona <b>Instalar aplicación</b> o <b>Agregar a la pantalla principal</b>.</li>
                <li>Confirma seleccionando <b>Instalar</b>.</li>
              </ol>
            </div>
          )}
          
          <div className="w-full flex flex-col gap-3">
            {!isIOSDevice && isInstallable && (
              <Button variant="primary" onClick={handleInstall} className="w-full justify-center flex items-center gap-2 py-3.5">
                <Download size={20} />
                Instalar Aplicación
              </Button>
            )}
            <Button variant="outline" onClick={handleClose} className="w-full justify-center text-[#5F6B70] border-transparent hover:bg-gray-50 py-3">
              {isIOSDevice ? 'Entendido' : 'Quizás más tarde'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
