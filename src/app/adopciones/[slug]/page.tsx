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
import { AnimalsService } from '@/core/services/animals.service';
import { AdoptionsService } from '@/core/services/adoptions.service';
import { Animal } from '@/types';
import { HttpError } from '@/core/api/http-client';
import { ErrorStateTemplate } from '@/components/ui/ErrorStateTemplate';
import doodleGeneric from '@/assets/errors/error_generic.png';
import doodleInferiorIzquierdo from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_inferior_derecha.png';
import doodleInferiorDerecho from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_superior_derecha.png';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/loading.json';
import doodleCuerda from '@/assets/ilustraciones/doodles/doodle_cuerda_superior_derecha.png';
import doodleEsquinaSuperiorIzquierda from '@/assets/ilustraciones/doodles/doodle_marca_esquinero_superior_izquierdo.png';
import doodleEsquinaSuperiorDerecha from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_superior_derecha.png';
import doodleEsquinaInferiorDerecha from '@/assets/ilustraciones/doodles/adopt/doodle_marca_esquinero_inferior_derecha.png';
import doodlePatitas from '@/assets/ilustraciones/doodles/adopt/doodle_marca_patitas_naranjas.png';
import { 
  ChevronLeft, Share2, CheckCircle2, XCircle, PawPrint, 
  Cat, Dog, Info, Heart, ShieldCheck, Calendar, Ruler, Clock
} from 'lucide-react';

function getAnimalEmotionalPhrase(animal: { name: string; sex?: string; status: string; }): string {
  const name = animal.name;
  const sex = animal.sex?.toLowerCase() || '';

  const isPlural =
    sex === 'ambos' ||
    name.toLowerCase().startsWith('los ') ||
    name.toLowerCase().startsWith('las ');

  const phrases: Record<string, string> = {
    disponible: isPlural
      ? `Al adoptar a ${name}, les das una segunda oportunidad y ganas compañeros fieles para toda la vida.`
      : `Al adoptar a ${name}, le das una segunda oportunidad y ganas una compañía fiel para toda la vida.`,
    no_disponible: isPlural
      ? `${name} no están disponibles para adopción en este momento, pero puedes conocer su historia y acompañar su proceso.`
      : `${name} no está disponible para adopción en este momento, pero puedes conocer su historia y acompañar su proceso.`,
    en_proceso: isPlural
      ? `${name} ya se encuentran en proceso de adopción, una nueva oportunidad que puede cambiar sus vidas.`
      : `${name} ya se encuentra en proceso de adopción, una nueva oportunidad que puede cambiar su vida.`,
    adoptado: isPlural
      ? `${name} ya encontraron un hogar, y su historia nos recuerda que cada adopción responsable cambia vidas.`
      : `${name} ya encontró un hogar, y su historia nos recuerda que cada adopción responsable cambia una vida.`,
    archivado: 'Este perfil ya no se encuentra disponible.',
  };

  return phrases[animal.status] ?? '';
}

function getAnimalCareLabels(sex?: string) {
  const s = sex?.toLowerCase() || '';
  if (s === 'hembra') {
    return {
      sterilized: 'Esterilizada',
      vaccinated: 'Vacunada',
      dewormed: 'Desparasitada',
    };
  }

  if (s === 'ambos') {
    return {
      sterilized: 'Esterilizados',
      vaccinated: 'Vacunados',
      dewormed: 'Desparasitados',
    };
  }

  return {
    sterilized: 'Esterilizado',
    vaccinated: 'Vacunado',
    dewormed: 'Desparasitado',
  };
}

