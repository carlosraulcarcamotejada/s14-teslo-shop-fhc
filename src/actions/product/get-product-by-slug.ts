"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Product } from "@/interfaces/product/product";
import { Type } from "@/interfaces/shared/type";
import { Category } from "@/interfaces/shared/category";
import { GetProductBySlug } from "@/interfaces/actions/get-product-by-slug";

export const getProductBySlug = async ({
  slug,
}: GetProductBySlug): Promise<{
  ok: boolean;
  product: Product | null;
  message?: string;
  code?: string;
}> => {
  try {
    const product = await prisma.product.findFirst({
      include: { productImage: { select: { url: true } } },
      where: {
        slug,
      },
    });

    if (!product) return { ok: false, product: null };

    const { categoryId, typeId, productImage, ...restProduct } = product;

    const productData: Product = {
      images: productImage.map((image) => image.url),
      category: categoryId as Category,
      type: typeId as Type,
      ...restProduct,
    };

    return {
      ok: true,
      product: productData,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        product: null,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        product: null,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        product: null,
      };
    }
  }
};
