'use client';

import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from '@/components/ui/ErrorStateTemplate';
import doodle500 from '@/assets/errors/error_500.png';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <html lang="es">
      <body className="font-inter font-sans m-0 p-0 antialiased bg-[#FFF7EA]">
        <div className="w-full overflow-x-hidden">
          <main className="min-h-screen flex flex-col justify-center">
          <ErrorStateTemplate
            title="Tuvimos un problema inesperado"
            message="La página no pudo cargarse correctamente. Puedes volver al inicio e intentarlo otra vez."
            doodleSrc={doodle500.src}
            primaryActionLabel="Volver"
            onPrimaryAction={() => router.back()}
            isGlobal={true}
          />
        </main>
        </div>
      </body>
    </html>
  );
}
