import { addressFormSchema } from "@/schema/address-form-schema";
import { z } from "zod";

type Address = z.infer<typeof addressFormSchema>;

export type { Address };
