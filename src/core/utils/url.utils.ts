/**
 * Genera una URL amigable (slug) para un nombre de animal.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/[^\w-]+/g, '') // Elimina caracteres no alfanuméricos
    .replace(/--+/g, '-'); // Reemplaza múltiples guiones por uno solo
};

/**
 * Genera la URL para el detalle de un animal siguiendo la regla: /adopciones/{id}/{slug}
 * 
 * @param id El UUID del animal en base de datos
 * @param name El nombre del animal para generar el slug visual
 * @returns La ruta generada
 */
export const generateAnimalDetailUrl = (id: string, name: string): string => {
  const slug = slugify(name);
  return `/adopciones/${id}/${slug}`;
};

/**
 * Extrae el ID del animal a partir de los parámetros de la ruta.
 * Como la estructura es /adopciones/[id]/[slug], el id se obtiene directamente.
 * 
 * @param routeParams Los parámetros capturados en la ruta (ej. en Next.js `params.id`)
 * @returns El ID del animal o null si no existe
 */
export const extractAnimalIdFromRoute = (routeParams: { id?: string | string[] }): string | null => {
  if (!routeParams || !routeParams.id) return null;
  
  if (Array.isArray(routeParams.id)) {
    return routeParams.id[0] || null;
  }
  
  return routeParams.id;
};
