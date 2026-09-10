import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "source",
      title: "Source",
      description:
        "How this testimonial was collected. Kept for when live Google Reviews are wired in later.",
      type: "string",
      options: { list: [{ title: "Manual", value: "manual" }, { title: "Google", value: "google" }] },
      initialValue: "manual",
    }),
    defineField({
      name: "isSample",
      title: "Sample / placeholder",
      description: "Mark true for example content that shouldn't be mistaken for a real review.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      description: "Turn off to hide this testimonial from the site without deleting it.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "quote", media: "photo" },
  },
});
