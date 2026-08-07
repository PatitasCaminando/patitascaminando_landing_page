'use client';

import { useEffect, useRef, useState } from 'react';


export default function PWAInstallWrapper() {
  const [isClient, setIsClient] = useState(false);
  const pwaInstallRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Importar el web component solo en el cliente
    import('@khmyznikov/pwa-install').catch(console.error);
    
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
      ></pwa-install>
    </>
  );
}
