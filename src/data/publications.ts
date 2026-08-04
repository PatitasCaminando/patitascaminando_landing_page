import perrito7 from '@/assets/perritos/perrito7.jpg';

export interface ContentSection {
  title: string;
  content: string;
  icon?: string;
}

export interface Publication {
  title: string;
  slug: string;
  category: string;
  summary: string;
  bodyTitle?: string;
  bodyContent?: string[];
  coverImage: any; // We can use Next.js StaticImageData or any
  publishedAt: string;
  contentSections: ContentSection[];
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
}

export const publications: Publication[] = [
  {
    title: "Sobre Patitas Caminando",
    slug: "sobre-patitas-caminando",
    category: "Historia",
    summary: "Patitas Caminando fue creada en febrero de 2023 con el propósito de cambiar el destino de animales de compañía que han sido olvidados, abandonados o maltratados. Su labor nace del compromiso por brindar refugio, atención y nuevas oportunidades a quienes más lo necesitan.",
    bodyTitle: "Nuestra historia: caminando por segundas oportunidades",
    bodyContent: [
      "Patitas Caminando nació en febrero de 2023 con el objetivo de cambiar el destino de animales de compañía que han sido olvidados, abandonados o maltratados. Desde sus primeros pasos, la organización ha buscado brindar una respuesta solidaria a quienes no tienen voz, promoviendo el rescate, el cuidado y la reintegración responsable de perros y gatos en situación de vulnerabilidad.",
      "Su labor se sostiene en el compromiso de personas que creen en una sociedad más consciente, empática y activa frente al bienestar animal. A través del refugio, la atención veterinaria, la difusión de casos y la búsqueda de hogares responsables, Patitas Caminando trabaja para que cada animal tenga una nueva oportunidad de vivir con dignidad, seguridad y cariño.",
      "Más que una organización, Patitas Caminando representa una comunidad en movimiento. Cada adopción, cada donación de alimento, cada reporte solidario y cada acción educativa suma a una causa común: proteger la vida animal y construir un futuro más respetuoso con la fauna urbana.",
      "Para mantener vivo este compromiso, guiamos nuestra labor bajo los siguientes pilares fundamentales:"
    ],
    coverImage: perrito7,
    publishedAt: "15 de Julio, 2026",
    contentSections: [
      {
        title: "Misión",
        content: "Dar segundas oportunidades a los animales de compañía en condición de vulnerabilidad, ofreciéndoles refugio, atención veterinaria y buscando un nuevo hogar para ellos, involucrando activamente a la comunidad.",
        icon: "heart"
      },
      {
        title: "Visión",
        content: "Ser una organización que transforma vidas mediante el rescate y la reintegración responsable de animales de compañía, construyendo una sociedad más consciente, solidaria y comprometida con la protección de la fauna urbana.",
        icon: "target"
      }
    ],
    seoTitle: "Sobre Patitas Caminando | Patitas Caminando",
    seoDescription: "Conoce la historia, misión y visión de Patitas Caminando, una organización dedicada al rescate, cuidado y protección de animales en situación de vulnerabilidad.",
  }
];

export const getPublicationBySlug = (slug: string): Publication | undefined => {
  return publications.find(p => p.slug === slug);
};
