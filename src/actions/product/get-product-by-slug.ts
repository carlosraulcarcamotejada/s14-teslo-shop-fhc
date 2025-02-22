"use server";

import prisma from "@/lib/prisma";
import { Category, Product, Type } from "@/seed/seed";

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: { productImage: { select: { url: true } } },
      where: {
        slug,
      },
    });

    if (!product) return null;

    const { categoryId, typeId, productImage, ...restProduct } = product;

    return {
      images: productImage.map((image) => image.url),
      category: categoryId as Category,
      type: typeId as Type,
      ...restProduct,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el producto por slug");
  }
};
