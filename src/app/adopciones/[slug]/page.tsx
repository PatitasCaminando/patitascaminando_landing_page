'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RelatedAnimalsSlider } from '@/components/organisms/RelatedAnimalsSlider';
import { AdoptionRequestModal } from '@/components/organisms/AdoptionRequestModal';
import { AdoptionSuccessModal } from '@/components/organisms/AdoptionSuccessModal';
import { AdoptionErrorModal } from '@/components/organisms/AdoptionErrorModal';
import { Button } from '@/components/ui/Button';
import { featuredAnimals } from '@/data/animals';
import doodleCuerda from '@/assets/ilustraciones/doodles/doodle_cuerda_superior_derecha.png';
import doodleEsquinaSuperiorIzquierda from '@/assets/ilustraciones/doodles/doodle_marca_esquinero_superior_izquierdo.png';
import doodleEsquinaSuperiorDerecha from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_superior_derecha.png';
import doodleEsquinaInferiorDerecha from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_inferior_derecha.png';
import doodlePatitas from '@/assets/ilustraciones/doodles/adopt/doodle_marca_patitas_naranjas.png';
import { 
  ChevronLeft, Share2, CheckCircle2, XCircle, PawPrint, 
  Cat, Dog, Info, Heart, ShieldCheck, Calendar, Ruler 
} from 'lucide-react';

