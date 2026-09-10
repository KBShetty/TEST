import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Used as alt text and in the admin list — not shown to visitors.",
      type: "string",
    }),
    defineField({
      name: "mediaType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { mediaType?: string } | undefined;
          if (doc?.mediaType === "image" && !value) {
            return "An image is required when Type is Image.";
          }
          return true;
        }),
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "video",
      title: "Video file",
      description:
        "Keep clips short and compressed for fast loading — roughly 20 seconds and 15MB is a good target.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      hidden: ({ document }) => document?.mediaType !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { mediaType?: string } | undefined;
          if (doc?.mediaType === "video" && !value) {
            return "A video file is required when Type is Video.";
          }
          return true;
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (poster image)",
      description: "Recommended for videos — shown before the clip plays.",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== "video",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Hero", value: "hero" },
          { title: "Interior", value: "interior" },
          { title: "Classes", value: "classes" },
          { title: "Equipment", value: "equipment" },
          { title: "Transformation", value: "transformation" },
        ],
      },
      initialValue: "interior",
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
      description: "Turn off to hide this item from the site without deleting it.",
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
    select: {
      title: "title",
      mediaType: "mediaType",
      category: "category",
      media: "image",
    },
    prepare({ title, mediaType, category, media }) {
      return {
        title: title || `Untitled ${mediaType}`,
        subtitle: category,
        media: mediaType === "video" ? undefined : media,
      };
    },
  },
});
