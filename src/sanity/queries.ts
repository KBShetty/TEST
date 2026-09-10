import type { Image } from "sanity";

// GROQ query strings + the raw result shapes they return. Kept separate from
// the components that consume them so the mapping to each component's
// existing prop shape (Trainer/Testimonial in src/types/content.ts, etc.)
// stays a small, obvious translation layer in each component file.

export const TRAINERS_QUERY = /* groq */ `
  *[_type == "trainer" && active == true] | order(order asc) {
    name, specialty, certifications, yearsExperience, photo, quote
  }
`;

export type SanityTrainer = {
  name: string;
  specialty: string;
  certifications: string[];
  yearsExperience: number;
  photo: Image | null;
  quote: string | null;
};

export const GALLERY_IMAGES_QUERY = /* groq */ `
  *[_type == "galleryItem" && active == true && mediaType == "image"] | order(order asc) {
    title, image
  }
`;

export type SanityGalleryImage = {
  title: string | null;
  image: Image | null;
};

export const GALLERY_VIDEOS_QUERY = /* groq */ `
  *[_type == "galleryItem" && active == true && mediaType == "video"] | order(order asc) {
    title, "videoUrl": video.asset->url, thumbnail
  }
`;

export type SanityGalleryVideo = {
  title: string | null;
  videoUrl: string | null;
  thumbnail: Image | null;
};

export const TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial" && active == true] {
    name, rating, quote, isSample, photo
  }
`;

export type SanityTestimonial = {
  name: string;
  rating: number;
  quote: string;
  isSample: boolean | null;
  photo: Image | null;
};

export const ACTIVE_QUOTES_QUERY = /* groq */ `
  *[_type == "quote" && active == true] {
    text, author, dayOfWeek, month
  }
`;

export type SanityQuote = {
  text: string;
  author: string | null;
  dayOfWeek: string[] | null;
  month: string[] | null;
};
