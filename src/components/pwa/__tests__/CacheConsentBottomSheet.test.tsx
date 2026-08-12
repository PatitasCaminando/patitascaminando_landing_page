import { render, screen, act, fireEvent } from '@testing-library/react';
import { CacheConsentBottomSheet } from '../CacheConsentBottomSheet';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('CacheConsentBottomSheet', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    // Simulate not being in standalone mode for tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders consent message if not accepted previously', () => {
    render(<CacheConsentBottomSheet />);
    act(() => {
      vi.advanceTimersByTime(11000);
    });
    expect(screen.getByText(/Mejor experiencia, incluso sin conexión/i)).toBeInTheDocument();
  });

  it('hides and saves to localStorage when accepted', async () => {
    render(<CacheConsentBottomSheet />);
    act(() => {
      vi.advanceTimersByTime(11000);
    });
    
    const acceptBtn = screen.getByText('Entendido');
    fireEvent.click(acceptBtn);

    expect(localStorage.getItem('patitas_cache_consent')).toBe('true');
    expect(screen.queryByText(/Mejor experiencia, incluso sin conexión/i)).not.toBeInTheDocument();
  });

  it('does not render if previously accepted', () => {
    localStorage.setItem('patitas_cache_consent', 'true');
    render(<CacheConsentBottomSheet />);
    act(() => {
      vi.advanceTimersByTime(11000);
    });
    
    expect(screen.queryByText(/Mejor experiencia, incluso sin conexión/i)).not.toBeInTheDocument();
  });
});
