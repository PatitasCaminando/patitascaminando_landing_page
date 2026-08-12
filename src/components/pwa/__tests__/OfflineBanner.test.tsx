import { render, screen, act } from '@testing-library/react';
import { OfflineBanner } from '../OfflineBanner';
import { vi } from 'vitest';
import * as useCacheConsentModule from '@/hooks/use-cache-consent';

vi.mock('@/hooks/use-cache-consent', () => ({
  useCacheConsent: vi.fn(),
}));

describe('OfflineBanner', () => {
  beforeEach(() => {
    vi.mocked(useCacheConsentModule.useCacheConsent).mockReturnValue({
      hasAcceptedCache: true,
      acceptCacheConsent: vi.fn(),
    });
  });

  it('does not render when online', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
    
    const { container } = render(<OfflineBanner />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders when offline', async () => {
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    
    render(<OfflineBanner />);
    expect(await screen.findByText(/Estás navegando sin conexión/i)).toBeInTheDocument();
  });

  it('appears when offline event fires', async () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
    render(<OfflineBanner />);
    
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
      window.dispatchEvent(new Event('offline'));
    });

    expect(await screen.findByText(/Estás navegando sin conexión/i)).toBeInTheDocument();
  });
});
