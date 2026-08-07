'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from '@/components/ui/ErrorStateTemplate';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [isOffline, setIsOffline] = React.useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    console.error('Página de error cargada:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center py-20 mt-16">
        <ErrorStateTemplate
          title={isOffline ? "Sin Conexión" : "Algo salió mal"}
          message={isOffline ? "No pudimos cargar esta sección porque no hay conexión y aún no existe una versión guardada." : "No pudimos cargar esta sección en este momento. Intenta nuevamente en unos segundos."}
          doodleSrc={isOffline ? '/pwa-images/error_offline.png' : '/pwa-images/error_500.png'}
          primaryActionLabel="Intentar nuevamente"
          onPrimaryAction={reset}
          secondaryActionLabel="Volver"
          onSecondaryAction={() => router.back()}
          isGlobal={true}
          isOfflineState={isOffline}
        />
      </div>
      <Footer />
    </main>
  );
}
