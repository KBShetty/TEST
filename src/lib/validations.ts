import { z } from "zod";

// The single lead-capture form used by both the popup and the contact page.
// One form with an intent selector, per the plan — not three separate popups.
export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone/WhatsApp number")
    .max(20, "Please enter a valid phone/WhatsApp number"),
  email: z.string().trim().email("Please enter a valid email address"),
  intent: z.enum(["free-trial", "membership", "visit"], {
    message: "Please select what you're interested in",
  }),
  preferredContactTime: z.string().trim().optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Please agree to be contacted to continue",
    }),
  // Honeypot field — real users never fill this in; bots usually do.
  company: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const intentLabels: Record<LeadFormValues["intent"], string> = {
  "free-trial": "Free Trial",
  membership: "Membership",
  visit: "Visit the Gym",
};
