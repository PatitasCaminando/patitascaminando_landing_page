import { render, screen } from '@testing-library/react';
import { ErrorStateTemplate } from '../ErrorStateTemplate';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('ErrorStateTemplate', () => {
  it('renders title and message correctly', () => {
    render(
      <ErrorStateTemplate 
        title="Error 404"
        message="Page not found"
        doodleSrc="/test.jpg"
      />
    );

    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders offline state correctly', () => {
    render(
      <ErrorStateTemplate 
        title="Sin conexión"
        message="No internet"
        doodleSrc="/test.jpg"
        isOfflineState={true}
      />
    );

    expect(screen.getByText('Sin conexión')).toBeInTheDocument();
  });

  it('handles actions correctly', async () => {
    const mockAction = vi.fn();
    render(
      <ErrorStateTemplate 
        title="Error"
        message="Something wrong"
        doodleSrc="/test.jpg"
        primaryActionLabel="Reintentar"
        onPrimaryAction={mockAction}
      />
    );

    const btn = screen.getByText('Reintentar');
    await userEvent.click(btn);

    expect(mockAction).toHaveBeenCalled();
  });
});
