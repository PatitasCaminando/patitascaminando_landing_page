'use client';

import React, { useState } from 'react';
import { AuthInputGroup } from '../molecules/AuthInputGroup';
import { Button } from '../ui/Button';
import { AuthSwitchLink } from '../molecules/AuthSwitchLink';
import { AuthFormHeader } from '../molecules/AuthFormHeader';
import { PawPrint, User, Calendar, Phone, Mail, Lock } from 'lucide-react';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombres.trim()) newErrors.nombres = 'Los nombres son obligatorios';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    
    if (!formData.edad.trim()) {
      newErrors.edad = 'La edad es obligatoria';
    } else if (isNaN(Number(formData.edad)) || Number(formData.edad) < 13) {
      newErrors.edad = 'Ingresa una edad válida (mínimo 13 años)';
    }

    if (formData.telefono.trim() && !/^\d{9,15}$/.test(formData.telefono.trim())) {
      newErrors.telefono = 'El teléfono debe contener solo números (mínimo 9)';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Registro exitoso (mock)', formData);
      // Aquí irá la lógica de Supabase Auth
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <AuthFormHeader 
        title="Registro" 
        subtitle="Completa tus datos para empezar." 
      />

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <AuthInputGroup
            id="nombres"
            label="Nombres *"
            placeholder="Ej. Juan"
            icon={<User size={18} />}
            value={formData.nombres}
            onChange={handleChange}
            error={errors.nombres}
          />
          <AuthInputGroup
            id="apellidos"
            label="Apellidos *"
            placeholder="Ej. Pérez"
            icon={<User size={18} />}
            value={formData.apellidos}
            onChange={handleChange}
            error={errors.apellidos}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <AuthInputGroup
            id="edad"
            label="Edad *"
            placeholder="Ej. 25"
            type="number"
            icon={<Calendar size={18} />}
            value={formData.edad}
            onChange={handleChange}
            error={errors.edad}
          />
          <AuthInputGroup
            id="telefono"
            label="Teléfono (opcional)"
            placeholder="Ej. 0987654321"
            type="tel"
            icon={<Phone size={18} />}
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />
        </div>

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

        <AuthInputGroup
          id="confirmPassword"
          label="Confirmar contraseña *"
          placeholder="••••••••"
          type="password"
          icon={<Lock size={18} />}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <AuthSwitchLink 
          text="¿Ya tienes una cuenta?" 
          linkText="Iniciar sesión" 
          href="/login" 
        />

        <div className="mt-6">
          <Button type="submit" className="w-full text-lg group">
            <PawPrint size={20} className="mr-2" />
            Registrarme
          </Button>
        </div>
      </form>
    </div>
  );
};
