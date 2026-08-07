'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthLabel } from '../atoms/AuthLabel';
import { FormErrorMessage } from '../atoms/FormErrorMessage';
import { CircularShadowImage } from '../atoms/CircularShadowImage';
import { StatusAlert } from '../molecules/StatusAlert';
import { Animal } from '@/types';

import doodlePatitasEsquineras from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_izquierda_superior.png';
import doodleNubesIzquierda from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_derecha_inferior.png';
import { mapAdoptionFormToDTO } from '@/core/mappers/adoption.mapper';

export interface AdoptionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  animal: Animal | null;
  user?: any;
  loading: boolean;
  error: string | null;
}

export const AdoptionRequestModal: React.FC<AdoptionRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  animal,
  user,
  loading,
  error,
}) => {
  const [formData, setFormData] = useState({
    nombres: user?.nombres || '',
    apellidos: user?.apellidos || '',
    telefono: '',
    correo: '',
    direccion: user?.direccion || '',
    edad: user?.edad?.toString() || '',
    motivo: '',
    tipoVivienda: '',
    detalleInmueble: '',
    aceptacionDatos: false,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  

  const [randomSubtitle, setRandomSubtitle] = useState('');

  // Generar subtitulo cuando se abre
  useEffect(() => {
    if (isOpen) {
      if (animal && !randomSubtitle) {
        const phrases = [
          `${animal.name} puede estar más cerca de encontrar el hogar que siempre esperó.`,
          `Adoptar a ${animal.name} es abrirle la puerta a una nueva oportunidad llena de cuidado y amor.`,
          `Tu decisión puede cambiar la vida de ${animal.name} y darle una familia responsable.`,
          `Completa esta solicitud para que Patitas Caminando pueda conocer mejor el hogar que quieres ofrecerle a ${animal.name}.`,
          `Cada adopción responsable empieza con un acto de amor. Hoy puedes dar ese primer paso por ${animal.name}.`
        ];
        setRandomSubtitle(phrases[Math.floor(Math.random() * phrases.length)]);
      }
    }
  }, [isOpen, user, animal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, loading]);

  // Manejo de errores desde el backend (400 Bad Request)
  useEffect(() => {
    if (error) {
      const lowerError = error.toLowerCase();
      const newErrors: Record<string, string> = { ...validationErrors };
      
      if (lowerError.includes('email must be an email')) {
        newErrors.correo = 'Ingresa un correo electrónico válido.';
      } else {
        newErrors.global = typeof error === 'string' ? error : 'Revisa los datos ingresados e intenta nuevamente.';
      }
      
      setValidationErrors(newErrors);
    }
  }, [error]);

  if (!isOpen || !animal) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({ 
      ...prev, 
      [id]: isCheckbox ? (e.target as HTMLInputElement).checked : value 
    }));
    
    if (validationErrors[id]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombres.trim()) newErrors.nombres = 'Ingresa tus nombres.';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Ingresa tus apellidos.';
    if (!formData.telefono.trim()) newErrors.telefono = 'Ingresa tu teléfono o WhatsApp.';
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = 'Ingresa tu correo electrónico.';
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo electrónico válido.';
    }

    if (!formData.direccion.trim()) newErrors.direccion = 'Ingresa tu dirección domiciliaria.';
    
    if (!formData.edad.trim()) {
      newErrors.edad = 'Ingresa tu edad.';
    } else if (isNaN(Number(formData.edad)) || Number(formData.edad) <= 0) {
      newErrors.edad = 'Ingresa una edad válida.';
    }

    if (!formData.motivo.trim()) newErrors.motivo = 'Cuéntanos el motivo de adopción.';
    if (!formData.tipoVivienda) newErrors.tipoVivienda = 'Selecciona el tipo de vivienda.';
    if (formData.tipoVivienda === 'Otro' && !formData.detalleInmueble.trim()) {
      newErrors.detalleInmueble = 'Describe el tipo de inmueble o espacio disponible.';
    }
    
    if (!formData.aceptacionDatos) {
      newErrors.aceptacionDatos = 'Debes aceptar los términos para continuar.';
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();



    if (!validate()) {
      return;
    }

    // Build the mapped data object for the backend using the mapper
    const uiForm = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      telefono: formData.telefono,
      email: formData.correo, // Map correo to email
      motivoAdopcion: formData.motivo, // Map motivo to motivoAdopcion
      direccion: formData.direccion,
      edad: formData.edad,
      tipoVivienda: formData.tipoVivienda,
      detalleInmueble: formData.detalleInmueble,
      aceptacionDatos: formData.aceptacionDatos,
    };
    const mappedData = mapAdoptionFormToDTO(uiForm, animal.id, animal.name);

    onSubmit(mappedData);
  };

  const inputBaseClasses = "w-full px-4 py-3 bg-white border rounded-xl text-base outline-none transition-all duration-300 text-gray-800";
  const inputNormalClasses = "border-gray-200 focus:border-[#F69222] focus:ring-2 focus:ring-[#F69222]/20";
  const inputErrorClasses = "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#153970]/30 backdrop-blur-sm transition-opacity"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl z-10 flex flex-col my-auto mx-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => !loading && onClose()}
          disabled={loading}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* FORM STATE */}
        <div className="flex flex-col h-full px-2 py-2">
          {/* Header */}
          <div className="pt-8 px-6 md:px-10 pb-4 text-center shrink-0 border-b border-gray-100 relative">
            <div className="flex justify-center mb-4 relative z-10">
              <CircularShadowImage
                src={typeof animal.imageUrl === 'string' ? animal.imageUrl : animal.imageUrl?.src}
                alt={animal.name}
                containerClassName="w-36 h-36 md:w-40 md:h-40"
                imageClassName="!object-cover object-top w-full h-full"
              />
              <img 
                src={doodlePatitasEsquineras.src} 
                alt="" 
                className="absolute -top-6 -right-6 w-20 md:w-24 opacity-95 pointer-events-none" 
                aria-hidden="true" 
              />
              <img 
                src={doodleNubesIzquierda.src} 
                alt="" 
                className="absolute -top-8 -left-8 w-28 md:w-32 opacity-95 pointer-events-none drop-shadow-sm" 
                aria-hidden="true" 
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#153970] mb-2 font-brand">
              Quiero adoptar a: {animal.name}
            </h2>
            <p className="text-[#5F6B70] text-sm md:text-base leading-relaxed mb-1">
              Tu decisión puede cambiar la vida de {animal.name} y darle una familia responsable.
            </p>
            <p className="text-[#F69222] font-semibold text-lg font-brand">
              Aquí puede comenzar una historia para toda la vida.
            </p>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-6 md:px-10 py-6">
            <form id="adoption-form" onSubmit={handleSubmit} className="space-y-5">
              
              {validationErrors.global && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-3">
                  <X className="shrink-0 mt-0.5" size={16} />
                  <p>{validationErrors.global}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nombres */}
                <div>
                  <AuthLabel htmlFor="nombres">Nombres *</AuthLabel>
                  <input
                    id="nombres"
                    type="text"
                    disabled={loading}
                    placeholder="Escribe tus nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.nombres ? inputErrorClasses : inputNormalClasses}`}
                  />
                  <FormErrorMessage message={validationErrors.nombres} />
                </div>

                {/* Apellidos */}
                <div>
                  <AuthLabel htmlFor="apellidos">Apellidos *</AuthLabel>
                  <input
                    id="apellidos"
                    type="text"
                    disabled={loading}
                    placeholder="Escribe tus apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.apellidos ? inputErrorClasses : inputNormalClasses}`}
                  />
                  <FormErrorMessage message={validationErrors.apellidos} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Teléfono */}
                <div>
                  <AuthLabel htmlFor="telefono">Teléfono / WhatsApp *</AuthLabel>
                  <input
                    id="telefono"
                    type="text"
                    disabled={loading}
                    placeholder="Ej. 098 772 7566"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.telefono ? inputErrorClasses : inputNormalClasses}`}
                  />
                  <FormErrorMessage message={validationErrors.telefono} />
                </div>

                {/* Correo electrónico */}
                <div>
                  <AuthLabel htmlFor="correo">Correo electrónico *</AuthLabel>
                  <input
                    id="correo"
                    type="email"
                    disabled={loading}
                    placeholder="ejemplo@correo.com"
                    value={formData.correo}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.correo ? inputErrorClasses : inputNormalClasses}`}
                  />
                  <FormErrorMessage message={validationErrors.correo} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {/* Dirección domiciliaria */}
                <div className="md:col-span-3">
                  <AuthLabel htmlFor="direccion">Dirección domiciliaria *</AuthLabel>
                  <input
                    id="direccion"
                    type="text"
                    disabled={loading}
                    placeholder="Ej. Av. Siempre Viva 123"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.direccion ? inputErrorClasses : inputNormalClasses}`}
                  />
                  <FormErrorMessage message={validationErrors.direccion} />
                </div>

                {/* Edad */}
                <div className="md:col-span-1">
                  <AuthLabel htmlFor="edad">Edad *</AuthLabel>
                  <input
                    id="edad"
                    type="number"
                    disabled={loading}
                    placeholder="Ej. 28"
                    value={formData.edad}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.edad ? inputErrorClasses : inputNormalClasses}`}
                  />
                  <FormErrorMessage message={validationErrors.edad} />
                </div>
              </div>

              {/* Motivo de adopción */}
              <div>
                <AuthLabel htmlFor="motivo">Motivo de adopción *</AuthLabel>
                <textarea
                  id="motivo"
                  disabled={loading}
                  rows={3}
                  placeholder="Cuéntanos por qué quieres adoptar y cómo cuidarías a este animalito..."
                  value={formData.motivo}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${validationErrors.motivo ? inputErrorClasses : inputNormalClasses} resize-none`}
                />
                <FormErrorMessage message={validationErrors.motivo} />
              </div>

              <div className="grid grid-cols-1 gap-5">
                {/* Tipo de vivienda */}
                <div>
                  <AuthLabel htmlFor="tipoVivienda">Tipo de vivienda *</AuthLabel>
                  <select
                    id="tipoVivienda"
                    disabled={loading}
                    value={formData.tipoVivienda}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${validationErrors.tipoVivienda ? inputErrorClasses : inputNormalClasses} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Selecciona el tipo de vivienda</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <FormErrorMessage message={validationErrors.tipoVivienda} />
                </div>

                {/* Detalle del inmueble (Condicional) */}
                {formData.tipoVivienda === 'Otro' && (
                  <div>
                    <AuthLabel htmlFor="detalleInmueble">Detalle del inmueble *</AuthLabel>
                    <input
                      id="detalleInmueble"
                      type="text"
                      disabled={loading}
                      placeholder="Cuéntanos más sobre tu vivienda o espacio disponible..."
                      value={formData.detalleInmueble}
                      onChange={handleChange}
                      className={`${inputBaseClasses} ${validationErrors.detalleInmueble ? inputErrorClasses : inputNormalClasses}`}
                    />
                    <FormErrorMessage message={validationErrors.detalleInmueble} />
                  </div>
                )}
              </div>

              {/* Aceptación de datos */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group mt-2">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      id="aceptacionDatos"
                      type="checkbox"
                      checked={formData.aceptacionDatos}
                      onChange={handleChange}
                      disabled={loading}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#F69222]/20 focus:border-[#F69222] checked:bg-[#F69222] checked:border-[#F69222] transition-all cursor-pointer"
                    />
                    <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-800 transition-colors">
                    Acepto que Patitas Caminando utilice mis datos para contactarme y dar seguimiento a esta solicitud de adopción. *
                  </span>
                </label>
                <FormErrorMessage message={validationErrors.aceptacionDatos} />
              </div>

              {/* Mensaje de Error General */}
              {error && (
                <StatusAlert variant="error" message={error} />
              )}
              
              {/* Nota informativa */}
              <StatusAlert 
                variant="info" 
                message="Al enviar este formulario, Patitas Caminando recibirá tu solicitud de adopción y podrá contactarte por WhatsApp o correo para dar seguimiento al proceso." 
              />
            </form>
          </div>

          {/* Footer Actions */}
          <div className="px-6 md:px-10 pb-8 pt-4 bg-white shrink-0 flex flex-col gap-3 rounded-b-[32px]">
            <Button
              variant="primary"
              type="submit"
              form="adoption-form"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {loading ? 'Enviando solicitud...' : 'Enviar solicitud'}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
