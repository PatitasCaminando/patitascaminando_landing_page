import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DonationModal } from '../DonationModal';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DonationsService } from '@/core/services/donations.service';

vi.mock('@/core/services/donations.service', () => ({
  DonationsService: {
    submitOffer: vi.fn(),
  },
}));

describe('DonationModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with required fields', async () => {
    render(
      <DonationModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSuccess}
      />
    );

    expect(await screen.findByText('Donar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu nombre completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej. 098 772 7566')).toBeInTheDocument();
  });

  it('validates email correctly', async () => {
    render(
      <DonationModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSuccess}
      />
    );

    const emailInput = await screen.findByPlaceholderText('ejemplo@correo.com');
    await userEvent.type(emailInput, 'invalid-email');
    
    // Fill required fields
    await userEvent.type(screen.getByPlaceholderText('Escribe tu nombre completo'), 'Juan Perez');
    await userEvent.type(screen.getByPlaceholderText('Ej. 098 772 7566'), '0999999999');
    await userEvent.type(screen.getByPlaceholderText('Describe brevemente qué deseas donar, cantidad aproximada, estado del producto o disponibilidad de entrega...'), 'Prueba');
    
    await userEvent.click(screen.getByText('Alimento para perros')); // item
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]); // policy

    const submitButton = screen.getByText('Enviar donación');
    await userEvent.click(submitButton);

    expect(await screen.findByText('Ingresa un correo electrónico válido.')).toBeInTheDocument();
  });

  it('submits correctly with valid data', async () => {
    vi.mocked(DonationsService.submitOffer).mockResolvedValueOnce({});

    render(
      <DonationModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSuccess}
      />
    );

    const nameInput = await screen.findByPlaceholderText('Escribe tu nombre completo');
    await userEvent.type(nameInput, 'Juan Perez');
    await userEvent.type(screen.getByPlaceholderText('Ej. 098 772 7566'), '0999999999');
    await userEvent.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'juan@test.com');
    await userEvent.type(screen.getByPlaceholderText('Describe brevemente qué deseas donar, cantidad aproximada, estado del producto o disponibilidad de entrega...'), 'Prueba donacion');
    
    await userEvent.click(screen.getByText('Alimento para perros')); // Select an item
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]); // Accept policy

    const submitButton = screen.getByText('Enviar donación');
    await userEvent.click(submitButton);

    await waitFor(() => {
      if (!mockOnSuccess.mock.calls.length) { console.log(document.body.innerHTML); }
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('renders with defaultUserData and fails validation when fields are empty', async () => {
    render(
      <DonationModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSuccess}
        defaultUserData={{ nombres: 'Pepe', apellidos: 'Grillo' }}
      />
    );

    const submitButton = screen.getByText('Enviar donación');
    await userEvent.click(submitButton);

    expect(await screen.findByText('Debes aceptar el uso de tus datos para coordinar esta donación.')).toBeInTheDocument();
  });

  it('fails validation when no donation type is selected', async () => {
    render(
      <DonationModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSuccess}
      />
    );

    // type name, phone, email
    await userEvent.type(screen.getByPlaceholderText('Escribe tu nombre completo'), 'Juan Perez');
    await userEvent.type(screen.getByPlaceholderText('Ej. 098 772 7566'), '0999999999');
    await userEvent.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'juan@test.com');
    await userEvent.type(screen.getByPlaceholderText('Describe brevemente qué deseas donar, cantidad aproximada, estado del producto o disponibilidad de entrega...'), 'Prueba');

    // Accept terms
    const termCheckbox = document.getElementById('aceptacionDatos');
    if (termCheckbox) fireEvent.click(termCheckbox);
    
    // click submit
    const submitButton = screen.getByText('Enviar donación');
    await userEvent.click(submitButton);

    expect(await screen.findByText('Selecciona al menos un tipo de donación.')).toBeInTheDocument();
  });
});
