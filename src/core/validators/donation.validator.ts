import { z } from 'zod';
import { DonationItem } from '../constants/enums';

export const DonationSchema = z.object({
  nombreCompleto: z.string().min(4, 'Ingresa tu nombre y apellido completo').refine(val => val.trim().split(/\s+/).length >= 2, {
    message: 'Debe contener al menos dos palabras (nombre y apellido)',
  }),
  telefono: z.string().min(7, 'El teléfono debe ser válido').max(15, 'El teléfono es demasiado largo'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  itemsSeleccionados: z.array(z.nativeEnum(DonationItem)).min(1, 'Selecciona al menos un ítem para donar'),
  descripcion: z.string().min(5, 'Brinda una breve descripción de tu donación'),
  detalleOtros: z.string().optional(),
  aceptacionDatos: z.literal(true, {
    message: 'Debes aceptar la política de privacidad',
  }),
}).superRefine((data, ctx) => {
  // Si "otros" está en los items seleccionados, detalleOtros es obligatorio
  if (data.itemsSeleccionados.includes(DonationItem.OTHER)) {
    if (!data.detalleOtros || data.detalleOtros.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debes especificar qué artículo deseas donar',
        path: ['detalleOtros'],
      });
    }
  }
});

export type DonationFormValues = z.infer<typeof DonationSchema>;
