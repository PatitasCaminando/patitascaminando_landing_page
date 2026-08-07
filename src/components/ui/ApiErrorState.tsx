'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from './ErrorStateTemplate';
import doodleOffline from '@/assets/errors/error_ofline.png';

interface ApiErrorStateProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export const ApiErrorState: React.FC<ApiErrorStateProps> = ({ onRetry, title, message }) => {
  const router = useRouter();

  return (
    <ErrorStateTemplate
      title={title || "No pudimos conectar con el refugio"}
      message={message || "La información no está disponible en este momento. Intenta nuevamente en unos segundos."}
      doodleSrc={doodleOffline.src}
      primaryActionLabel="Intentar nuevamente"
      onPrimaryAction={onRetry}
      isGlobal={false}
      isOfflineState={title === "Sin conexión"}
    />
  );
};
