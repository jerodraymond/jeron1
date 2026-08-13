export interface Project {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  category: string | null;
  description: string | null;
  services_provided: string[];
  project_date: string | null;
  main_image_url: string | null;
  project_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  display_order: number;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_published: boolean;
  display_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  quote: string;
  client_image_url: string | null;
  is_published: boolean;
  display_order: number;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

export interface HeroContent {
  heading: string;
  subheading: string;
  cta_label: string;
}
export interface AboutContent {
  heading: string;
  body: string;
}
export interface ContactContent {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}
export interface SocialLinksContent {
  instagram: string;
  facebook: string;
  linkedin: string;
  tiktok: string;
}
export interface CtaContent {
  heading: string;
  button_label: string;
}
