import { CreateAdoptionApplicationDTO } from '../types/api.types';

export interface UIAdoptionForm {
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  motivoAdopcion: string;
  direccion: string;
  edad: string;
  tipoVivienda: string;
  detalleInmueble: string;
  aceptacionDatos: boolean;
}

/**
 * Mapea los datos del formulario visual de adopción al DTO esperado por el backend.
 * 
 * @param formData Datos provenientes del formulario UI
 * @param animalId ID real del animal seleccionado
 * @param animalName Nombre del animal para generar la descripción
 * @returns Payload estructurado para enviar al backend
 */
export const mapAdoptionFormToDTO = (
  formData: UIAdoptionForm,
  animalId: string,
  animalName: string
): CreateAdoptionApplicationDTO => {
  
  // Regla: Construir el mensaje adicional
  const additionalMessage = `Dirección domiciliaria: ${formData.direccion}\nEdad: ${formData.edad}\nTipo de vivienda: ${formData.tipoVivienda}\nDetalle del inmueble: ${formData.detalleInmueble}`;
  
  // Regla: Construir la descripción del animal deseado
  const desiredAnimalDescription = `Me interesa adoptar a ${animalName}.`;

  return {
    firstNames: formData.nombres,
    lastNames: formData.apellidos,
    phone: formData.telefono,
    email: formData.email,
    adoptionReason: formData.motivoAdopcion,
    desiredAnimalDescription,
    specificAnimalId: animalId,
    additionalMessage,
    dataProcessingAccepted: formData.aceptacionDatos,
  };
};
