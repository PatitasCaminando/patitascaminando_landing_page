import { render, screen, fireEvent } from '@testing-library/react';
import { ApiErrorState } from '../ApiErrorState';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('ApiErrorState', () => {
  it('renders correctly', () => {
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), refresh: vi.fn() } as any);
    render(<ApiErrorState onRetry={() => {}} />);
    expect(screen.getByText('Intentar nuevamente')).toBeInTheDocument();
  });
});
