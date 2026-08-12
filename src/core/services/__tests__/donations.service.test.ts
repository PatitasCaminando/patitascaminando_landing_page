import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DonationsService } from '../donations.service';
import { httpClient } from '../../api/http-client';
import { CreateDonationOfferDTO } from '../../types/api.types';
import { DonationItem } from '../../constants/enums';

vi.mock('../../api/http-client', () => ({
  httpClient: {
    post: vi.fn(),
  }
}));

describe('Donations Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit offer successfully', async () => {
    const payload: CreateDonationOfferDTO = {
      firstNames: 'Juan',
      lastNames: 'Perez',
      phone: '0999999999',
      email: 'juan@test.com',
      selectedItems: [DonationItem.DOG_FOOD],
      descriptionObservation: 'test',
      dataProcessingAccepted: true
    };
    const mockResponse = { id: 1, status: 'offered' };

    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const result = await DonationsService.submitOffer(payload);
    
    expect(httpClient.post).toHaveBeenCalledWith('/public/donations/offers', payload);
    expect(result).toEqual(mockResponse);
  });
});
