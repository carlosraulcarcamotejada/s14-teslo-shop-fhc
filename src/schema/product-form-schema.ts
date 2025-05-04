import { z } from "zod";

export const productFormSchema = z.object({
  id: z.string().uuid({ message: "uuid no válido" }).optional().nullable(),
  categoryId: z.string().uuid({ message: "uuid no válido" }),
  description: z
    .string()
    .min(3, "La descripción debe contener al menos 3 caracteres")
    .max(500, "La descripción debe contener máximo 200 caracteres"),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((inStock) => Number(inStock.toFixed(0))),
  price: z.coerce
    .number()
    .min(0)
    .transform((price) => Number(price.toFixed(2))),
  // sizes: z.coerce.string().transform((sizes) => sizes.split(",")),
  sizes: z
    .array(z.string().min(1))
    .min(1, { message: "Debe seleccionar al menos una talla" }),
  slug: z.coerce
    .string()
    .min(3, "El slug debe contener al menos 3 caracteres")
    .max(50, "El slug debe contener máximo 50 caracteres")
    .transform((slug) => slug.toLowerCase().replace(/ /g, "-").trim()),
  tags: z.coerce.string().transform((tags) => tags.split(",")),
  title: z
    .string()
    .min(3, "El título debe contener al menos 3 caracteres")
    .max(50, "El título debe contener máximo 50 caracteres"),
  typeId: z.string().uuid({ message: "uuid no válido" }),
  imagesFile: z.any().optional(),
});
