import { LoginFormSchema } from "@/schema/login-form-schema";
import { z } from "zod";

interface Login extends z.infer<typeof LoginFormSchema> {}

export type { Login };
