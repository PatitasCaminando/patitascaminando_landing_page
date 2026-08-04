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
    openGraph: {
      title: publication.seoTitle,
      description: publication.seoDescription,
      images: [imageUrl],
      type: 'article',
      publishedTime: publication.publishedAt,
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
