import { z } from "zod";

export const addressFormSchema = z.object({
  names: z
    .string()
    .min(3, "Nombres, debe contener al menos 3 caracteres.")
    .max(50, "Nombres, debe contener máximo 50 caracteres."),
  lastNames: z
    .string()
    .min(3, "Apellidos, debe contener al menos 3 caracteres.")
    .max(50, "Apellidos, debe contener máximo 50 caracteres."),
  address: z
    .string()
    .min(3, "Dirección debe contener al menos 3 caracteres.")
    .max(100, "Dirección debe contener máximo 100 caracteres."),
  address2: z.string().optional(),
  zipCode: z
    .string()
    .min(3, "Código postal debe contener al menos 3 caracteres.")
    .max(10, "Código postal debe contener máximo 10 caracteres."),
  city: z
    .string()
    .min(3, "Ciudad debe contener al menos 3 caracteres.")
    .max(100, "Ciudad debe contener máximo 100 caracteres."),
  mobilePhone: z
    .string()
    .min(8, "Teléfono debe contener al menos 8 caracteres.")
    .max(20, "Teléfono debe contener máximo 100 caracteres."),
  country: z.string(),

  saveForm: z.boolean().optional(),
});
