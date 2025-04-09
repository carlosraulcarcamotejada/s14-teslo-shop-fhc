import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/seed/seed";

interface ProductFormProps extends ComponentPropsWithoutRef<"div"> {
    product: Product
}

export type { ProductFormProps };
