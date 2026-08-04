'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Lottie from 'lottie-react';
import { Button } from '../ui/Button';
import doodleAlertar from '@/assets/ilustraciones/doodles/alert/doodle_alertar.png';
import successAnimation from '@/assets/lotties/success.json';

export interface AlertSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertSuccessModal: React.FC<AlertSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-patitas p-6 sm:p-8 md:p-12 transform transition-all duration-300 scale-100 opacity-100 my-auto mx-auto text-center overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#153970] transition-colors p-2 bg-gray-50 hover:bg-gray-100 rounded-full z-20"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        {/* Lottie Animation (Background Decoration) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80 flex items-center justify-center">
          <Lottie
            animationData={successAnimation}
            loop={false}
            className="w-full h-full object-cover scale-[1.3]"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex justify-center mb-6 mt-2">
            <img
              src={doodleAlertar.src}
              alt="Reporte exitoso"
              className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-[0_15px_25px_rgba(246,146,34,0.4)]"
            />
          </div>

          <h3 className="text-3xl font-extrabold text-[#153970] mb-4">
            ¡Reporte enviado con éxito!
          </h3>
          
          <p className="text-[#5F6B70] text-lg font-semibold mb-2">
            Tu reporte ha sido enviado correctamente al equipo de Patitas Caminando.
          </p>

          <p className="text-[#5F6B70] text-base mb-8 leading-relaxed max-w-lg mx-auto">
            La organización revisará la información compartida para orientar o canalizar el caso según corresponda.
          </p>

          <Button 
            onClick={onClose} 
            className="w-full text-lg py-4 !bg-[#F69222] hover:!bg-[#E0811B] text-white transition-colors border-none"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
};
