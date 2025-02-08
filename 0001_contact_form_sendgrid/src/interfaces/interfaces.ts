import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email format").optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),
  zipcode: z.string().regex(/^\d{5}$/, "Zipcode must be 5 digits"),
});
export type ContactFormType = z.infer<typeof ContactFormSchema>;
