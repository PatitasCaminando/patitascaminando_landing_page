import { CreateAdoptionApplicationDTO } from '../types/api.types';
import { httpClient } from '../api/http-client';

/**
 * Servicio conectado al API NestJS local para enviar solicitudes de adopción.
 */
export const AdoptionsService = {
  /**
   * Envía una nueva solicitud de adopción.
   * Endpoint: POST /public/adoptions/applications
   */
  submitApplication: async (payload: CreateAdoptionApplicationDTO): Promise<any> => {
    // Usamos el cliente HTTP para hacer el POST al endpoint público sin token.
    return httpClient.post('/public/adoptions/applications', payload);
  }
};
