'use client';

import React, { useState, useMemo } from 'react';
import { AnimalCard } from '../ui/AnimalCard';
import { featuredAnimals } from '@/data/animals';
import { Button } from '../ui/Button';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, PawPrint, Calendar } from 'lucide-react';
import doodlePatitasIzqSup from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_izquierda_superior.png';
import doodlePatitasIzqInf from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_izquierda_inferior.png';
import doodlePatitasDerInf from '@/assets/ilustraciones/doodles/doodle_patitas_esquineras_derecha_inferior.png';

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

  // Convertir texto de edad a meses totales para filtrado exacto
  const getAgeInMonths = (ageStr: string) => {
    const lower = ageStr.toLowerCase();
    const match = lower.match(/\d+/);
    if (!match) return 12; // Default 1 año
    
    const value = parseInt(match[0], 10);
    if (lower.includes('mes') || lower.includes('meses')) {
      return value;
    }
    return value * 12; // Años a meses
  };

  const filteredAnimals = useMemo(() => {
    if (!isExpanded) return featuredAnimals.slice(0, 5); // Default view
    
    return featuredAnimals.filter(animal => {
      // Especie Filter
      let matchEspecie = true;
      if (filters.especie !== 'Todas') {
        const cat = animal.category.toLowerCase();
        const fEsp = filters.especie.toLowerCase();
        if (cat === 'ambos') {
          if (fEsp !== 'todas') matchEspecie = false;
        } else {
          matchEspecie = cat === fEsp;
        }
      }

      // Sexo Filter
      let matchSexo = true;
      if (filters.sexo !== 'Todos') {
        const sex = (animal.sex || '').toLowerCase();
        const fSex = filters.sexo.toLowerCase();
        matchSexo = sex === fSex;
      }

      // Edad Filter
      let matchEdad = true;
      if (filters.edad !== 'Todos') {
        const months = getAgeInMonths(animal.age);
        if (filters.edad === '0 a 6 meses') matchEdad = months >= 0 && months <= 6;
        else if (filters.edad === '7 a 12 meses') matchEdad = months > 6 && months <= 12;
        else if (filters.edad === '1 a 3 años') matchEdad = months > 12 && months <= 36;
        else if (filters.edad === '4 a 7 años') matchEdad = months > 36 && months <= 84;
        else if (filters.edad === '8 años o más') matchEdad = months > 84;
      }

      return matchEspecie && matchSexo && matchEdad;
    });
  }, [isExpanded, filters]);

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
        
        {/* Filtros */}
        {isExpanded && (
          <div className="bg-white/50 backdrop-blur-sm border border-[#F1D9BD] rounded-3xl p-4 md:p-6 mb-8 flex flex-col md:flex-row flex-wrap gap-6 items-start md:items-center">
            
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
                <option value="Perra">Perra</option>
                <option value="Gato">Gato</option>
                <option value="Gata">Gata</option>
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
              <div className="flex items-center gap-2 text-[#F69222] font-semibold">
                <Calendar size={18} />
                <span className="text-[#5F6B70]">Rango de edad</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['Todos', '0 a 6 meses', '7 a 12 meses', '1 a 3 años', '4 a 7 años', '8 años o más'].map(rango => (
                  <button
                    key={rango}
                    onClick={() => handleFilterChange('edad', rango)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                      filters.edad === rango 
                        ? 'bg-[#FDF3E7] border-[#F69222] text-[#F69222]' 
                        : 'bg-transparent border-transparent text-[#5F6B70] hover:bg-[#FDF3E7]/50 border-[#F1D9BD]'
                    }`}
                  >
                    {rango !== 'Todos' ? rango : 'Todos'}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Grid o Empty State */}
        {currentAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white/40 border border-[#F1D9BD] rounded-[32px]">
            <PawPrint size={48} className="mx-auto text-[#F1D9BD] mb-4" />
            <h3 className="text-xl font-bold text-[#153970] mb-2">No encontramos animalitos con estos filtros por ahora.</h3>
            <p className="text-[#5F6B70]">Prueba cambiando los filtros o vuelve a ver todos los rescatados.</p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({ especie: 'Todas', sexo: 'Todos', edad: 'Todos' })}
              className="mt-6 border-[#F69222] text-[#F69222] hover:bg-[#F69222] hover:text-white"
            >
              Limpiar filtros
            </Button>
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
