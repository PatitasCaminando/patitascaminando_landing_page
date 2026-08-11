'use client';

import { useEffect, useRef, useState } from 'react';


export default function PWAInstallWrapper() {
  const [isClient, setIsClient] = useState(false);
  const pwaInstallRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Importar el web component solo en el cliente
    import('@khmyznikov/pwa-install').catch(console.error);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone || localStorage.getItem('patitas_install_modal_shown') === 'true';
    if (isStandalone) return;

    const triggerShow = () => {
      // Validar si la caché fue aceptada, NUNCA mostrar antes de esto
      if (localStorage.getItem('patitas_cache_consent') !== 'true') return;
      if (localStorage.getItem('patitas_install_modal_shown') === 'true') return;

      // Check if device is mobile or tablet, do not show on desktop browsers
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (!isMobile) return;

      if (pwaInstallRef.current) {
        // Envolver en try-catch por precaución
        try { pwaInstallRef.current.showDialog(); } catch (e) {}
        
        const currentCount = parseInt(localStorage.getItem('pwa_install_dismiss_count') || '0', 10);
        localStorage.setItem('pwa_install_dismiss_count', (currentCount + 1).toString());
        localStorage.setItem('pwa_install_next_show_time', (Date.now() + 2 * 60 * 1000).toString());
        
        if (currentCount + 1 >= 3) {
           localStorage.setItem('patitas_install_modal_shown', 'true');
        } else {
           setTimeout(triggerShow, 2 * 60 * 1000); // Siguiente intento en 2 min
        }
      }
    };

    const handleShowInstall = () => {
      // Se llama justo cuando el usuario hace clic en "Entendido" en la caché
      setTimeout(triggerShow, 500); 
    };

    const handleSuccess = () => {
      localStorage.setItem('patitas_install_modal_shown', 'true');
    };

    const handleFail = () => {
      window.dispatchEvent(new Event('show-manual-install'));
    };

    window.addEventListener('show-pwa-install', handleShowInstall);
    window.addEventListener('pwa-install-success-event', handleSuccess);
    window.addEventListener('pwa-install-fail-event', handleFail);

    // Si ya aceptó en el pasado, checar si hay intentos pendientes
    if (localStorage.getItem('patitas_cache_consent') === 'true') {
      const dismissCount = parseInt(localStorage.getItem('pwa_install_dismiss_count') || '0', 10);
      const nextShowTime = parseInt(localStorage.getItem('pwa_install_next_show_time') || '0', 10);
      
      if (dismissCount === 0) {
         // Si nunca se mostró (aceptó pero recargó antes de los 500ms)
         setTimeout(triggerShow, 5000);
      } else if (dismissCount < 3) {
         const now = Date.now();
         if (now >= nextShowTime) {
            setTimeout(triggerShow, 3000);
         } else {
            setTimeout(triggerShow, nextShowTime - now);
         }
      }
    }

    return () => {
      window.removeEventListener('show-pwa-install', handleShowInstall);
      window.removeEventListener('pwa-install-success-event', handleSuccess);
      window.removeEventListener('pwa-install-fail-event', handleFail);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>
      <pwa-install
        ref={pwaInstallRef}
        manifest-url="/manifest.json"
        name="Patitas Caminando"
        description="Agrega Patitas Caminando a tu pantalla de inicio para un acceso más rápido y mejor experiencia sin conexión."
        icon="/favicon-rounded.png"
        manual-apple="true"
        manual-chrome="true"
      ></pwa-install>
    </>
  );
}
