import { defineField, defineType } from "sanity";

// Field names deliberately mirror src/types/content.ts's Trainer interface
// (name, specialty, certifications, yearsExperience, photo, quote) so the
// fetch-mapping layer in src/sanity/queries.ts is close to a passthrough.
export default defineType({
  name: "trainer",
  title: "Trainer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "specialty",
      title: "Specialty",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of experience",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers show first.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "active",
      title: "Active",
      description: "Turn off to hide this trainer from the site without deleting them.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "specialty", media: "photo" },
  },
});
