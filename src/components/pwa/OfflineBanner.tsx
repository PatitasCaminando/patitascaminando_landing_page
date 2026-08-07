'use client';

import React, { useState, useEffect } from 'react';
import { useCacheConsent } from '@/hooks/use-cache-consent';
import { WifiOff, X } from 'lucide-react';

export const OfflineBanner = () => {
  const { hasAcceptedCache } = useCacheConsent();
  const [isOffline, setIsOffline] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Solo registrar eventos en cliente
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => {
      setIsOffline(true);
      setIsVisible(true);
    };

    // Estado inicial
    setIsOffline(!navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Solo mostrar si:
  // 1. Ya aceptó la caché
  // 2. Está offline
  // 3. No lo ha cerrado manualmente en esta sesión
  if (!hasAcceptedCache || !isOffline || !isVisible) {
    return null;
  }

  return (
    <div className="fixed top-[100px] md:top-[120px] left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-2xl mx-auto mt-4 pointer-events-auto bg-[#612758] text-white p-3 md:p-4 rounded-2xl shadow-patitas flex items-center justify-between gap-4 animate-[slideDown_0.3s_ease-out_forwards]">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl shrink-0">
            <WifiOff size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm md:text-base leading-tight mb-0.5">Sin conexión a internet</h4>
            <p className="text-white/80 text-xs md:text-sm">Estás navegando sin conexión. Te mostramos la última información guardada en este dispositivo.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white bg-transparent p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
          aria-label="Cerrar aviso"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
