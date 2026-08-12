import { render, screen } from '@testing-library/react';
import { HorizontalAnimalCard } from '../HorizontalAnimalCard';
import { Animal } from '@/types';

describe('HorizontalAnimalCard', () => {
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
    sterilized: 'Sí',
    vaccinated: 'Sí',
    dewormed: 'Sí'
  };

  it('renders horizontal animal basic info', () => {
    render(<HorizontalAnimalCard animal={baseAnimal} />);
    
    expect(screen.getByText('Firulais')).toBeInTheDocument();
    expect(screen.getByText('Perro • 2 años')).toBeInTheDocument();
    expect(screen.getByAltText('Firulais')).toBeInTheDocument();
  });

  it('shows correct CTA for available animal', () => {
    render(<HorizontalAnimalCard animal={baseAnimal} />);
    
    const ctaButton = screen.getByText('Conocerlo');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/adopciones/firulais');
  });

  it('renders correctly with missing observation and object imageUrl', () => {
    const animalWithObjectImg = { ...baseAnimal, observation: '', imageUrl: { src: '/test2.png', width: 100, height: 100 } };
    render(<HorizontalAnimalCard animal={animalWithObjectImg as any} />);
    expect(screen.getByText(/está buscando un hogar lleno de amor/)).toBeInTheDocument();
  });
});
