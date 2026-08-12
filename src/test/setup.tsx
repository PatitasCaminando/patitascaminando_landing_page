import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
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

Object.defineProperty(window.navigator, 'onLine', {
  writable: true,
  value: true,
});

vi.mock('next/image', () => ({
  
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} fill={undefined} priority={undefined} />
  }
}));


HTMLCanvasElement.prototype.getContext = () => ({ fillStyle: '', fillRect: vi.fn(), clearRect: vi.fn(), getImageData: vi.fn(), putImageData: vi.fn(), createImageData: vi.fn(), setTransform: vi.fn(), drawImage: vi.fn(), save: vi.fn(), fillText: vi.fn(), restore: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(), stroke: vi.fn(), translate: vi.fn(), scale: vi.fn(), rotate: vi.fn(), arc: vi.fn(), fill: vi.fn(), measureText: vi.fn(() => ({ width: 0 })), transform: vi.fn(), rect: vi.fn(), clip: vi.fn() } as any);

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
