import { z } from 'zod';

export const AdoptionSchema = z.object({
  nombres: z.string().min(2, 'Los nombres son obligatorios'),
  apellidos: z.string().min(2, 'Los apellidos son obligatorios'),
  telefono: z.string().min(7, 'El teléfono debe ser válido').max(15, 'El teléfono es demasiado largo'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  motivoAdopcion: z.string().min(10, 'Por favor, explícanos un poco más (mínimo 10 caracteres)'),
  direccion: z.string().min(5, 'La dirección es obligatoria'),
  edad: z.string().min(1, 'La edad es obligatoria'),
  tipoVivienda: z.string().min(1, 'Debes indicar el tipo de vivienda'),
  detalleInmueble: z.string().min(5, 'Brinda un detalle de tu inmueble'),
  aceptacionDatos: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la política de privacidad' }),
  }),
});

export type AdoptionFormValues = z.infer<typeof AdoptionSchema>;
