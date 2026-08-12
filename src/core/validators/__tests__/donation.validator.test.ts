import { describe, it, expect } from 'vitest';
import { DonationSchema } from '../donation.validator';
import { DonationItem } from '@/core/constants/enums';

describe('Donation Validator', () => {
  const validData = {
    nombreCompleto: 'Juan Perez',
    telefono: '0999999999',
    email: 'juan@test.com',
    itemsSeleccionados: [DonationItem.DOG_FOOD],
    descripcion: 'Tengo alimento sellado',
    aceptacionDatos: true,
  };

  it('should validate correct data', () => {
    const result = DonationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if nombreCompleto has only one word', () => {
    const result = DonationSchema.safeParse({ ...validData, nombreCompleto: 'Juan' });
    expect(result.success).toBe(false);
  });

  it('should fail if itemsSeleccionados is empty', () => {
    const result = DonationSchema.safeParse({ ...validData, itemsSeleccionados: [] });
    expect(result.success).toBe(false);
  });

  it('should fail if "otros" is selected but detalleOtros is missing', () => {
    const result = DonationSchema.safeParse({
      ...validData,
      itemsSeleccionados: [DonationItem.OTHER],
      detalleOtros: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('detalleOtros'))).toBe(true);
    }
  });

  it('should pass if "otros" is selected and detalleOtros is provided', () => {
    const result = DonationSchema.safeParse({
      ...validData,
      itemsSeleccionados: [DonationItem.OTHER],
      detalleOtros: 'Comida de gato',
    });
    expect(result.success).toBe(true);
  });
});
