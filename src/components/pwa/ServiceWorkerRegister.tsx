'use client';

import { useEffect } from 'react';

export const ServiceWorkerRegister = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Registrar de forma diferida para no afectar el tiempo de carga principal
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[ServiceWorker] Registrado con éxito con scope:', registration.scope);
          })
          .catch((error) => {
            console.error('[ServiceWorker] Error al registrar:', error);
          });
      });
    }
  }, []);

  // Es un componente funcional silencioso (sin UI)
  return null;
};
