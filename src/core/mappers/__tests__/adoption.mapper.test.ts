import { describe, it, expect } from 'vitest';
import { mapAdoptionFormToDTO, UIAdoptionForm } from '../adoption.mapper';

describe('Adoption Mapper', () => {
  it('should map UI form to backend DTO correctly', () => {
    const formData: UIAdoptionForm = {
      nombres: 'Juan',
      apellidos: 'Perez',
      telefono: '0999999999',
      email: 'juan@test.com',
      motivoAdopcion: 'Quiero un amigo',
      direccion: 'Av Siempre Viva 123',
      edad: '30',
      tipoVivienda: 'Casa',
      detalleInmueble: 'Propia',
      aceptacionDatos: true,
    };

    const animalId = 'animal-123';
    const animalName = 'Firulais';

    const dto = mapAdoptionFormToDTO(formData, animalId, animalName);

    expect(dto.firstNames).toBe('Juan');
    expect(dto.lastNames).toBe('Perez');
    expect(dto.phone).toBe('0999999999');
    expect(dto.email).toBe('juan@test.com');
    expect(dto.adoptionReason).toBe('Quiero un amigo');
    expect(dto.specificAnimalId).toBe(animalId);
    expect(dto.dataProcessingAccepted).toBe(true);
    
    // Check constructed fields
    expect(dto.desiredAnimalDescription).toBe('Me interesa adoptar a Firulais.');
    expect(dto.additionalMessage).toContain('Av Siempre Viva 123');
    expect(dto.additionalMessage).toContain('30');
    expect(dto.additionalMessage).toContain('Casa');
    expect(dto.additionalMessage).toContain('Propia');
  });
});
