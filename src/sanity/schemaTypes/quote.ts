import { defineField, defineType } from "sanity";

const DAYS = [
  { title: "Monday", value: "mon" },
  { title: "Tuesday", value: "tue" },
  { title: "Wednesday", value: "wed" },
  { title: "Thursday", value: "thu" },
  { title: "Friday", value: "fri" },
  { title: "Saturday", value: "sat" },
  { title: "Sunday", value: "sun" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
].map((title, i) => ({ title, value: String(i + 1) }));

export default defineType({
  name: "quote",
  title: "Motivational quote",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      description: 'Leave blank to show as "Aurea Fitness".',
      type: "string",
    }),
    defineField({
      name: "dayOfWeek",
      title: "Only show on these days",
      description:
        "Leave empty to make this quote eligible every day. Tag it to only surface on specific days (e.g. a Monday motivation quote).",
      type: "array",
      of: [{ type: "string" }],
      options: { list: DAYS },
    }),
    defineField({
      name: "month",
      title: "Only show in these months",
      description:
        "Leave empty to make this quote eligible all year. Tag it to only surface in specific months (e.g. a New Year quote in January).",
      type: "array",
      of: [{ type: "string" }],
      options: { list: MONTHS },
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "author" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || "Aurea Fitness" };
    },
  },
});
