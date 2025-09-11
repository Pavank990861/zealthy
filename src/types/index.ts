export interface User {
  id: string;
  email: string;
  password: string;
  about_me?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: string;
  current_step: number;
  created_at: string;
  updated_at: string;
}

export interface OnboardingConfig {
  id: number;
  page_2_components: string[];
  page_3_components: string[];
  created_at: string;
}

export type ComponentType = 'about_me' | 'address' | 'birthdate';

export interface FormData {
  email: string;
  password: string;
  about_me: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  birthdate: string;
}
