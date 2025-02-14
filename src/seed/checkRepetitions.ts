import { Product } from "./seed";

export const checkRepetitions = (products: Product[]): Product | undefined => {
  const seen = new Set<string>();

  for (const product of products) {
    if (seen.has(product.description)) {
      return product; // Retorna el primer producto duplicado
    }
    seen.add(product.description);
  }

  return undefined; // Si no hay repetidos
};
