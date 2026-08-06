/**
 * Standardized error class for HTTP responses
 */
export class HttpError extends Error {
  public statusCode: number;
  public data: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Interface for API response structures
 */
export interface ApiResponse<T = any> {
  data: T;
  meta?: any;
}

/**
 * Public HTTP Client for communicating with the NestJS Backend.
 * Uses `NEXT_PUBLIC_API_BASE_URL`.
 * DOES NOT attach authentication headers (for /public endpoints).
 */
class HttpClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  }

  /**
   * Helper to perform a standard fetch request and normalize the response.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Configurar headers por defecto
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Intentar parsear el body
      let responseBody;
      try {
        const text = await response.text();
        responseBody = text ? JSON.parse(text) : null;
      } catch (e) {
        responseBody = null; // Si no es JSON
      }

      if (!response.ok) {
        // Validation Errors o Server Errors
        const errorMessage = responseBody?.message || responseBody?.error || `Error inesperado (${response.status})`;
        throw new HttpError(
          typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
          response.status,
          responseBody
        );
      }

      return responseBody as T;
    } catch (error: any) {
      // Re-lanzar si ya es nuestro HttpError
      if (error instanceof HttpError) {
        throw error;
      }
      
      // Network Error (servidor apagado, sin internet, CORS, etc.)
      throw new HttpError(
        'No pudimos conectarnos con el servidor. Por favor revisa tu conexión e intenta de nuevo.',
        0,
        { originalError: error.message }
      );
    }
  }

  /**
   * Ejecuta una petición GET (ej. listar animales)
   */
  public get<T>(endpoint: string, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * Ejecuta una petición POST (ej. solicitudes de adopción o donación)
   */
  public post<T>(endpoint: string, data: any, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Singleton export
export const httpClient = new HttpClient();
