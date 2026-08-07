'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CircularShadowImage } from '../atoms/CircularShadowImage';
import { StatusAlert } from '../molecules/StatusAlert';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
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
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-patitas p-6 sm:p-8 md:p-12 transform transition-all duration-300 scale-100 opacity-100 my-auto mx-auto flex flex-col overflow-y-auto max-h-[90vh]"
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

          <h3 className="text-3xl font-extrabold text-[#153970] mb-3 font-brand">Reportar un caso</h3>
          <p className="text-[#5F6B70] leading-relaxed mb-2 max-w-lg mx-auto">
            Si deseas reportar un animalito en situación de riesgo, abandono o extravío, puedes escribirnos directamente por nuestras redes sociales oficiales de Patitas Caminando.
          </p>
          <p className="text-[#F69222] font-semibold text-sm mb-8">
            Una alerta a tiempo puede ayudar a ponerlo a salvo.
          </p>

          <div className="text-left space-y-6">
            
            {/* Tipos de alerta */}
            <div>
              <p className="text-[#5F6B70] text-sm mb-2 font-medium">Tipos de alerta que puedes reportar</p>
              <div className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-700">
                Animal extraviado, animal abandonado o animal en riesgo.
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Puedes indicar uno de estos casos cuando te comuniques con Patitas Caminando por redes sociales.</p>
            </div>

            {/* Información sugerida */}
            <div>
              <p className="text-[#5F6B70] text-sm mb-2 font-medium">Información sugerida para el reporte</p>
              <div className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-700">
                Describe el lugar, referencias cercanas, hora aproximada, estado del animalito y cualquier detalle importante.
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Mientras más clara sea la información, más fácil será orientar o canalizar el caso.</p>
            </div>

            {/* Foto opcional sugerida */}
            <div>
              <p className="text-[#5F6B70] text-sm mb-2 font-medium">Evidencia fotográfica sugerida (Opcional)</p>
              <div className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-700">
                Puedes adjuntar una foto en tu mensaje para facilitar el reconocimiento y la ayuda.
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Una imagen clara ayuda significativamente al equipo y a la comunidad.</p>
            </div>

            {/* Redes sociales */}
            <div>
              <p className="text-[#5F6B70] text-sm mb-2 font-medium">Redes sociales oficiales</p>
              <div className="w-full px-4 py-6 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-6">
                <a href="https://www.facebook.com/PatitasCaminando" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#F69222] text-white rounded-full flex items-center justify-center hover:bg-[#153970] transition-colors" aria-label="Facebook">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://www.instagram.com/patitascaminando5" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#F69222] text-white rounded-full flex items-center justify-center hover:bg-[#153970] transition-colors" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.tiktok.com/@patitascaminando5" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#F69222] text-white rounded-full flex items-center justify-center hover:bg-[#153970] transition-colors" aria-label="TikTok">
                  <FaTiktok size={20} />
                </a>
              </div>
            </div>

            {/* Bloque Informativo */}
            <StatusAlert
              variant="info"
              message="La información de este apartado es referencial. Para reportar un caso, comunícate con Patitas Caminando a través de sus redes sociales oficiales y comparte el tipo de alerta junto con la descripción del caso y fotos si es posible."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
