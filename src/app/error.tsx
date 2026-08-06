'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from '@/components/ui/ErrorStateTemplate';
import doodle500 from '@/assets/errors/error_500.png';
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

  useEffect(() => {
    console.error('Página de error cargada:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center py-20 mt-16">
        <ErrorStateTemplate
          title="Algo salió mal"
          message="No pudimos cargar esta sección en este momento. Intenta nuevamente en unos segundos."
          doodleSrc={doodle500.src}
          primaryActionLabel="Intentar nuevamente"
          onPrimaryAction={reset}
          secondaryActionLabel="Volver"
          onSecondaryAction={() => router.back()}
          isGlobal={true}
        />
      </div>
      <Footer />
    </main>
  );
}
