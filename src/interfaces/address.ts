import { addressFormSchema } from "@/schema/address-form-schema";
import { z } from "zod";

interface Address extends z.infer<typeof addressFormSchema> {}

export type { Address };
