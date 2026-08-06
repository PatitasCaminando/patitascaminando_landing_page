import { AnimalSpecies, AnimalSex, AnimalAgeRange, AnimalStatus, DonationItem } from '../constants/enums';

export interface AnimalDTO {
  id: string;
  name: string;
  species: AnimalSpecies | string;
  sex: AnimalSex | string;
  approximateAge: AnimalAgeRange | string;
  size: string;
  description: string;
  generalCondition: string;
  photoPaths: string[];
  status: AnimalStatus | string;
  isActive: boolean;
  isPubliclyVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
  images?: any[];
}

export interface CreateAdoptionApplicationDTO {
  firstNames: string;
  lastNames: string;
  phone: string;
  email: string;
  desiredAnimalDescription: string;
  adoptionReason: string;
  specificAnimalId?: string;
  additionalMessage?: string;
  dataProcessingAccepted: boolean;
}

export interface CreateDonationOfferDTO {
  firstNames: string;
  lastNames: string;
  phone: string;
  email: string;
  selectedItems: (DonationItem | string)[];
  approximateQuantity?: string;
  productName?: string;
  itemCondition?: string;
  expirationDate?: string;
  deliveryAvailability?: string;
  otherDescription?: string;
  descriptionObservation: string;
  dataProcessingAccepted: boolean;
}

export interface SiteSectionDTO {
  id: string;
  sectionKey: string;
  title: string;
  content: any;
  isPublished: boolean;
  displayOrder: number;
}
