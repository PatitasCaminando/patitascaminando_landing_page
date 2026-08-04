export interface Animal {
  id: string;
  name: string;
  category: string; // species in the old interface
  age: string;
  status: string;
  imageUrl: any;
  sex?: string;
  size?: string;
  slug: string;
  cta: string;
  ageRange?: string;
  sterilized?: string;
  vaccinated?: string;
  dewormed?: string;
  observation?: string;
  detailCta?: string;
}

export interface Campaign {
  id: string;
  category: string;
  title: string;
  description: string;
  dateOrStatus: string;
}

export interface WorkArea {
  id: string;
  title: string;
  description: string;
  iconType: 'rescue' | 'food' | 'medical' | 'adoption' | 'education';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
