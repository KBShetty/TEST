export interface Program {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  whoItsFor: string;
  image: string;
}

export interface Trainer {
  name: string;
  specialty: string;
  certifications: string[];
  yearsExperience: number;
  photo: string;
  quote: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  isSample?: boolean;
  photo?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validFrom: string; // ISO date
  validTo: string; // ISO date
  image: string;
  active: boolean;
}
