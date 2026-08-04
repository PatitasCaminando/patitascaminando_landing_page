import React from 'react';
import { Publication } from '@/data/publications';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleHero } from '../organisms/ArticleHero';
import { ArticleBody } from '../organisms/ArticleBody';
import { ArticleContent } from '../organisms/ArticleContent';

interface ArticleTemplateProps {
  publication: Publication;
}

export const ArticleTemplate: React.FC<ArticleTemplateProps> = ({ publication }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <ArticleHero 
          category={publication.category}
          title={publication.title} 
          summary={publication.summary} 
          date={publication.publishedAt} 
          image={publication.coverImage} 
        />
        
        {/* Cuerpo del artículo dinámico */}
        <ArticleBody 
          title={publication.bodyTitle} 
          content={publication.bodyContent} 
        />
        
        {/* Usamos ArticleContent genérico para renderizar las cards dinámicas (Misión y Visión) */}
        <ArticleContent sections={publication.contentSections} />
      </main>

      <Footer />
    </div>
  );
};
