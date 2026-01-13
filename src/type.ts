import type z from "zod";
import type { contactSchema } from "./lib/contactSchema";

export type ContactFormData = z.infer<typeof contactSchema>;
