import { z } from "zod";

export const ContactFormSchema = z.object({});
export type ContactFormType = z.infer<typeof ContactFormSchema>;
