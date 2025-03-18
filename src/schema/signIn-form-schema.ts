import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email("Debe ser un email válido."),
  name: z
    .string()
    .min(3, "El nombre debe contener al menos 3 caracteres.")
    .max(50, "El nombre debe contener máximo  caracteres."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});
