'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, UploadCloud } from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthLabel } from '../atoms/AuthLabel';
import { FormErrorMessage } from '../atoms/FormErrorMessage';
import { CircularShadowImage } from '../atoms/CircularShadowImage';
import { StatusAlert } from '../molecules/StatusAlert';
import doodleAlertar from '@/assets/ilustraciones/doodles/alert/doodle_alertar.png';

export interface AlertReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading: boolean;
  error: string | null;
}

export const AlertReportModal: React.FC<AlertReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  error,
}) => {
  const [formData, setFormData] = useState({
    tipoAlerta: '',
    descripcion: '',
    foto: null as File | null,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Only reset validation errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setValidationErrors({});
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, loading]);

  if (!isOpen) return null;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.tipoAlerta) {
      newErrors.tipoAlerta = 'Selecciona un tipo de alerta.';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria.';
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    setValidationErrors({});
    onSubmit(formData);
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
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-patitas p-6 sm:p-8 md:p-12 transform transition-all duration-300 scale-100 opacity-100 my-auto mx-auto"
        role="dialog"
        aria-modal="true"
      >
        {!loading && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-[#153970] transition-colors p-2 bg-gray-50 hover:bg-gray-100 rounded-full z-10"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        )}

        {/* Form State */}
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
            Cuéntanos la situación del animalito para poder canalizar el caso por Correo con Patitas Caminando.
          </p>
          <p className="text-[#F69222] font-semibold text-sm mb-6">
            No necesitas una cuenta para reportar.
          </p>

          <form onSubmit={handleSubmit} noValidate className="text-left space-y-5">

            {/* Tipo de alerta */}
            <div>
              <AuthLabel htmlFor="tipoAlerta">Tipo de alerta *</AuthLabel>
              <select
                id="tipoAlerta"
                disabled={loading}
                value={formData.tipoAlerta}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, tipoAlerta: e.target.value }));
                  if (validationErrors.tipoAlerta) setValidationErrors(prev => ({ ...prev, tipoAlerta: '' }));
                }}
                className={`${inputBaseClasses} ${validationErrors.tipoAlerta ? inputErrorClasses : inputNormalClasses} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Selecciona el tipo de alerta</option>
                <option value="extraviado">Animal extraviado</option>
                <option value="abandonado">Animal abandonado</option>
                <option value="riesgo">Animal en riesgo</option>
              </select>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Elige la opción que mejor describa la situación.</p>
              <FormErrorMessage message={validationErrors.tipoAlerta} />
            </div>

            {/* Descripción */}
            <div>
              <AuthLabel htmlFor="descripcion">Descripción *</AuthLabel>
              <textarea
                id="descripcion"
                disabled={loading}
                rows={4}
                placeholder="Describe el lugar, referencias cercanas, hora aproximada, estado del animalito o cualquier detalle importante..."
                value={formData.descripcion}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, descripcion: e.target.value }));
                  if (validationErrors.descripcion) setValidationErrors(prev => ({ ...prev, descripcion: '' }));
                }}
                className={`${inputBaseClasses} ${validationErrors.descripcion ? inputErrorClasses : inputNormalClasses} resize-none`}
              />
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Mientras más claro sea el reporte, más fácil será actuar o compartir la alerta.</p>
              <FormErrorMessage message={validationErrors.descripcion} />
            </div>

            {/* Foto (Opcional) */}
            <div>
              <AuthLabel htmlFor="foto">Foto opcional</AuthLabel>
              <div 
                className={`mt-1 relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-colors ${
                  validationErrors.foto 
                    ? 'border-red-500 bg-red-50' 
                    : formData.foto 
                      ? 'border-[#F69222] bg-[#FDF3E7]' 
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#F69222]'
                }`}
              >
                <input
                  type="file"
                  id="foto"
                  accept=".jpg,.jpeg,.png,.webp"
                  disabled={loading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 5 * 1024 * 1024) {
                      setValidationErrors(prev => ({ ...prev, foto: 'La imagen no debe superar los 5 MB.' }));
                      e.target.value = '';
                    } else {
                      setFormData(prev => ({ ...prev, foto: file || null }));
                      if (validationErrors.foto) setValidationErrors(prev => ({ ...prev, foto: '' }));
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                
                <div className="flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                  {formData.foto ? (
                    <>
                      <div className="w-10 h-10 mb-2 rounded-full bg-[#F69222]/20 flex items-center justify-center text-[#F69222]">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="text-sm font-semibold text-[#153970] truncate max-w-[200px]">
                        {formData.foto.name}
                      </p>
                      <p className="text-xs text-[#F69222] mt-1 font-medium">Click para cambiar imagen</p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 mb-2 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-sm font-semibold text-[#153970]">
                        Haz clic para subir una foto
                      </p>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Formatos permitidos: JPG, PNG, WEBP. Máximo: 5 MB.</p>
              <FormErrorMessage message={validationErrors.foto} />
            </div>

            {/* Bloque Informativo */}
            <StatusAlert
              variant="info"
              message="La información ingresada se enviará por Correo a Patitas Caminando para facilitar la revisión del caso y coordinar una posible orientación o apoyo."
            />

            {error && (
              <StatusAlert
                variant="error"
                message={error}
              />
            )}

            {/* Botones */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-lg py-3.5 group flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Enviando alerta...'
                ) : (
                  <>
                    <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    Reportar
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="w-full text-lg py-3.5"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
