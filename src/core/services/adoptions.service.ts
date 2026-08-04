import { CreateAdoptionApplicationDTO } from '../types/api.types';

/**
 * Servicio preparado para el envío de solicitudes de adopción al API NestJS.
 * IMPORTANTE: Actualmente no se está llamando al endpoint real en la UI,
 * esto es preparación arquitectónica para la siguiente fase.
 */
export const AdoptionsService = {
  /**
   * Envía una nueva solicitud de adopción.
   * Endpoint futuro: POST /public/adoptions/applications
   */
  submitApplication: async (payload: CreateAdoptionApplicationDTO): Promise<any> => {
    // TODO: Implementar llamada real (ej. fetch o axios.post('/public/adoptions/applications', payload))
    console.warn('AdoptionsService.submitApplication no está conectado al backend real.');
    console.log('Payload que se enviará en el futuro:', payload);
    
    // Simular un retardo y respuesta exitosa
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
  }
};
