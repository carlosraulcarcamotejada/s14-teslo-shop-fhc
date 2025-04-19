import { z } from "zod";

export const productFormSchema = z.object({
  id: z.string(),
  category: z.string(),
  description: z
    .string()
    .min(3, "La descripción debe contener al menos 3 caracteres")
    .max(500, "La descripción debe contener máximo 200 caracteres"),
  images: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Debes subir al menos una imagen",
    }),
  inStock: z.number(),
  price: z.number(),
  sizes: z.string().array(),
  slug: z
    .string()
    .min(3, "El slug debe contener al menos 3 caracteres")
    .max(50, "El slug debe contener máximo 50 caracteres"),
  tags: z.string().array(),
  title: z
    .string()
    .min(3, "El título debe contener al menos 3 caracteres")
    .max(50, "El título debe contener máximo 50 caracteres"),
  type: z.string(),
});
