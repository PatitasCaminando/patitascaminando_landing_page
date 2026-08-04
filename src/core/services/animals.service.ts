import { AnimalDTO } from '../types/api.types';

/**
 * Servicio preparado para el consumo de animales desde el API NestJS.
 * IMPORTANTE: Actualmente no se está llamando al endpoint real en la UI,
 * esto es preparación arquitectónica para la siguiente fase.
 */
export const AnimalsService = {
  /**
   * Obtiene la lista de animales públicos.
   * Endpoint futuro: GET /public/animals
   */
  getPublicAnimals: async (): Promise<AnimalDTO[]> => {
    // TODO: Implementar llamada real (ej. fetch o axios.get('/public/animals'))
    console.warn('AnimalsService.getPublicAnimals no está conectado al backend real.');
    return [];
  },

  /**
   * Obtiene el detalle de un animal público por su ID.
   * Endpoint futuro: GET /public/animals/:id
   */
  getAnimalById: async (id: string): Promise<AnimalDTO | null> => {
    // TODO: Implementar llamada real (ej. fetch o axios.get(`/public/animals/${id}`))
    console.warn(`AnimalsService.getAnimalById(${id}) no está conectado al backend real.`);
    return null;
  }
};
