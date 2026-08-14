import { render, screen, waitFor } from '@testing-library/react';
import { AdoptionRequestModal } from '../AdoptionRequestModal';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { AdoptionsService } from '@/core/services/adoptions.service';

vi.mock('@/core/services/adoptions.service', () => ({
  AdoptionsService: {
    submitApplication: vi.fn(),
  },
}));

describe('AdoptionRequestModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();
  const mockAnimal = {
    id: '1',
    name: 'Firulais',
    slug: 'firulais',
    category: 'Perro',
    sex: 'Macho',
    age: '2 años',
    size: 'Mediano',
    status: 'disponible',
    imageUrl: '/test.jpg',
    cta: 'Adoptar',
    detailCta: 'Adoptar',
    observation: 'test',
    isSterilized: true,
    isVaccinated: true,
    isDewormed: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with animal name', async () => {
    render(
      <AdoptionRequestModal
        isOpen={true}
        onClose={mockOnClose}
        animal={mockAnimal}
        onSubmit={mockOnSuccess}
      />
    );

    expect(await screen.findByText(/Quiero adoptar a:/)).toBeInTheDocument();
    expect(screen.getAllByText(/Firulais/)[0]).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <AdoptionRequestModal
        isOpen={true}
        onClose={mockOnClose}
        animal={mockAnimal}
        onSubmit={mockOnSuccess}
      />
    );

    const submitButton = await screen.findByText('Enviar solicitud');
    await userEvent.click(submitButton);

    expect(await screen.findByText('Ingresa tus nombres.')).toBeInTheDocument();
    expect(await screen.findByText('Ingresa tus apellidos.')).toBeInTheDocument();
  });

  it('submits correctly with valid data', async () => {
    vi.mocked(AdoptionsService.submitApplication).mockResolvedValueOnce({});

    render(
      <AdoptionRequestModal
        isOpen={true}
        onClose={mockOnClose}
        animal={mockAnimal}
        onSubmit={mockOnSuccess}
      />
    );

    const inputName = await screen.findByPlaceholderText('Escribe tus nombres');
    await userEvent.type(inputName, 'Juan');
    await userEvent.type(screen.getByPlaceholderText('Escribe tus apellidos'), 'Perez');
    await userEvent.type(screen.getByPlaceholderText('Ej. 098 772 7566'), '0999999999');
    await userEvent.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'juan@test.com');
    await userEvent.type(screen.getByPlaceholderText('Ej. 28'), '30');
    await userEvent.type(screen.getByPlaceholderText('Ej. Av. Siempre Viva 123'), 'Av Siempre Viva');
    
    // Select type of housing
    const selects = screen.getAllByRole('combobox');
    await userEvent.selectOptions(selects[0], 'Casa');

    await userEvent.type(screen.getByPlaceholderText('Cuéntanos por qué quieres adoptar y cómo cuidarías a este animalito...'), 'Quiero darle mucho amor y cuidados.');

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]); // policy

    const submitButton = await screen.findByText('Enviar solicitud');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
