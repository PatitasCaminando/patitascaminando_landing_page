import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from '../EmptyState';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('EmptyState', () => {
  it('renders correctly with default type', () => {
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), refresh: vi.fn() } as any);
    render(<EmptyState onClearFilters={() => {}} />);
    expect(screen.getByText('No encontramos animalitos con esos filtros')).toBeInTheDocument();
  });

  it('renders correctly for catalog', () => {
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), refresh: vi.fn() } as any);
    render(<EmptyState type="catalog" />);
    expect(screen.getByText('Aún no hay animalitos visibles')).toBeInTheDocument();
  });
});
