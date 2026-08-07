'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Lottie from 'lottie-react';
import { Button } from '../ui/Button';
import { Animal } from '@/types';
import { useRouter } from 'next/navigation';

import doodlePerrito from '@/assets/ilustraciones/doodles/adopt/doodle_perrito_adopcion.png';
import successAnimation from '@/assets/lotties/success.json';

export interface AdoptionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export const AdoptionSuccessModal: React.FC<AdoptionSuccessModalProps> = ({
  isOpen,
  onClose,
  animal,
}) => {
  const router = useRouter();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !animal) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#153970]/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative bg-white w-full max-w-md rounded-[32px] shadow-patitas p-8 md:p-10 transform transition-all duration-300 scale-100 opacity-100 flex flex-col items-center text-center overflow-hidden"
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
            src={doodlePerrito.src}
            alt="Adopción exitosa"
            className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-[0_15px_25px_rgba(246,146,34,0.4)]"
          />
        </div>

          <h3 className="text-3xl font-extrabold text-[#153970] mb-4 font-brand">
            ¡Solicitud enviada con éxito!
          </h3>
          <p className="text-[#5F6B70] text-[17px] mb-8 leading-relaxed">
            Tu solicitud para adoptar a <span className="font-bold text-[#F69222]">{animal.name}</span> ha sido registrada correctamente.<br /><br />
            Ahora el equipo de Patitas Caminando revisará tu información y podrá contactarte por WhatsApp o correo para dar seguimiento al proceso.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                router.push('/');
              }}
              className="w-full text-lg py-4 shadow-sm"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
