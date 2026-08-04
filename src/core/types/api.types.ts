import { AnimalSpecies, AnimalSex, AnimalAgeRange, AnimalStatus, DonationItem } from '../constants/enums';

export interface AnimalDTO {
  id: string;
  name: string;
  species: AnimalSpecies | string;
  sex: AnimalSex | string;
  approximate_age: AnimalAgeRange | string;
  size: string;
  description: string;
  general_condition: string;
  photo_paths: string[];
  status: AnimalStatus | string;
  is_active: boolean;
  is_publicly_visible: boolean;
  created_at?: string;
  updated_at?: string;
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
