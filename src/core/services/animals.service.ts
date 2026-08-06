import { AnimalDTO } from '../types/api.types';
import { httpClient } from '../api/http-client';
import { filterValidAnimals, mapAnimalDTOToUI } from '../mappers/animal.mapper';
import { Animal } from '@/types';

export interface PaginatedAnimalsResponse {
  items: Animal[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const AnimalsService = {
  getPublicAnimals: async ({ page = 1, limit = 10 } = {}): Promise<PaginatedAnimalsResponse> => {
    const response = await httpClient.get<{
      items: AnimalDTO[];
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }>(`/public/animals?page=${page}&limit=${limit}`);

    // El backend devuelve { items, page, limit, total, totalPages }
    const validDTOs = filterValidAnimals(response.items || []);
    const items = validDTOs.map(mapAnimalDTOToUI);

    return {
      items,
      page: response.page || page,
      limit: response.limit || limit,
      total: response.total || 0,
      totalPages: response.totalPages || 1,
    };
  },

  getAnimalById: async (id: string): Promise<Animal | null> => {
    try {
      const response = await httpClient.get<AnimalDTO>(`/public/animals/${id}`);
      if (!response) return null;

      return mapAnimalDTOToUI(response);
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error);
      return null;
    }
  },

  getAnimalBySlug: async (slug: string): Promise<Animal | null> => {
    try {
      const response = await AnimalsService.getPublicAnimals({ page: 1, limit: 100 });
      return response.items.find(a => a.slug === slug) || null;
    } catch (error) {
      console.error(`Error fetching animal by slug ${slug}:`, error);
      return null;
    }
  }
};
