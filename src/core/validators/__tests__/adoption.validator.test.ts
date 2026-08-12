import { describe, it, expect } from 'vitest';
import { AdoptionSchema } from '../adoption.validator';

describe('Adoption Validator', () => {
  const validData = {
    nombres: 'Juan',
    apellidos: 'Perez',
    telefono: '0999999999',
    email: 'juan@test.com',
    motivoAdopcion: 'Me encantan los perros y quiero uno',
    direccion: 'Av Siempre Viva',
    edad: '30',
    tipoVivienda: 'Casa',
    detalleInmueble: 'Casa propia con patio',
    aceptacionDatos: true,
  };

  it('should validate correct data', () => {
    const result = AdoptionSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if email is invalid', () => {
    const result = AdoptionSchema.safeParse({ ...validData, email: 'invalid-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Debe ser un correo electrónico válido');
    }
  });

  it('should fail if aceptacionDatos is false', () => {
    const result = AdoptionSchema.safeParse({ ...validData, aceptacionDatos: false });
    expect(result.success).toBe(false);
  });

  it('should fail if motivoAdopcion is too short', () => {
    const result = AdoptionSchema.safeParse({ ...validData, motivoAdopcion: 'Corto' });
    expect(result.success).toBe(false);
  });
});
