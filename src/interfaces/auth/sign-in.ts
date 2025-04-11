import { SignInFormSchema } from "@/schema/signIn-form-schema";
import { z } from "zod";

type SignIn = z.infer<typeof SignInFormSchema>;

export type { SignIn };
