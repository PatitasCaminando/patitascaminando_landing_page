import { describe, it, expect } from 'vitest';
import { mapAnimalDTOToUI, filterValidAnimals } from '../animal.mapper';
import { AnimalDTO } from '@/core/types/api.types';

describe('Animal Mapper', () => {
  describe('mapAnimalDTOToUI', () => {
    const baseAnimal: AnimalDTO = {
      id: '123',
      name: 'Firulais',
      species: 'perro',
      sex: 'macho',
      approximateAge: '2 años',
      size: 'mediano',
      status: 'disponible',
      description: 'Lindo perrito',
      isActive: true,
      isPubliclyVisible: true,
      images: [],
      photoPaths: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    it('should generate a correct slug handling spaces and special characters', () => {
      const animal = { ...baseAnimal, name: 'Firulais El Perrito!' };
      const uiAnimal = mapAnimalDTOToUI(animal);
      expect(uiAnimal.slug).toBe('firulais-el-perrito');
    });

    it('should set correct CTA for a male animal', () => {
      const uiAnimal = mapAnimalDTOToUI(baseAnimal);
      expect(uiAnimal.cta).toBe('Conocerlo');
      expect(uiAnimal.detailCta).toBe('Quiero adoptarlo');
    });

    it('should set correct CTA for a female animal', () => {
      const animal = { ...baseAnimal, sex: 'hembra', species: 'perro' };
      const uiAnimal = mapAnimalDTOToUI(animal);
      expect(uiAnimal.cta).toBe('Conocerla');
      expect(uiAnimal.category).toBe('Perra');
    });

    it('should set unavailable CTA if status is en_proceso or adoptado', () => {
      const animal = { ...baseAnimal, status: 'adoptado' };
      const uiAnimal = mapAnimalDTOToUI(animal);
      expect(uiAnimal.detailCta).toBe('No disponible por ahora');
    });

    it('should resolve primary image from images array', () => {
      const animal = {
        ...baseAnimal,
        images: [{ mediaId: 'image1.jpg', isPrimary: true }]
      };
      const uiAnimal = mapAnimalDTOToUI(animal);
      expect(uiAnimal.imageUrl).toContain('image1.jpg');
    });

    it('should fallback to photoPaths if images array is empty', () => {
      const animal = {
        ...baseAnimal,
        images: [],
        photoPaths: ['photo1.jpg']
      };
      const uiAnimal = mapAnimalDTOToUI(animal);
      expect(uiAnimal.imageUrl).toContain('photo1.jpg');
    });
  });

  describe('filterValidAnimals', () => {
    it('should filter out inactive, invisible, or archived animals', () => {
      const animals: AnimalDTO[] = [
        { id: '1', name: 'A', isActive: true, isPubliclyVisible: true, status: 'disponible', species: '', sex: '', approximateAge: '', size: '', createdAt: '', updatedAt: '' },
        { id: '2', name: 'B', isActive: false, isPubliclyVisible: true, status: 'disponible', species: '', sex: '', approximateAge: '', size: '', createdAt: '', updatedAt: '' },
        { id: '3', name: 'C', isActive: true, isPubliclyVisible: false, status: 'disponible', species: '', sex: '', approximateAge: '', size: '', createdAt: '', updatedAt: '' },
        { id: '4', name: 'D', isActive: true, isPubliclyVisible: true, status: 'archivado', species: '', sex: '', approximateAge: '', size: '', createdAt: '', updatedAt: '' }
      ];

      const valid = filterValidAnimals(animals);
      expect(valid.length).toBe(1);
      expect(valid[0].id).toBe('1');
    });
  });
});
