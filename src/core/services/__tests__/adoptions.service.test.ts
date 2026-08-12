import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdoptionsService } from '../adoptions.service';
import { httpClient } from '../../api/http-client';
import { CreateAdoptionApplicationDTO } from '../../types/api.types';

vi.mock('../../api/http-client', () => ({
  httpClient: {
    post: vi.fn(),
  }
}));

describe('Adoptions Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit application successfully', async () => {
    const payload: CreateAdoptionApplicationDTO = {
      firstNames: 'Juan',
      lastNames: 'Perez',
      phone: '0999999999',
      email: 'juan@test.com',
      adoptionReason: 'test',
      desiredAnimalDescription: 'test',
      dataProcessingAccepted: true
    };
    const mockResponse = { id: 1, status: 'received' };

    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const result = await AdoptionsService.submitApplication(payload);
    
    expect(httpClient.post).toHaveBeenCalledWith('/public/adoptions/applications', payload);
    expect(result).toEqual(mockResponse);
  });
});
