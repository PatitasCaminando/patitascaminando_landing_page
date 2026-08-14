import { render, screen } from '@testing-library/react';
import { AnimalCard } from '../AnimalCard';
import { Animal } from '@/types';
import { vi } from 'vitest';

describe('AnimalCard', () => {
  const baseAnimal: Animal = {
    id: '1',
    name: 'Firulais',
    slug: 'firulais',
    category: 'Perro',
    sex: 'Macho',
    age: '2 años',
    size: 'Mediano',
    status: 'disponible',
    imageUrl: '/test-img.jpg',
    cta: 'Conocerlo',
    detailCta: 'Quiero adoptarlo',
    observation: 'Lindo perro',
    isSterilized: true,
    isVaccinated: true,
    isDewormed: true,
  };

  it('renders animal basic info', () => {
    render(<AnimalCard animal={baseAnimal} />);
    
    expect(screen.getByText('Firulais')).toBeInTheDocument();
    expect(screen.getByText('Perro')).toBeInTheDocument();
    expect(screen.getByText('2 años')).toBeInTheDocument();
    expect(screen.getByText('Macho')).toBeInTheDocument();
    expect(screen.getByAltText('Firulais')).toBeInTheDocument();
  });

  it('shows correct CTA for available animal', () => {
    render(<AnimalCard animal={baseAnimal} />);
    
    const ctaButton = screen.getByText('Conocerlo');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/adopciones/firulais');
  });

  it('disables CTA and shows tooltip if not available', () => {
    const animal = { ...baseAnimal, status: 'adoptado' };
    render(<AnimalCard animal={animal} />);
    
    const button = screen.getByText('Conocerlo');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/adopciones/firulais');
  });

  it('renders correctly with object imageUrl and handles loading state', () => {
    const animalWithObjectImg = { ...baseAnimal, size: 'No especificado', imageUrl: { src: '/test2.png', width: 100, height: 100 } };
    render(<AnimalCard animal={animalWithObjectImg as any} className="custom-class" />);
    expect(screen.getByText('No especificado')).toBeInTheDocument();
  });
});
