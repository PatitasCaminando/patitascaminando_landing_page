import { describe, it, expect } from 'vitest';
import { mapDonationFormToDTO, splitFullName, UIDonationForm } from '../donation.mapper';

describe('Donation Mapper', () => {
  describe('splitFullName', () => {
    it('should split 2 words into first and last name', () => {
      const { firstNames, lastNames } = splitFullName('Juan Perez');
      expect(firstNames).toBe('Juan');
      expect(lastNames).toBe('Perez');
    });

    it('should split 3+ words into first names and last names', () => {
      const { firstNames, lastNames } = splitFullName('Juan Carlos Perez Lopez');
      expect(firstNames).toBe('Juan Carlos');
      expect(lastNames).toBe('Perez Lopez');
    });

    it('should handle single word names', () => {
      const { firstNames, lastNames } = splitFullName('Juan');
      expect(firstNames).toBe('Juan');
      expect(lastNames).toBe('');
    });
  });

  describe('mapDonationFormToDTO', () => {
    it('should map UI form to backend DTO correctly and map items', () => {
      const formData: UIDonationForm = {
        nombreCompleto: 'Maria Lopez Gomez',
        telefono: '0999999999',
        email: 'maria@test.com',
        itemsSeleccionados: ['Alimento para perros', 'Otros'],
        descripcion: 'Tengo mantas viejas',
        detalleOtros: 'Comida de gato abierta',
        aceptacionDatos: true,
      };

      const dto = mapDonationFormToDTO(formData);

      expect(dto.firstNames).toBe('Maria');
      expect(dto.lastNames).toBe('Lopez Gomez');
      expect(dto.phone).toBe('0999999999');
      expect(dto.email).toBe('maria@test.com');
      expect(dto.selectedItems).toEqual(['alimento_perros', 'otros']);
      expect(dto.descriptionObservation).toBe('Tengo mantas viejas');
      expect(dto.otherDescription).toBe('Comida de gato abierta');
      expect(dto.dataProcessingAccepted).toBe(true);
    });
  });
});
