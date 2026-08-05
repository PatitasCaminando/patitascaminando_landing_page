import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicationBySlug, publications } from '@/data/publications';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const publication = getPublicationBySlug(resolvedParams.slug);

  if (!publication) {
    return {
      title: 'Publicación no encontrada',
    };
  }

  // Handle the image url for Open Graph
  // StaticImageData has a src property, otherwise use the string
  const imageUrl = typeof publication.coverImage === 'object' 
    ? publication.coverImage.src 
    : publication.coverImage;

  return {
    title: publication.seoTitle,
    description: publication.seoDescription,
    keywords: [
      'Patitas Caminando', 
      'rescate animal Quito', 
      'adopción de perros y gatos', 
      'fundación rescate animal', 
      'Quito', 
      'Ecuador', 
      'animales vulnerables', 
      'voluntariado animal'
    ],
    authors: [{ name: 'Patitas Caminando' }],
    creator: 'Patitas Caminando',
    publisher: 'Patitas Caminando',
    alternates: {
      canonical: `/publicaciones/${resolvedParams.slug}`,
    },
    openGraph: {
      title: publication.seoTitle,
      description: publication.seoDescription,
      siteName: 'Patitas Caminando',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: publication.title,
        }
      ],
      locale: 'es_EC',
      type: 'article',
      publishedTime: publication.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.seoTitle,
      description: publication.seoDescription,
      images: [imageUrl],
    },
    other: {
      'geo.region': 'EC-P',
      'geo.placename': 'Quito',
      'geo.position': '-0.180653;-78.467834',
      'ICBM': '-0.180653, -78.467834',
    },
  };
}

export default async function PublicationPage({ params }: Props) {
  const resolvedParams = await params;
  const publication = getPublicationBySlug(resolvedParams.slug);

  if (!publication) {
    notFound();
  }

  return <ArticleTemplate publication={publication} />;
}
