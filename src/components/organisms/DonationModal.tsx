'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthLabel } from '../atoms/AuthLabel';
import { FormErrorMessage } from '../atoms/FormErrorMessage';
import { CircularShadowImage } from '../atoms/CircularShadowImage';
import { StatusAlert } from '../molecules/StatusAlert';
import doodleDonacion from '@/assets/ilustraciones/doodles/donation/doodle_donacion.png';

export interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading: boolean;
  success: boolean;
  error: string | null;
  defaultUserData?: {
    nombres?: string;
    apellidos?: string;
  };
}

const donationOptions = [
  'Alimento para perros', 'Alimento para gatos', 'Medicinas',
  'Productos de higiene', 'Utensilios de limpieza', 'Camas',
  'Mantas', 'Juguetes', 'Correas', 'Collares', 'Platos',
  'Transportadoras', 'Otros'
];

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  success,
  error,
  defaultUserData
}) => {
  const [formData, setFormData] = useState({
    nombres: '',
    institucion: '',
    telefono: '',
    correo: '',
    tipoDonacion: [] as string[],
    detalle: '',
    aceptacionDatos: false,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const defaultName = [defaultUserData?.nombres, defaultUserData?.apellidos].filter(Boolean).join(' ');
      setFormData({
        nombres: defaultName || '',
        institucion: '',
        telefono: '',
        correo: '',
        tipoDonacion: [],
        detalle: '',
        aceptacionDatos: false,
      });
      setValidationErrors({});
    }
  }, [isOpen, defaultUserData]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDonationToggle = (tipo: string) => {
    setFormData(prev => {
      const current = prev.tipoDonacion;
      const newTipos = current.includes(tipo)
        ? current.filter(t => t !== tipo)
        : [...current, tipo];
      return { ...prev, tipoDonacion: newTipos };
    });

    if (validationErrors.tipoDonacion) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.tipoDonacion;
        return newErrors;
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.nombres.trim()) errors.nombres = 'Ingresa tus nombres y apellidos.';
    if (!formData.telefono.trim()) errors.telefono = 'Ingresa tu teléfono o WhatsApp.';
    if (!formData.correo.trim()) errors.correo = 'Ingresa tu correo electrónico.';
    if (formData.tipoDonacion.length === 0) errors.tipoDonacion = 'Selecciona al menos un tipo de donación.';
    if (!formData.detalle.trim()) {
      if (formData.tipoDonacion.includes('Otros')) {
        errors.detalle = 'Describe la ayuda, ya que seleccionaste "Otros".';
      } else {
        errors.detalle = 'Describe brevemente qué deseas donar.';
      }
    }
    if (!formData.aceptacionDatos) errors.aceptacionDatos = 'Debes aceptar los términos para continuar.';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputBaseClasses = "w-full px-4 py-3 bg-white border rounded-xl text-base outline-none transition-all duration-300 text-gray-800 placeholder:text-gray-400";
  const inputNormalClasses = "border-gray-200 focus:border-[#62D9D9] focus:ring-2 focus:ring-[#62D9D9]/20 bg-gray-50/50";
  const inputErrorClasses = "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/30";

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

        {success ? (
          // Success State
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-extrabold text-[#153970] mb-4">Donación registrada</h3>
            <p className="text-[#5F6B70] text-lg mb-8 leading-relaxed">
              Gracias por tu ayuda. Patitas Caminando revisará la información y se pondrá en contacto para coordinar la entrega.
            </p>
            <Button onClick={onClose} className="w-full text-lg py-4">
              Entendido
            </Button>
          </div>
        ) : (
          // Form State
          <div className="text-center flex flex-col max-h-[85vh]">
            <div className="shrink-0">
              <div className="flex justify-center mb-6 mt-2">
                <CircularShadowImage
                  src={doodleDonacion}
                  alt="Donar"
                  shadowColor="turquoise"
                  containerClassName="w-32 h-32 md:w-40 md:h-40"
                  imageClassName="w-[105%] translate-y-[0px]"
                  width={250}
                  height={250}
                />
              </div>

              <h3 className="text-3xl font-extrabold text-[#153970] mb-2">Donar</h3>
              <p className="text-[#5F6B70] leading-relaxed mb-1 px-4">
                Ayúdanos a seguir cambiando vidas con tu aporte para Patitas Caminando.
              </p>
              <p className="text-[#62D9D9] font-semibold text-sm mb-6">
                No necesitas una cuenta para donar.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-1 pb-2">
              <form onSubmit={handleSubmit} noValidate className="text-left space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nombres */}
                  <div>
                    <AuthLabel htmlFor="nombres">Nombres y apellidos *</AuthLabel>
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Escribe tu nombre completo"
                      className={`${inputBaseClasses} ${validationErrors.nombres ? inputErrorClasses : inputNormalClasses}`}
                    />
                    <FormErrorMessage message={validationErrors.nombres} />
                  </div>

                  {/* Institución */}
                  <div>
                    <AuthLabel htmlFor="institucion">Institución o grupo de apoyo</AuthLabel>
                    <input
                      type="text"
                      id="institucion"
                      name="institucion"
                      value={formData.institucion}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Nombre de institución, empresa o grupo"
                      className={`${inputBaseClasses} ${inputNormalClasses}`}
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <AuthLabel htmlFor="telefono">Teléfono / WhatsApp *</AuthLabel>
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Ej. 098 772 7566"
                      className={`${inputBaseClasses} ${validationErrors.telefono ? inputErrorClasses : inputNormalClasses}`}
                    />
                    <FormErrorMessage message={validationErrors.telefono} />
                  </div>

                  {/* Correo electrónico */}
                  <div>
                    <AuthLabel htmlFor="correo">Correo electrónico *</AuthLabel>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="ejemplo@correo.com"
                      className={`${inputBaseClasses} ${validationErrors.correo ? inputErrorClasses : inputNormalClasses}`}
                    />
                    <FormErrorMessage message={validationErrors.correo} />
                  </div>
                </div>

                {/* Tipo de donación (Multi-select) */}
                <div>
                  <AuthLabel>¿Qué deseas donar? *</AuthLabel>
                  <p className="text-xs text-gray-400 mb-3 mt-1">Selecciona una o varias opciones</p>
                  <div className="flex flex-wrap gap-2">
                    {donationOptions.map((opcion) => {
                      const isSelected = formData.tipoDonacion.includes(opcion);
                      return (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() => handleDonationToggle(opcion)}
                          disabled={loading}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                              ? 'bg-[#E0F7F7] border-[#62D9D9] text-[#153970]'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-[#62D9D9] hover:bg-gray-50'
                            }`}
                        >
                          {opcion}
                        </button>
                      );
                    })}
                  </div>
                  <FormErrorMessage message={validationErrors.tipoDonacion} />
                </div>

                {/* Detalle */}
                <div>
                  <AuthLabel htmlFor="detalle">
                    Detalle de la ayuda *
                  </AuthLabel>
                  <textarea
                    id="detalle"
                    name="detalle"
                    value={formData.detalle}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Describe brevemente qué deseas donar, cantidad aproximada, estado del producto o disponibilidad de entrega..."
                    rows={4}
                    className={`${inputBaseClasses} ${validationErrors.detalle ? inputErrorClasses : inputNormalClasses} resize-none`}
                  />
                  <FormErrorMessage message={validationErrors.detalle} />
                </div>

                {/* Aceptación de datos */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group mt-2">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        name="aceptacionDatos"
                        checked={formData.aceptacionDatos}
                        onChange={handleCheckboxChange}
                        disabled={loading}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#62D9D9]/20 focus:border-[#62D9D9] checked:bg-[#62D9D9] checked:border-[#62D9D9] transition-all cursor-pointer"
                      />
                      <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-800 transition-colors">
                      Acepto que Patitas Caminando utilice mis datos para contactarme y coordinar esta donación. *
                    </span>
                  </label>
                  <FormErrorMessage message={validationErrors.aceptacionDatos} />
                </div>

                {/* Bloque Informativo */}
                <StatusAlert
                  variant="info"
                  message="Tu ofrecimiento será enviado al equipo de Patitas Caminando para revisar la ayuda y coordinar la entrega contigo por WhatsApp o correo."
                />

                {error && (
                  <StatusAlert
                    variant="error"
                    message={error || 'No pudimos registrar la donación en este momento. Inténtalo nuevamente.'}
                  />
                )}

                {/* Botones */}
                <div className="flex flex-col gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full text-lg py-3.5 group flex items-center justify-center gap-2 !bg-[#62D9D9] hover:!bg-[#4BBDBD] text-white transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando donación...
                      </span>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        Enviar donación
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                    className="w-full text-lg py-3.5 !text-[#62D9D9] !border-[#62D9D9] hover:!bg-[#62D9D9]/10 hover:!text-[#62D9D9]"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
