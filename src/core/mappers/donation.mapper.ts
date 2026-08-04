import { CreateDonationOfferDTO } from '../types/api.types';
import { DonationItem } from '../constants/enums';

export interface UIDonationForm {
  nombreCompleto: string; // En la UI es un solo campo
  telefono: string;
  email: string;
  itemsSeleccionados: string[]; // Pueden venir del enum visual
  descripcion: string;
  detalleOtros?: string; // Si selecciona 'otros'
  aceptacionDatos: boolean;
}

/**
 * Separa un nombre completo en nombres y apellidos basándose en la regla:
 * - Si tiene >= 3 palabras: Las dos últimas son apellidos, el resto nombres.
 * - Si tiene 2 palabras o menos: La primera es nombre, la segunda es apellido (o vacía).
 */
export const splitFullName = (fullName: string): { firstNames: string; lastNames: string } => {
  const words = fullName.trim().split(/\s+/);
  
  if (words.length <= 2) {
    return {
      firstNames: words[0] || '',
      lastNames: words.slice(1).join(' ') || '',
    };
  }

  const lastNames = words.slice(-2).join(' ');
  const firstNames = words.slice(0, -2).join(' ');

  return { firstNames, lastNames };
};

/**
 * Mapea los datos del formulario visual de donación al DTO esperado por el backend.
 * 
 * @param formData Datos provenientes del formulario UI
 * @returns Payload estructurado para enviar al backend
 */
export const mapDonationFormToDTO = (formData: UIDonationForm): CreateDonationOfferDTO => {
  const { firstNames, lastNames } = splitFullName(formData.nombreCompleto);

  // Mapear los items seleccionados para asegurar que coincidan con DonationItem
  const selectedItems = formData.itemsSeleccionados as DonationItem[];

  return {
    firstNames,
    lastNames,
    phone: formData.telefono,
    email: formData.email,
    selectedItems,
    descriptionObservation: formData.descripcion,
    otherDescription: formData.detalleOtros,
    dataProcessingAccepted: formData.aceptacionDatos,
  };
};
