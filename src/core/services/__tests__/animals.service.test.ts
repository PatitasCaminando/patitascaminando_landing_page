import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnimalsService } from '../animals.service';
import { httpClient } from '../../api/http-client';
import { AnimalDTO } from '../../types/api.types';

vi.mock('../../api/http-client', () => ({
  httpClient: {
    get: vi.fn(),
  }
}));

describe('Animals Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPublicAnimals', () => {
    it('should fetch and map animals correctly', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'A', isActive: true, isPubliclyVisible: true, status: 'disponible', species: 'perro', sex: 'macho', approximateAge: '1', size: 'mediano' }
        ],
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      };

      vi.mocked(httpClient.get).mockResolvedValueOnce(mockResponse);

      const result = await AnimalsService.getPublicAnimals();
      
      expect(httpClient.get).toHaveBeenCalledWith('/public/animals?page=1&limit=10');
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('A');
      expect(result.total).toBe(1);
    });
  });

  describe('getAnimalById', () => {
    it('should fetch and map single animal', async () => {
      const mockAnimal: Partial<AnimalDTO> = { id: '1', name: 'Firulais', isActive: true, isPubliclyVisible: true, status: 'disponible', species: 'perro', sex: 'macho' };
      vi.mocked(httpClient.get).mockResolvedValueOnce(mockAnimal);

      const result = await AnimalsService.getAnimalById('1');
      
      expect(httpClient.get).toHaveBeenCalledWith('/public/animals/1');
      expect(result?.name).toBe('Firulais');
    });

    it('should return null on error', async () => {
      vi.mocked(httpClient.get).mockRejectedValueOnce(new Error('Network error'));
      const result = await AnimalsService.getAnimalById('1');
      expect(result).toBeNull();
    });
  });

  describe('getAnimalBySlug', () => {
    it('should find animal by slug', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Firulais Perez', isActive: true, isPubliclyVisible: true, status: 'disponible', species: 'perro', sex: 'macho', approximateAge: '1', size: 'mediano' }
        ],
        page: 1, limit: 100, total: 1, totalPages: 1,
      };
      vi.mocked(httpClient.get).mockResolvedValueOnce(mockResponse);

      const result = await AnimalsService.getAnimalBySlug('firulais-perez');
      
      expect(result?.name).toBe('Firulais Perez');
    });

    it('should return null if not found', async () => {
      const mockResponse = { items: [], page: 1, limit: 100, total: 0, totalPages: 1 };
      vi.mocked(httpClient.get).mockResolvedValueOnce(mockResponse);

      const result = await AnimalsService.getAnimalBySlug('not-exist');
      expect(result).toBeNull();
    });
  });
});
