import { CreateDonationOfferDTO } from '../types/api.types';

/**
 * Servicio preparado para el envío de ofrecimientos de donación al API NestJS.
 * IMPORTANTE: Actualmente no se está llamando al endpoint real en la UI,
 * esto es preparación arquitectónica para la siguiente fase.
 */
export const DonationsService = {
  /**
   * Envía un nuevo ofrecimiento de donación.
   * Endpoint futuro: POST /public/donations/offers
   */
  submitOffer: async (payload: CreateDonationOfferDTO): Promise<any> => {
    // TODO: Implementar llamada real (ej. fetch o axios.post('/public/donations/offers', payload))
    console.warn('DonationsService.submitOffer no está conectado al backend real.');
    console.log('Payload que se enviará en el futuro:', payload);
    
    // Simular un retardo y respuesta exitosa
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
  }
};
