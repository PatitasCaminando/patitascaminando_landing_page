import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpClient, HttpError } from '../http-client';

describe('HTTP Client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('GET requests', () => {
    it('should successfully fetch data', async () => {
      const mockResponse = { data: 'test' };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      } as Response);

      const result = await httpClient.get('/test-endpoint');
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test-endpoint'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('should handle 400 error and throw HttpError', async () => {
      const errorMsg = 'Bad Request from server';
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: () => Promise.resolve(JSON.stringify({ message: errorMsg })),
      } as Response);

      await expect(httpClient.get('/test')).rejects.toThrow(HttpError);
      // second call needs a mock too
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: () => Promise.resolve(JSON.stringify({ message: errorMsg })),
      } as Response);
      await expect(httpClient.get('/test')).rejects.toThrow(errorMsg);
    });

    it('should handle network error', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(httpClient.get('/test')).rejects.toThrow('No pudimos conectarnos con el servidor. Por favor revisa tu conexión e intenta de nuevo.');
    });
  });

  describe('POST requests', () => {
    it('should successfully post data', async () => {
      const mockResponse = { id: 1 };
      const payload = { name: 'Test' };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      } as Response);

      const result = await httpClient.post('/test-endpoint', payload);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test-endpoint'),
        expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) })
      );
    });
  });
});
