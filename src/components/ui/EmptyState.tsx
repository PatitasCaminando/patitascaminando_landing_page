'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ErrorStateTemplate } from './ErrorStateTemplate';
import doodle404 from '@/assets/errors/error_404.png';
import doodleGeneric from '@/assets/errors/error_generic.png';

interface EmptyStateProps {
  type?: 'filters' | 'catalog';
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type = 'filters', onClearFilters }) => {
  const router = useRouter();

  if (type === 'catalog') {
    return (
      <ErrorStateTemplate
        title="Aún no hay animalitos visibles"
        message="Pronto se agregarán nuevos perfiles al catálogo de adopción."
        doodleSrc={doodleGeneric.src}
        doodleClassName="w-80 sm:w-96 md:w-[26rem] lg:w-[30rem] xl:w-[36rem] max-w-full drop-shadow-sm pointer-events-none -mb-10 md:-mb-14 lg:-mb-20"
        isGlobal={false}
      />
    );
  }

  // Default: filters
  return (
    <ErrorStateTemplate
      title="No encontramos animalitos con esos filtros"
      message="Prueba cambiando la especie, el sexo o el rango de edad."
      doodleSrc={doodleGeneric.src}
      doodleClassName="w-80 sm:w-96 md:w-[26rem] lg:w-[30rem] xl:w-[36rem] max-w-full drop-shadow-sm pointer-events-none -mb-10 md:-mb-14 lg:-mb-20"
      primaryActionLabel="Limpiar filtros"
      onPrimaryAction={onClearFilters}
      isGlobal={false}
    />
  );
};
