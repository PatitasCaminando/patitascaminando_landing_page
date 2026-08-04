'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthLabel } from '../atoms/AuthLabel';
import { CircularShadowImage } from '../atoms/CircularShadowImage';
import { StatusAlert } from '../molecules/StatusAlert';
import doodleAlertar from '@/assets/ilustraciones/doodles/alert/doodle_alertar.png';

export interface AlertReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertReportModal: React.FC<AlertReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const inputBaseClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-700 cursor-default";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#153970]/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-patitas p-6 sm:p-8 md:p-12 transform transition-all duration-300 scale-100 opacity-100 my-auto mx-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#153970] transition-colors p-2 bg-gray-50 hover:bg-gray-100 rounded-full z-10"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-8 mt-2">
            <CircularShadowImage 
              src={doodleAlertar}
              alt="Reportar un caso"
              shadowColor="orange"
              containerClassName="w-36 h-36 md:w-44 md:h-44"
              imageClassName="w-[105%] translate-y-[0px]"
              width={250}
              height={250}
            />
          </div>

          <h3 className="text-3xl font-extrabold text-[#153970] mb-2">Reportar un caso</h3>
          <p className="text-[#5F6B70] leading-relaxed mb-1">
            Si deseas reportar un animalito en situación de riesgo, abandono o extravío, puedes escribirnos directamente por nuestras redes sociales oficiales de Patitas Caminando.
          </p>
          <p className="text-[#F69222] font-semibold text-sm mb-6">
            No necesitas una cuenta para contactarnos.
          </p>

          <div className="text-left space-y-6">

            {/* Tipo de alerta */}
            <div>
              <AuthLabel htmlFor="tipoAlertaInfo">Tipos de alerta que puedes reportar</AuthLabel>
              <div className={inputBaseClasses}>
                Animal extraviado, animal abandonado o animal en riesgo.
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Puedes indicar uno de estos casos cuando te comuniques con Patitas Caminando por redes sociales.</p>
            </div>

            {/* Descripción */}
            <div>
              <AuthLabel htmlFor="descripcionInfo">Información sugerida para el reporte</AuthLabel>
              <div className={`${inputBaseClasses} min-h-[100px]`}>
                Describe el lugar, referencias cercanas, hora aproximada, estado del animalito y cualquier detalle importante.
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Mientras más clara sea la información, más fácil será orientar o canalizar el caso.</p>
            </div>

            {/* Redes sociales */}
            <div>
              <AuthLabel htmlFor="redesSociales">Redes sociales oficiales</AuthLabel>
              <ul className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 space-y-2">
                <li><strong className="font-semibold text-[#153970]">Facebook:</strong> Patitas Caminando</li>
                <li><strong className="font-semibold text-[#153970]">Instagram:</strong> patitascaminando5</li>
                <li><strong className="font-semibold text-[#153970]">TikTok:</strong> patitascaminando5</li>
              </ul>
            </div>

            {/* Bloque Informativo */}
            <StatusAlert 
              variant="info" 
              message="La información de este apartado es referencial. Para reportar un caso, comunícate con Patitas Caminando a través de sus redes sociales oficiales y comparte el tipo de alerta junto con la descripción del caso." 
            />

            {/* Botones */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full text-lg py-3.5"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
