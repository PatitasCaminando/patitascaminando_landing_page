import { CreateDonationOfferDTO } from '../types/api.types';
import { httpClient } from '../api/http-client';

/**
 * Servicio conectado al API NestJS local para enviar ofrecimientos de donación.
 */
export const DonationsService = {
  /**
   * Envía una nueva oferta de donación.
   * Endpoint: POST /public/donations/offers
   */
  submitOffer: async (payload: CreateDonationOfferDTO): Promise<any> => {
    // Usamos el cliente HTTP para hacer el POST al endpoint público sin token.
    return httpClient.post('/public/donations/offers', payload);
  }
};
