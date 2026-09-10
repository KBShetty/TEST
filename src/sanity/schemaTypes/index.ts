import type { SchemaTypeDefinition } from "sanity";
import trainer from "./trainer";
import galleryItem from "./galleryItem";
import quote from "./quote";
import testimonial from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trainer, galleryItem, quote, testimonial],
};
