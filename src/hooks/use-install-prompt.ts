'use client';

import { useState, useEffect } from 'react';

// Extender la interfaz Window para TypeScript
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir el mini-infobar por defecto de Chrome
      e.preventDefault();
      // Guardar el evento para poder dispararlo luego
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptToInstall = async () => {
    if (!deferredPrompt) {
      return;
    }
    // Mostrar el prompt de instalación
    await deferredPrompt.prompt();
    // Esperar a la decisión del usuario
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // No podemos volver a usar el mismo deferredPrompt
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return { isInstallable, promptToInstall };
}
