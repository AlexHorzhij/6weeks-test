import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().max(100, { message: "Ім'я має бути менше 100 символів" }).optional(),
  email: z.email({ message: "Введіть коректну email адресу" }).trim(),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Повідомлення має бути менше 1000 символів" })
    .optional(),
});
