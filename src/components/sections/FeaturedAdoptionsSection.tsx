'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AnimalCard } from '../ui/AnimalCard';
import { AnimalsService } from '@/core/services/animals.service';
import { Animal } from '@/types';
import { Button } from '../ui/Button';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/loading.json';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, PawPrint, Calendar } from 'lucide-react';
import doodlePatitasIzqSup from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_izquierda_superior.png';
import doodlePatitasIzqInf from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_izquierda_inferior.png';
import doodlePatitasDerInf from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_derecha_inferior.png';
import { EmptyState } from '../ui/EmptyState';
import { ApiErrorState } from '../ui/ApiErrorState';

// Icono simple de Sexo si no está en lucide
const SexIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="10" r="4" />
    <path d="M12 14v7" />
    <path d="M9 18h6" />
  </svg>
);

const ITEMS_PER_PAGE = 10;

export const FeaturedAdoptionsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    especie: 'Todas',
    sexo: 'Todos',
    edad: 'Todos',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const getAgeInMonths = (ageStr: string) => {
    if (!ageStr) return 12;
    const lower = ageStr.toLowerCase();
    
    let years = 0;
    let months = 0;

    const match = lower.match(/\d+/);
    if (match) {
      const val = parseInt(match[0], 10);
      if (lower.includes('mes')) {
        months = val;
      } else {
        years = val;
      }
    } else {
      if (lower.includes('un mes')) months = 1;
      else if (lower.includes('un año') || lower.includes('año')) years = 1;
    }

    if (lower.includes('y medio')) {
      months += 6;
    }

    return (years * 12) + months;
  };

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [totalApiAnimals, setTotalApiAnimals] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAnimals = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      // Traemos más límite para que funcione el frontend filtering si es necesario,
      // o idealmente el filtrado se haría por API en un futuro.
      const response = await AnimalsService.getPublicAnimals({ page: 1, limit: 50 });
      setAnimals(response.items);
      setTotalApiAnimals(response.total || response.items.length);
    } catch (error: any) {
      console.error('Error fetching animals:', error);
      setErrorMsg(error.message || 'Error fetching animals');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const filteredAnimals = useMemo(() => {
    if (!isExpanded) return animals.slice(0, 4); // Default view: 4 items
    
    return animals.filter(animal => {
      // Especie Filter
      let matchEspecie = true;
      if (filters.especie !== 'Todas') {
        const cat = animal.category.toLowerCase();
        const fEsp = filters.especie.toLowerCase();
        if (fEsp === 'perro') {
          matchEspecie = cat === 'perro' || cat === 'perra';
        } else if (fEsp === 'gato') {
          matchEspecie = cat === 'gato' || cat === 'gata';
        } else {
          matchEspecie = cat === fEsp;
        }
      }

      // Sexo Filter
      let matchSexo = true;
      if (filters.sexo !== 'Todos') {
        const sex = (animal.sex || '').toLowerCase();
        const fSex = filters.sexo.toLowerCase();
        
        if (fSex === 'hembra y macho') {
          matchSexo = sex === 'ambos' || sex === 'hembra y macho';
        } else {
          matchSexo = sex === fSex;
        }
      }

      // Edad Filter
      let matchEdad = true;
      if (filters.edad !== 'Todos') {
        const months = getAgeInMonths(animal.age || '');
        if (filters.edad === '0 a 6 meses') matchEdad = months >= 0 && months <= 6;
        else if (filters.edad === '7 a 12 meses') matchEdad = months > 6 && months <= 12;
        else if (filters.edad === '1 a 3 años') matchEdad = months >= 12 && months <= 36;
        else if (filters.edad === '4 a 7 años') matchEdad = months > 36 && months <= 84;
        else if (filters.edad === '8 años o más') matchEdad = months > 84;
      }

      return matchEspecie && matchSexo && matchEdad;
    });
  }, [isExpanded, filters, animals]);

  const totalPages = Math.ceil(filteredAnimals.length / ITEMS_PER_PAGE);
  const currentAnimals = isExpanded 
    ? filteredAnimals.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filteredAnimals;

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset page on filter
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setFilters({ especie: 'Todas', sexo: 'Todos', edad: 'Todos' });
      setCurrentPage(1);
    }
  };

  return (
    <section id="adopciones" className="pt-36 pb-24 md:py-24 px-4 bg-[#FDF3E7] relative overflow-hidden transition-all duration-500">
      {/* Decorative Doodles */}
      <img 
        src={doodlePatitasIzqSup.src} 
        alt="" 
        aria-hidden="true"
        className="absolute top-0 left-0 w-24 md:w-32 lg:w-40 opacity-60 pointer-events-none z-0" 
      />
      <img 
        src={doodlePatitasIzqInf.src} 
        alt="" 
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-48 md:w-64 lg:w-80 opacity-60 pointer-events-none z-0" 
      />
      <img 
        src={doodlePatitasDerInf.src} 
        alt="" 
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-32 md:w-48 lg:w-56 opacity-60 pointer-events-none z-0" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#153970] mb-4">
              Conoce a nuestros animalitos
            </h2>
            <p className="text-lg text-[#5F6B70]">
              Todos esperan un hogar lleno de amor. ¿Y si el suyo ya está esperándolos?
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={toggleExpand}
            className="border-[#F69222] text-[#F69222] rounded-full px-6 flex items-center gap-2 hover:bg-[#F69222] hover:text-white transition-colors shrink-0 bg-transparent group"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={20} className="group-hover:text-white transition-colors" />
                Ocultar todos los rescatados
              </>
            ) : (
              <>
                <ChevronDown size={20} className="group-hover:text-white transition-colors" />
                Ver todos los rescatados
              </>
            )}
          </Button>
        </div>
        
        {/* Filtros para vista expandida */}
        {isExpanded && (
          <div className="bg-white/50 backdrop-blur-sm border border-[#F1D9BD] rounded-3xl p-4 md:py-4 md:px-6 mb-8 flex flex-col xl:flex-row flex-wrap gap-5 xl:gap-8 items-start xl:items-center opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]">
            
            {/* Especie */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-[#F69222] font-semibold">
                <PawPrint size={18} />
                <span className="text-[#5F6B70]">Especie</span>
              </div>
              <select 
                value={filters.especie} 
                onChange={(e) => handleFilterChange('especie', e.target.value)}
                className="bg-transparent border border-[#F1D9BD] rounded-full px-4 py-2 text-[#5F6B70] font-medium outline-none focus:border-[#F69222] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%23F69222%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] pr-10"
              >
                <option value="Todas">Todas</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>

            {/* Sexo */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-[#F69222] font-semibold">
                <SexIcon className="w-5 h-5" />
                <span className="text-[#5F6B70]">Sexo</span>
              </div>
              <select 
                value={filters.sexo} 
                onChange={(e) => handleFilterChange('sexo', e.target.value)}
                className="bg-transparent border border-[#F1D9BD] rounded-full px-4 py-2 text-[#5F6B70] font-medium outline-none focus:border-[#F69222] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%23F69222%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] pr-10"
              >
                <option value="Todos">Todos</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
                <option value="Hembra y macho">Hembra y macho</option>
              </select>
            </div>

            {/* Edad */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-[#F69222] font-semibold shrink-0">
                <Calendar size={18} />
                <span className="text-[#5F6B70]">Rango de edad</span>
              </div>
              {/* Chips (Desktop) */}
              <div className="hidden md:flex items-center gap-1.5 flex-wrap">
                {['Todos', '0 a 6 meses', '7 a 12 meses', '1 a 3 años', '4 a 7 años', '8 años o más'].map(rango => (
                  <button
                    key={rango}
                    onClick={() => handleFilterChange('edad', rango)}
                    className={`px-2.5 py-1 rounded-full text-[13px] font-semibold transition-colors ${
                      filters.edad === rango
                        ? 'bg-[#F69222] text-white border-transparent'
                        : 'bg-white text-[#5F6B70] border border-[#F1D9BD] hover:border-[#F69222] hover:text-[#F69222]'
                    }`}
                  >
                    {rango !== 'Todos' ? rango : 'Todos'}
                  </button>
                ))}
              </div>

              {/* Select (Mobile) */}
              <select 
                value={filters.edad} 
                onChange={(e) => handleFilterChange('edad', e.target.value)}
                className="md:hidden flex-1 bg-transparent border border-[#F1D9BD] rounded-full px-4 py-2 text-[#5F6B70] font-medium outline-none focus:border-[#F69222] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%23F69222%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] pr-10"
              >
                {['Todos', '0 a 6 meses', '7 a 12 meses', '1 a 3 años', '4 a 7 años', '8 años o más'].map(rango => (
                  <option key={rango} value={rango}>{rango}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Grid de Animales */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Lottie animationData={loadingAnimation} loop={true} className="w-32 h-32" />
          </div>
        ) : errorMsg ? (
          <div className="py-10">
            <ApiErrorState onRetry={fetchAnimals} />
          </div>
        ) : currentAnimals.length === 0 ? (
          <div className="py-10">
            <EmptyState 
              type={isExpanded && Object.values(filters).some(v => v !== 'Todas' && v !== 'Todos') ? 'filters' : 'catalog'}
              onClearFilters={() => {
                setFilters({ especie: 'Todas', sexo: 'Todos', edad: 'Todos' });
                setCurrentPage(1);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto w-full">
              {currentAnimals.map((animal, index) => (
                <AnimalCard 
                  key={animal.id} 
                  animal={animal}
                  index={index}
                  className={`opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]`}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
            
            <div className="w-full max-w-7xl mx-auto mt-12 pt-8 border-t border-[#F1D9BD] flex justify-start">
              <p className="text-[#5F6B70] text-[15px] font-medium">
                Estás viendo <span className="text-[#F69222] font-bold text-base">{currentAnimals.length}</span> de <span className="text-[#F69222] font-bold text-base">{totalApiAnimals}</span> animalitos que esperan ser conocidos.
              </p>
            </div>
          </div>
        )}

        {/* Paginación */}
        {isExpanded && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#F69222] border border-[#F1D9BD] hover:bg-[#FDF3E7] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentPage === i + 1 
                    ? 'bg-[#F69222] text-white shadow-md' 
                    : 'text-[#5F6B70] hover:bg-[#FDF3E7] border border-transparent hover:border-[#F1D9BD]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#F69222] border border-[#F1D9BD] hover:bg-[#FDF3E7] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
