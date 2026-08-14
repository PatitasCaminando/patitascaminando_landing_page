import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { FeaturedAdoptionsSection } from '../FeaturedAdoptionsSection';
import { AnimalsService } from '@/core/services/animals.service';
import { vi } from 'vitest';

vi.mock('@/core/services/animals.service', () => ({
  AnimalsService: {
    getPublicAnimals: vi.fn(),
  }
}));

describe('FeaturedAdoptionsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(AnimalsService.getPublicAnimals).mockReturnValue(new Promise(() => {})); // Never resolves
    render(<FeaturedAdoptionsSection />);
    // Check if skeletons are rendered (assuming there is a loading indicator or we just wait)
    expect(screen.getByText('Conoce a nuestros animalitos')).toBeInTheDocument();
  });

  it('renders animals when fetched successfully', async () => {
    const mockAnimals = [
      { id: '1', name: 'Firulais', category: 'Perro', sex: 'Macho', age: '1', size: 'M', status: 'disponible', slug: 'firulais', imageUrl: '', cta: 'Conocerlo', detailCta: 'Adoptar', observation: '', isSterilized: true, isVaccinated: true, isDewormed: true }
    ];

    vi.mocked(AnimalsService.getPublicAnimals).mockResolvedValueOnce({
      items: mockAnimals,
      page: 1, limit: 10, total: 1, totalPages: 1
    });

    render(<FeaturedAdoptionsSection />);

    await waitFor(() => {
      expect(screen.getByText('Firulais')).toBeInTheDocument();
    });
  });

  it('renders error state when fetch fails', async () => {
    vi.mocked(AnimalsService.getPublicAnimals).mockRejectedValueOnce(new Error('Fetch failed'));

    render(<FeaturedAdoptionsSection />);

    await waitFor(() => {
      expect(screen.getByText('No pudimos conectar con el refugio')).toBeInTheDocument();
    });
  });

  it('handles filter changes and pagination', async () => {
    const mockAnimals = [
      { id: '1', name: 'Firulais', category: 'Perro', sex: 'Macho', age: '1', size: 'M', status: 'disponible', slug: 'firulais', imageUrl: '', cta: 'Conocerlo', detailCta: 'Adoptar', observation: '', isSterilized: true, isVaccinated: true, isDewormed: true },
      { id: '2', name: 'Mishi', category: 'Gato', sex: 'Hembra', age: '2', size: 'S', status: 'disponible', slug: 'mishi', imageUrl: '', cta: 'Conocerlo', detailCta: 'Adoptar', observation: '', isSterilized: true, isVaccinated: true, isDewormed: true }
    ];

    vi.mocked(AnimalsService.getPublicAnimals).mockResolvedValue({
      items: mockAnimals,
      page: 1, limit: 10, total: 2, totalPages: 2
    });

    render(<FeaturedAdoptionsSection />);

    await waitFor(() => {
      expect(screen.getByText('Firulais')).toBeInTheDocument();
    });

    // Expand
    const expandButton = screen.getByText('Ver todos los rescatados');
    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(screen.getByText('Ocultar todos los rescatados')).toBeInTheDocument();
    });

    // Click Age '1 a 3 años'
    const ageButtons = screen.getAllByText('1 a 3 años');
    fireEvent.click(ageButtons[0]);

    // Click next page
    const nextButtons = screen.getAllByRole('button').filter(b => b.querySelector('.lucide-chevron-right'));
    if (nextButtons.length > 0) {
       fireEvent.click(nextButtons[0]);
    }
  });

  it('handles offline mode and empty states', async () => {
    vi.mocked(AnimalsService.getPublicAnimals).mockRejectedValueOnce(new Error('OFFLINE_ERROR'));
    render(<FeaturedAdoptionsSection />);
    expect(await screen.findByText(/No pudimos cargar esta información porque no hay conexión/i)).toBeInTheDocument();
  });

  it('tests age parsing logic', async () => {
    const mockAnimal = { id: '1', name: 'Firulais', category: 'Perro', sex: 'Macho', age: '1', size: 'M', status: 'disponible', slug: 'firulais', imageUrl: '', cta: 'Conocerlo', detailCta: 'Adoptar', observation: '', isSterilized: true, isVaccinated: true, isDewormed: true };
    const customMockAnimals = [
      { ...mockAnimal, age: '2 meses' },
      { ...mockAnimal, age: '10 meses' },
      { ...mockAnimal, age: '2 años y medio' },
      { ...mockAnimal, age: '5 años' },
      { ...mockAnimal, age: '9 años' },
    ];
    vi.mocked(AnimalsService.getPublicAnimals).mockResolvedValue({
      items: customMockAnimals,
      page: 1, limit: 10, total: 5, totalPages: 1
    });
    
    render(<FeaturedAdoptionsSection />);
    
    await waitFor(() => {
      expect(screen.getAllByText('Firulais').length).toBeGreaterThan(0);
    });

    // Expand
    const expandButton = screen.getByText('Ver todos los rescatados');
    fireEvent.click(expandButton);

    // Test different age ranges
    const agesToClick = ['0 a 6 meses', '7 a 12 meses', '4 a 7 años', '8 años o más'];
    for (const age of agesToClick) {
      const btn = screen.getAllByText(age)[0];
      fireEvent.click(btn);
    }
  });
});
