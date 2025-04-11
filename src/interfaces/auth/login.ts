import { LoginFormSchema } from "@/schema/login-form-schema";
import { z } from "zod";

type Login = z.infer<typeof LoginFormSchema>  

export type { Login };
