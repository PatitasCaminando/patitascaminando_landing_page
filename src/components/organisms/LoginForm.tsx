'use client';

import React, { useState } from 'react';
import { AuthInputGroup } from '../molecules/AuthInputGroup';
import { Button } from '../ui/Button';
import { AuthSwitchLink } from '../molecules/AuthSwitchLink';
import { AuthFormHeader } from '../molecules/AuthFormHeader';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { PawPrint, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Inicio de sesión exitoso (mock)', formData);
      // Lógica de Supabase Auth
    }
  };

  const handleForgotPassword = (email: string) => {
    setIsResetLoading(true);
    setResetError(null);
    
    // Simular API Call
    setTimeout(() => {
      // Para probar el error, podrías cambiar este if
      if (email === 'error@correo.com') {
        setResetError('No pudimos procesar tu solicitud en este momento. Inténtalo nuevamente.');
        setIsResetLoading(false);
      } else {
        setIsResetSuccess(true);
        setIsResetLoading(false);
      }
    }, 1500);
  };

  const closeResetModal = () => {
    setIsModalOpen(false);
    // Reiniciar estados después de que la animación termine
    setTimeout(() => {
      setIsResetSuccess(false);
      setResetError(null);
    }, 300);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <AuthFormHeader 
        title="Iniciar sesión" 
        subtitle="Ingresa a tu cuenta para continuar." 
      />

      <form onSubmit={handleSubmit} noValidate>
        <AuthInputGroup
          id="correo"
          label="Correo electrónico *"
          placeholder="juan.perez@ejemplo.com"
          type="email"
          icon={<Mail size={18} />}
          value={formData.correo}
          onChange={handleChange}
          error={errors.correo}
        />

        <AuthInputGroup
          id="password"
          label="Contraseña *"
          placeholder="••••••••"
          type="password"
          icon={<Lock size={18} />}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between mt-2 mb-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-[#5F6B70] hover:text-[#153970] transition-colors">
            <input 
              type="checkbox" 
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-[#F69222] focus:ring-[#F69222] cursor-pointer"
            />
            Recordar mi sesión en este navegador
          </label>
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="text-[#F69222] font-semibold hover:text-[#D67C14] hover:underline transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="mt-6">
          <Button type="submit" className="w-full text-lg group">
            <PawPrint size={20} className="mr-2" />
            Ingresar
          </Button>
        </div>

        <AuthSwitchLink 
          text="¿Aún no tienes una cuenta?" 
          linkText="Crear cuenta" 
          href="/registro" 
        />
      </form>

      <ForgotPasswordModal 
        isOpen={isModalOpen}
        onClose={closeResetModal}
        onSubmit={handleForgotPassword}
        loading={isResetLoading}
        success={isResetSuccess}
        error={resetError}
        defaultEmail={formData.correo}
      />
    </div>
  );
};
