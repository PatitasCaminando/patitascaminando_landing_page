import { AnimalDTO } from '../types/api.types';
import { Animal } from '@/types';
import { getSupabaseMediaUrl } from '../utils/media.utils';

export const mapAnimalDTOToUI = (dto: AnimalDTO): Animal => {
  // Slug generator for UI navigation
  const slug = dto.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  // Resolve Image
  let imagePath = '';
  if (dto.images && dto.images.length > 0) {
    const primaryImage = dto.images.find((img: any) => img.isPrimary) || dto.images[0];
    imagePath = primaryImage.mediaId || primaryImage.path || primaryImage.url;
  } else if (dto.photoPaths && dto.photoPaths.length > 0) {
    imagePath = dto.photoPaths[0];
  }

  const imageUrl = imagePath ? getSupabaseMediaUrl(imagePath) : ''; 

  // Resolve Status CTA
  let cta = 'Conocer más';
  let detailCta = 'Quiero adoptarlo';
  
  const sexLower = (typeof dto.sex === 'string' ? dto.sex : '').toLowerCase();

  if (sexLower === 'macho') {
    cta = 'Conocerlo';
  } else if (sexLower === 'hembra') {
    cta = 'Conocerla';
    detailCta = 'Quiero adoptarla';
  } else if (sexLower.includes('y') || dto.species === 'ambos') {
    cta = 'Conocerlos';
    detailCta = 'Quiero adoptarlos';
  }

  if (dto.status === 'no_disponible' || dto.status === 'en_proceso' || dto.status === 'adoptado') {
    detailCta = 'No disponible por ahora';
  }

  // To map species into category exactly as expected by the UI
  let category = typeof dto.species === 'string' ? dto.species : 'No especificado';
  const categoryLower = category.toLowerCase();
  
  if (categoryLower === 'perro' && sexLower === 'hembra') category = 'Perra';
  if (categoryLower === 'gato' && sexLower === 'hembra') category = 'Gata';
  
  // Clean up format
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const capitalizedSex = (typeof dto.sex === 'string' ? dto.sex : 'No especificado').charAt(0).toUpperCase() + (typeof dto.sex === 'string' ? dto.sex : '').slice(1);

  return {
    id: dto.id,
    name: dto.name,
    slug: slug,
    category: capitalizedCategory,
    sex: capitalizedSex,
    age: typeof dto.approximateAge === 'string' ? dto.approximateAge : 'Desconocida',
    size: dto.size ? (dto.size.charAt(0).toUpperCase() + dto.size.slice(1)).replace(/_/g, ' ') : 'No especificado',
    status: typeof dto.status === 'string' ? dto.status : 'disponible',
    imageUrl: imageUrl,
    cta: cta,
    detailCta: detailCta,
    observation: dto.description || '', 
    sterilized: 'Sí', 
    vaccinated: 'Sí',
    dewormed: 'Sí',
  };
};

export const filterValidAnimals = (animals: AnimalDTO[]): AnimalDTO[] => {
  return animals.filter(animal => 
    animal.isActive === true && 
    animal.isPubliclyVisible === true && 
    animal.status !== 'archivado'
  );
};
