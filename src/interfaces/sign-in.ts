import { SignInFormSchema } from "@/schema/signIn-form-schema";
import { z } from "zod";

interface SignIn extends z.infer<typeof SignInFormSchema> {}
export type { SignIn };
