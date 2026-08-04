'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthInputGroup } from '../molecules/AuthInputGroup';
import doodleRecuperar from '@/assets/ilustraciones/doodles/login/doodle_recuperar_correo.png';

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  loading: boolean;
  success: boolean;
  error: string | null;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  success,
  error,
  defaultEmail = ''
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [validationError, setValidationError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail(defaultEmail);
      setValidationError('');
    }
  }, [isOpen, defaultEmail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setValidationError('El correo electrónico es obligatorio.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Ingresa un correo electrónico válido.');
      return;
    }
    setValidationError('');
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#153970]/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white w-full max-w-md rounded-[32px] shadow-patitas p-8 md:p-10 transform transition-all duration-300 scale-100 opacity-100"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#153970] transition-colors p-2 bg-gray-50 hover:bg-gray-100 rounded-full"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        {success ? (
          // Success State
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-extrabold text-[#153970] mb-4">Revisa tu correo</h3>
            <p className="text-[#5F6B70] text-lg mb-8 leading-relaxed">
              Si el correo ingresado está registrado, recibirás instrucciones para restablecer tu contraseña.
            </p>
            <Button onClick={onClose} className="w-full text-lg py-4">
              Entendido
            </Button>
          </div>
        ) : (
          // Default / Form State
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image 
                src={doodleRecuperar} 
                alt="Recuperar contraseña" 
                width={200} 
                height={200}
                className="object-contain h-40 w-auto"
              />
            </div>
            
            <h3 className="text-3xl font-extrabold text-[#153970] mb-3">Recuperar contraseña</h3>
            <p className="text-[#5F6B70] mb-8 leading-relaxed">
              Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
            </p>

            <form onSubmit={handleSubmit} noValidate className="text-left">
              <AuthInputGroup
                id="resetEmail"
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                type="email"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationError) setValidationError('');
                }}
                error={validationError}
                disabled={loading}
              />

              {error && (
                <div className="flex items-start gap-2 text-red-500 bg-red-50 p-4 rounded-xl mb-6 text-sm mt-4">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-8">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full text-lg py-4"
                >
                  {loading ? 'Enviando...' : 'Enviar instrucciones'}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={onClose}
                  disabled={loading}
                  className="w-full text-lg py-4"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
