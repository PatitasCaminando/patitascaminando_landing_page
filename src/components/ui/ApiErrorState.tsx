'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from './ErrorStateTemplate';
import doodleOffline from '@/assets/errors/error_ofline.png';

interface ApiErrorStateProps {
  onRetry?: () => void;
}

export const ApiErrorState: React.FC<ApiErrorStateProps> = ({ onRetry }) => {
  const router = useRouter();

  return (
    <ErrorStateTemplate
      title="No pudimos conectar con el refugio"
      message="La información no está disponible en este momento. Intenta nuevamente en unos segundos."
      doodleSrc={doodleOffline.src}
      primaryActionLabel="Intentar nuevamente"
      onPrimaryAction={onRetry}
      isGlobal={false}
    />
  );
};
