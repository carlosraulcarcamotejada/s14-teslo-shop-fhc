import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Debe proporcionar un email válido."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});