export default function AnimalDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [relatedAnimals, setRelatedAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offlineError, setOfflineError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      // Forzar que la página inicie desde arriba una vez cargada la información
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }, [isLoading]);

  React.useEffect(() => {
    const fetchAnimal = async () => {
      setIsLoading(true);
      
      try {
        const data = await AnimalsService.getAnimalBySlug(slug);
        setAnimal(data);
        
        if (data) {
          // Fetch related animals
          const response = await AnimalsService.getPublicAnimals({ limit: 10 });
          let related = response.items
            .filter(a => a.category === data.category && a.id !== data.id)
            .slice(0, 3);
            
          if (related.length < 3) {
            const moreRelated = response.items
              .filter(a => a.id !== data.id && !related.find(r => r.id === a.id))
              .slice(0, 3 - related.length);
            related = [...related, ...moreRelated];
          }
          setRelatedAnimals(related);
        }
      } catch (err) {
        console.error(err);
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          setOfflineError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchAnimal();
  }, [slug]);

  // Adoption Modal State
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isAdoptionLoading, setIsAdoptionLoading] = useState(false);
  const [isAdoptionSuccess, setIsAdoptionSuccess] = useState(false);
  const [isAdoptionErrorModalOpen, setIsAdoptionErrorModalOpen] = useState(false);
  const [adoptionError, setAdoptionError] = useState<string | null>(null);
  const [adoptionFormKey, setAdoptionFormKey] = useState(0);

  // Eliminamos los datos quemados para que el formulario aparezca en blanco
  const isLoggedIn = false;
  const mockUser = null;

  const handleAdoptionSubmit = async (data: any) => {
    setIsAdoptionLoading(true);
    setAdoptionError(null);
    
    try {
      console.log('Adoption request real payload:', data);
      await AdoptionsService.submitApplication(data);
      
      // Success path
      setIsAdoptionModalOpen(false);
      setIsAdoptionSuccess(true);
      setAdoptionFormKey(prev => prev + 1); // Resets form
    } catch (err: any) {
      console.error('Error submitting adoption:', err);
      
      if (err instanceof HttpError && err.statusCode === 400) {
        // Error de validación del backend: mantenemos el modal abierto
        const backendMessage = typeof err.data?.message === 'string' 
          ? err.data.message 
          : Array.isArray(err.data?.message) 
            ? err.data.message.join(', ') 
            : 'Error de validación del servidor.';
        setAdoptionError(backendMessage);
      } else {
        // Error 500 o de red: cerramos modal y mostramos error modal
        setIsAdoptionModalOpen(false);
        setIsAdoptionErrorModalOpen(true);
      }
    } finally {
      setIsAdoptionLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
          <Lottie animationData={loadingAnimation} loop={true} className="w-32 h-32" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!animal) {
    return (
      <main className="min-h-screen bg-[#FDF3E7] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col justify-center py-20 mt-16 relative">
          {/* Esquinero Inferior Izquierdo (cerca del footer) */}
          <img 
            src={doodleInferiorIzquierdo.src} 
            alt="" 
            aria-hidden="true"
            className="absolute -bottom-10 md:-bottom-16 lg:-bottom-24 -left-6 md:-left-10 lg:-left-14 w-32 md:w-48 lg:w-72 z-0 pointer-events-none" 
          />
          {/* Esquinero Inferior Derecho (cerca del footer) */}
          <img 
            src={doodleInferiorDerecho.src} 
            alt="" 
            aria-hidden="true"
            className="absolute -bottom-8 md:-bottom-12 lg:-bottom-16 -right-6 md:-right-10 lg:-right-14 w-40 md:w-64 lg:w-96 z-0 pointer-events-none" 
          />
          <ErrorStateTemplate
            title={offlineError ? "Sin Conexión" : "Animalito no encontrado"}
            message={offlineError ? "No pudimos cargar esta información porque no hay conexión y aún no existe una versión guardada." : "No pudimos encontrar esta ficha de adopción. Puedes volver a la sección de adopciones para conocer a otros rescatados."}
            doodleSrc={doodleGeneric.src}
            doodleClassName="w-80 sm:w-96 md:w-[26rem] lg:w-[30rem] xl:w-[36rem] max-w-full drop-shadow-sm pointer-events-none -mb-10 md:-mb-14 lg:-mb-20"
            primaryActionLabel="Volver a adopciones"
            primaryActionHref="/#adopciones"
            isGlobal={true}
            isOfflineState={offlineError}
          />
        </div>
        <Footer />
      </main>
    );
  }

  const isAvailable = animal.status === 'disponible';
    
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

  const animalStatusMap: Record<string, { label: string; textClass: string; bgClass: string; icon: React.ReactNode }> = {
    disponible: { label: 'Adopción disponible', textClass: 'text-[#4CA456]', bgClass: 'bg-[#E6F4EA]', icon: <CheckCircle2 size={16} /> },
    en_proceso: { label: 'En proceso', textClass: 'text-[#62D9D9]', bgClass: 'bg-[#EAF4F5]', icon: <Clock size={16} /> },
    adoptado: { label: 'Adoptado', textClass: 'text-[#8A969B]', bgClass: 'bg-[#F1F3F4]', icon: <Heart size={16} /> },
    no_disponible: { label: 'No disponible', textClass: 'text-[#F69222]', bgClass: 'bg-[#FFF7EA]', icon: <Info size={16} /> },
    archivado: { label: 'Archivado', textClass: 'text-[#8A969B]', bgClass: 'bg-[#F1F3F4]', icon: <Info size={16} /> },
  };

  const statusConfig = animalStatusMap[animal.status] || animalStatusMap.no_disponible;
  const canAdopt = animal.status === 'disponible' && (animal as any).isActive !== false && (animal as any).isPubliclyVisible !== false;

  const adoptionBlockedMessages: Record<string, string> = {
    en_proceso: 'En proceso de adopción',
    adoptado: 'Ya encontró un hogar',
    no_disponible: 'No se puede iniciar adopción',
    archivado: 'Perfil no disponible',
  };

  const careLabels = getAnimalCareLabels(animal.sex);

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
          className="absolute -top-4 -left-4 md:-top-6 md:-left-6 lg:-top-8 lg:-left-8 w-48 sm:w-64 md:w-80 lg:w-[400px] xl:w-[500px] pointer-events-none select-none z-0 block"
        />
        {/* Doodle Esquina Superior Derecha */}
        <img 
          src={doodleEsquinaSuperiorDerecha.src} 
          alt="" 
          aria-hidden="true" 
          className="absolute -top-16 -right-16 md:-top-24 md:-right-24 lg:-top-32 lg:-right-32 xl:-top-40 xl:-right-40 w-48 sm:w-64 md:w-80 lg:w-[400px] xl:w-[500px] pointer-events-none select-none z-0 block"
        />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
            
            {/* Image (Left on Desktop, order 1 on mobile) */}
            <div className="w-full lg:w-[45%] xl:w-[45%] order-1 lg:order-1 relative">
              <div className="w-full h-[350px] sm:h-[450px] lg:h-full min-h-[550px] lg:min-h-[600px] rounded-[32px] overflow-hidden relative shadow-patitas-sm group bg-gray-100">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Lottie animationData={loadingAnimation} loop={true} className="w-20 h-20 opacity-60" />
                  </div>
                )}
                <img 
                  src={typeof animal.imageUrl === 'string' ? animal.imageUrl : animal.imageUrl?.src}
                  alt={`Foto de ${animal.name}`}
                  onLoad={() => setIsImageLoading(false)}
                  className={`w-[110%] h-[110%] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 group-hover:scale-105 ${isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
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
              
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#153970]">{animal.name}</h1>
                
                <div className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-transparent ${statusConfig.bgClass} ${statusConfig.textClass} ${animal.status === 'no_disponible' ? '!border-[#FFE2C2]' : ''}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </div>
              </div>
              <div className={`animal-card-status-divider animal-card-status-divider--${animal.status} !ml-0 mb-6 w-[72px]`}></div>

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
                  <div className="text-[#153970] font-bold">{animal.age || '-'}</div>
                </div>

                <div className="bg-[#FDF3E7] rounded-2xl p-3 border border-[#F1D9BD]">
                  <div className="flex items-center gap-1.5 text-[#5F6B70] text-xs font-semibold mb-1 uppercase tracking-wider">
                    <Ruler size={16} className="text-[#F69222]" /> Tamaño
                  </div>
                  <div className="text-[#153970] font-bold">{animal.size && animal.size !== 'No especificado' ? animal.size.charAt(0).toUpperCase() + animal.size.slice(1).toLowerCase() : 'No especificado'}</div>
                </div>

                {/* Health Chips */}
                <div className="bg-white rounded-2xl p-3 border border-[#F1D9BD] col-span-1 lg:col-span-1 flex items-center justify-between">
                  <span className="text-[#5F6B70] text-xs font-semibold uppercase">{careLabels.sterilized}</span>
                  {animal.sterilized === 'Sí' ? <ShieldCheck size={22} className="text-[#4CA456]" /> : <XCircle size={22} className="text-[#8A969B]" />}
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#F1D9BD] col-span-1 lg:col-span-1 flex items-center justify-between">
                  <span className="text-[#5F6B70] text-xs font-semibold uppercase">{careLabels.vaccinated}</span>
                  {animal.vaccinated === 'Sí' ? <ShieldCheck size={22} className="text-[#4CA456]" /> : <XCircle size={22} className="text-[#8A969B]" />}
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#F1D9BD] col-span-1 lg:col-span-2 flex items-center justify-between">
                  <span className="text-[#5F6B70] text-xs font-semibold uppercase">{careLabels.dewormed}</span>
                  {animal.dewormed === 'Sí' ? <ShieldCheck size={22} className="text-[#4CA456]" /> : <XCircle size={22} className="text-[#8A969B]" />}
                </div>

              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto w-full items-stretch">
                {canAdopt ? (
                  <Button 
                    variant="primary" 
                    className="w-full sm:w-auto sm:flex-1 rounded-full py-4 px-4 text-lg shadow-md flex items-center justify-center gap-2"
                    onClick={() => setIsAdoptionModalOpen(true)}
                  >
                    <PawPrint size={20} />
                    {animal.detailCta}
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    disabled
                    className="w-full sm:w-auto sm:flex-1 rounded-full py-4 px-4 text-lg shadow-md flex items-center justify-center gap-2 opacity-60 cursor-not-allowed pointer-events-none bg-[#EAF4F5] text-[#5F6B70] border-none"
                  >
                    <PawPrint size={20} className="shrink-0" />
                    <span className="truncate">
                      {adoptionBlockedMessages[animal.status] || 'No disponible'}
                    </span>
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                  className="w-full sm:w-auto sm:flex-none rounded-full py-4 px-4 sm:px-8 border-2 border-[#F1D9BD] text-[#5F6B70] hover:bg-[#FDF3E7] hover:border-[#F69222] hover:!text-[#F69222] transition-colors flex items-center justify-center gap-2 bg-white"
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
                {getAnimalEmotionalPhrase(animal)}
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
            <h3 className="text-xl font-bold text-[#153970] mb-6 relative z-10 pr-12 md:pr-0">Cuidados y <br className="block sm:hidden" /> características</h3>
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
          className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 lg:-bottom-24 lg:-right-24 xl:-bottom-28 xl:-right-28 w-40 sm:w-56 md:w-64 lg:w-[320px] xl:w-[380px] pointer-events-none select-none z-0 block"
        />
      </div>

      <Footer />
      
      {/* Modals de Adopción */}
      <AdoptionRequestModal
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
        onSubmit={handleAdoptionSubmit}
        animal={animal}
        loading={isAdoptionLoading}
        error={adoptionError}
      />

      <AdoptionSuccessModal
        key={`success-${adoptionFormKey}`}
        isOpen={isAdoptionSuccess}
        onClose={() => setIsAdoptionSuccess(false)}
        animal={animal}
      />

      <AdoptionErrorModal
        isOpen={isAdoptionErrorModalOpen}
        onClose={() => setIsAdoptionErrorModalOpen(false)}
        onRetry={() => {
          setIsAdoptionErrorModalOpen(false);
          setIsAdoptionModalOpen(true);
        }}
        isOfflineState={offlineError || (typeof navigator !== 'undefined' && !navigator.onLine)}
      />
    </main>
  );
}