export default function AnimalDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  // Adoption Modal State
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isAdoptionLoading, setIsAdoptionLoading] = useState(false);
  const [isAdoptionSuccess, setIsAdoptionSuccess] = useState(false);
  const [isAdoptionErrorModalOpen, setIsAdoptionErrorModalOpen] = useState(false);
  const [adoptionError, setAdoptionError] = useState<string | null>(null);
  const [adoptionFormKey, setAdoptionFormKey] = useState(0);

  // Mocked Auth State for demo purposes
  const isLoggedIn = true;
  const mockUser = {
    nombres: 'María',
    apellidos: 'Gómez',
    direccion: 'Av. Siempre Viva 123',
    edad: 28
  };

  const handleAdoptionSubmit = async (data: any) => {
    setIsAdoptionLoading(true);
    setAdoptionError(null);
    
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // throw new Error("Test error"); // Forzando el error para probar el Sad Path
      setIsAdoptionModalOpen(false);
      setIsAdoptionSuccess(true);
      setAdoptionFormKey(prev => prev + 1);
      console.log('Adoption request payload:', data);
    } catch (err) {
      setIsAdoptionModalOpen(false);
      setIsAdoptionErrorModalOpen(true);
    } finally {
      setIsAdoptionLoading(false);
    }
  };
  
  const animal = featuredAnimals.find(a => a.slug === slug);

  if (!animal) {
    return (
      <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
          <PawPrint size={64} className="text-[#F1D9BD] mb-4" />
          <h1 className="text-3xl font-extrabold text-[#153970] mb-2">Animalito no encontrado</h1>
          <p className="text-[#5F6B70] max-w-md mx-auto mb-8">
            No pudimos encontrar esta ficha de adopción. Puedes volver a la sección de adopciones para conocer a otros rescatados.
          </p>
          <Link href="/#adopciones">
            <Button variant="primary" size="lg" className="rounded-full px-8 flex items-center gap-2">
              <ChevronLeft size={18} />
              Volver a adopciones
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const isAvailable = animal.status === 'Adopción disponible';

  // Obtener animales relacionados (misma especie, excluir actual)
  const relatedAnimals = featuredAnimals
    .filter(a => a.slug !== slug && a.category === animal.category)
    .slice(0, 4);
    
  // Si no hay suficientes, rellenar con otros
  if (relatedAnimals.length < 3) {
    const moreRelated = featuredAnimals
      .filter(a => a.slug !== slug && !relatedAnimals.find(r => r.slug === a.slug))
      .slice(0, 4 - relatedAnimals.length);
    relatedAnimals.push(...moreRelated);
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Conoce a ${animal.name} - Patitas Caminando`,
          text: animal.observation,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSpeciesIcon = () => {
    switch (animal.category.toLowerCase()) {
      case 'perro':
      case 'perra': return <Dog size={16} className="text-[#F69222]" />;
      case 'gata':
      case 'gato': return <Cat size={16} className="text-[#F69222]" />;
      default: return <PawPrint size={16} className="text-[#F69222]" />;
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-inter">
      <Header />

      {/* Expanded Hero Section */}
      <section className="relative z-10 overflow-hidden bg-[#FFF7EA] pt-32 pb-16 md:pt-40 md:pb-24 w-full">
        {/* Doodle Esquina Superior Izquierda */}
        <img 
          src={doodleEsquinaSuperiorIzquierda.src} 
          alt="" 
          aria-hidden="true" 
          className="absolute -top-4 -left-4 md:-top-6 md:-left-6 lg:-top-8 lg:-left-8 w-48 sm:w-64 md:w-80 lg:w-[400px] xl:w-[500px] opacity-30 pointer-events-none select-none z-0 block"
        />
        {/* Doodle Esquina Superior Derecha */}
        <img 
          src={doodleEsquinaSuperiorDerecha.src} 
          alt="" 
          aria-hidden="true" 
          className="absolute -top-16 -right-16 md:-top-24 md:-right-24 lg:-top-32 lg:-right-32 xl:-top-40 xl:-right-40 w-48 sm:w-64 md:w-80 lg:w-[400px] xl:w-[500px] opacity-30 pointer-events-none select-none z-0 block"
        />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
            
            {/* Image (Left on Desktop, order 1 on mobile) */}
            <div className="w-full lg:w-[45%] xl:w-[45%] order-1 lg:order-1 relative">
              <div className="w-full h-[350px] sm:h-[450px] lg:h-full min-h-[550px] lg:min-h-[600px] rounded-[32px] overflow-hidden relative shadow-patitas-sm">
                <img 
                  src={typeof animal.imageUrl === 'string' ? animal.imageUrl : animal.imageUrl?.src}
                  alt={animal.name}
                  className="w-full h-full object-cover absolute inset-0 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Info (Right on Desktop, order 2 on mobile) */}
            <div className="w-full lg:w-[55%] xl:w-[55%] flex flex-col justify-center order-2 lg:order-2 relative z-10 py-6 lg:py-0">
              
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm font-medium text-[#F69222] mb-6 md:mb-10">
                <Link href="/#adopciones" className="hover:underline flex items-center gap-1">
                  <PawPrint size={14} />
                  Adopciones
                </Link>
                <span className="text-[#F1D9BD]">/</span>
                <span className="text-[#5F6B70]">{animal.name}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#153970]">{animal.name}</h1>
                
                <div className={`flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full ${
                  isAvailable ? 'bg-[#E6F4EA] text-[#4CA456]' : 'bg-[#FFEBEE] text-[#E86F61]'
                }`}>
                  {isAvailable ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  {animal.status}
                </div>
              </div>

              <p className="text-[#5F6B70] text-lg mb-8 leading-relaxed max-w-2xl">
                {animal.observation || `Descubre a ${animal.name}, ¡está buscando un hogar lleno de amor!`}
              </p>

              {/* Chips Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                
                <div className="bg-[#FDF3E7] rounded-2xl p-3 border border-[#F1D9BD]">
                  <div className="flex items-center gap-1.5 text-[#5F6B70] text-xs font-semibold mb-1 uppercase tracking-wider">
                    {getSpeciesIcon()} Especie
                  </div>
                  <div className="text-[#153970] font-bold">{animal.category}</div>
                </div>

                <div className="bg-[#FDF3E7] rounded-2xl p-3 border border-[#F1D9BD]">
                  <div className="flex items-center gap-1.5 text-[#5F6B70] text-xs font-semibold mb-1 uppercase tracking-wider">
                    <Heart size={16} className="text-[#F69222]" /> Sexo
                  </div>
                  <div className="text-[#153970] font-bold">{animal.sex || '-'}</div>
                </div>

                <div className="bg-[#FDF3E7] rounded-2xl p-3 border border-[#F1D9BD]">
                  <div className="flex items-center gap-1.5 text-[#5F6B70] text-xs font-semibold mb-1 uppercase tracking-wider">
                    <Calendar size={16} className="text-[#F69222]" /> Rango edad
                  </div>
                  <div className="text-[#153970] font-bold">{animal.ageRange || '-'} años</div>
                </div>

                <div className="bg-[#FDF3E7] rounded-2xl p-3 border border-[#F1D9BD]">
                  <div className="flex items-center gap-1.5 text-[#5F6B70] text-xs font-semibold mb-1 uppercase tracking-wider">
                    <Ruler size={16} className="text-[#F69222]" /> Tamaño
                  </div>
                  <div className="text-[#153970] font-bold">{animal.size || 'No especificado'}</div>
                </div>

                {/* Health Chips */}
                <div className="bg-white rounded-2xl p-3 border border-[#F1D9BD] col-span-1 lg:col-span-1 flex items-center justify-between">
                  <span className="text-[#5F6B70] text-xs font-semibold uppercase">Esterilizado</span>
                  {animal.sterilized === 'Sí' ? <ShieldCheck size={22} className="text-[#4CA456]" /> : <XCircle size={22} className="text-[#8A969B]" />}
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#F1D9BD] col-span-1 lg:col-span-1 flex items-center justify-between">
                  <span className="text-[#5F6B70] text-xs font-semibold uppercase">Vacunado</span>
                  {animal.vaccinated === 'Sí' ? <ShieldCheck size={22} className="text-[#4CA456]" /> : <XCircle size={22} className="text-[#8A969B]" />}
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#F1D9BD] col-span-1 lg:col-span-2 flex items-center justify-between">
                  <span className="text-[#5F6B70] text-xs font-semibold uppercase">Desparasitado</span>
                  {animal.dewormed === 'Sí' ? <ShieldCheck size={22} className="text-[#4CA456]" /> : <XCircle size={22} className="text-[#8A969B]" />}
                </div>

              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  variant="primary" 
                  className={`flex-1 rounded-full py-4 text-lg shadow-md flex items-center justify-center gap-2 ${!isAvailable ? '!bg-[#FFEBEE] !text-[#E86F61] border border-[#FFCDD2] cursor-not-allowed hover:!bg-[#FFEBEE]' : ''}`}
                  onClick={() => {
                    if (isAvailable) {
                      if (!isLoggedIn) {
                        alert('Por favor inicia sesión o regístrate para continuar con el proceso de adopción.');
                      } else {
                        setIsAdoptionModalOpen(true);
                      }
                    }
                  }}
                >
                  <PawPrint size={20} />
                  {animal.detailCta}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                  className="rounded-full py-4 px-8 border-2 border-[#F1D9BD] text-[#5F6B70] hover:bg-[#FDF3E7] hover:border-[#F69222] hover:!text-[#F69222] transition-colors flex items-center justify-center gap-2 bg-white"
                >
                  <Share2 size={20} />
                  {copied ? '¡Copiado!' : 'Compartir'}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Content Section below Hero */}
      <div className="flex-1 w-full relative overflow-x-clip">
        
        {/* Doodle Cuerda (Flipped to left) */}
        <img 
          src={doodleCuerda.src} 
          alt="" 
          aria-hidden="true" 
          className="absolute -top-6 -left-10 md:-left-16 lg:-left-20 xl:-left-12 w-56 sm:w-72 md:w-80 lg:w-[400px] xl:w-[450px] opacity-30 pointer-events-none select-none z-0 scale-x-[-1]"
        />

        <div className="max-w-6xl mx-auto w-full px-4 py-16 relative z-10">
          
          {/* Content Section (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-patitas-sm border border-[#F1D9BD] relative overflow-hidden h-full flex flex-col justify-center">
            <Heart className="absolute top-6 right-6 w-12 h-12 md:w-20 md:h-20 text-[#F69222] opacity-50 rotate-12 pointer-events-none" />
            <h2 className="text-2xl font-bold text-[#153970] mb-6 relative z-10">Sobre {animal.name}</h2>
            <div className="relative z-10">
              <p className="text-[#5F6B70] leading-relaxed">{animal.observation || `${animal.name} está esperando pacientemente a su familia definitiva.`}</p>
              <p className="mt-4 text-[#F69222] font-semibold">
                Al adoptar a {animal.name}, le das una segunda oportunidad y ganas un compañero fiel para toda la vida.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-patitas-sm border border-[#F1D9BD] h-full flex flex-col justify-center relative overflow-hidden">
            <img 
              src={doodlePatitas.src} 
              alt="" 
              aria-hidden="true" 
              className="absolute top-6 right-6 w-12 md:w-20 lg:w-24 rotate-12 pointer-events-none opacity-50"
            />
            <h3 className="text-xl font-bold text-[#153970] mb-6 relative z-10">Cuidados y características</h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex gap-3">
                <div className="bg-[#FDF3E7] text-[#F69222] p-2 rounded-full shrink-0 h-10 w-10 flex items-center justify-center">
                  <PawPrint size={18} />
                </div>
                <p className="text-sm text-[#5F6B70] pt-1">Necesita un hogar responsable y comprometido.</p>
              </li>
              <li className="flex gap-3">
                <div className="bg-[#FDF3E7] text-[#F69222] p-2 rounded-full shrink-0 h-10 w-10 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-sm text-[#5F6B70] pt-1">Se entrega con seguimiento y compromiso de adopción.</p>
              </li>
              <li className="flex gap-3">
                <div className="bg-[#FDF3E7] text-[#F69222] p-2 rounded-full shrink-0 h-10 w-10 flex items-center justify-center">
                  <Heart size={18} />
                </div>
                <p className="text-sm text-[#5F6B70] pt-1">Requiere tiempo, paciencia, cariño y adaptación.</p>
              </li>
              <li className="flex gap-3">
                <div className="bg-[#FDF3E7] text-[#F69222] p-2 rounded-full shrink-0 h-10 w-10 flex items-center justify-center">
                  <Info size={18} />
                </div>
                <p className="text-sm text-[#5F6B70] pt-1">Ideal para familias dispuestas a brindar cuidado continuo.</p>
              </li>
            </ul>
          </div>

        </div>

        {/* Related Animals */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-[#153970] mb-6">También te pueden interesar</h2>
          <RelatedAnimalsSlider animals={relatedAnimals} />
        </div>

        </div>
        
        {/* Doodle Esquina Inferior Derecha */}
        <img 
          src={doodleEsquinaInferiorDerecha.src} 
          alt="" 
          aria-hidden="true" 
          className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 lg:-bottom-24 lg:-right-24 xl:-bottom-28 xl:-right-28 w-40 sm:w-56 md:w-64 lg:w-[320px] xl:w-[380px] opacity-30 pointer-events-none select-none z-0 block"
        />
      </div>

      <Footer />
      
      <AdoptionRequestModal
        key={`adoption-form-${adoptionFormKey}`}
        isOpen={isAdoptionModalOpen}
        onClose={() => {
          setIsAdoptionModalOpen(false);
        }}
        onSubmit={handleAdoptionSubmit}
        animal={animal}
        user={isLoggedIn ? mockUser : null}
        loading={isAdoptionLoading}
        error={adoptionError}
      />

      <AdoptionSuccessModal
        isOpen={isAdoptionSuccess}
        onClose={() => setIsAdoptionSuccess(false)}
        animal={animal}
      />

      <AdoptionErrorModal
        isOpen={isAdoptionErrorModalOpen}
        onRetry={() => {
          setIsAdoptionErrorModalOpen(false);
          setIsAdoptionModalOpen(true);
        }}
        onClose={() => setIsAdoptionErrorModalOpen(false)}
      />
    </main>
  );
}
