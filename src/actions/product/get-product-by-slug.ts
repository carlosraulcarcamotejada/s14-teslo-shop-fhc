"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Type } from "@/interfaces/shared/type";
import { CategoryOption } from "@/interfaces/category/category-option";
import { GetProductBySlug } from "@/interfaces/actions/get-product-by-slug";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";

export const getProductBySlug = async ({
  showProductImage,
  slug,
}: GetProductBySlug): Promise<
  ErrorPrisma & {
    product: (Product & { productImage?: ProductImage[] }) | null;
  }
> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: {
          select: { ...(showProductImage && { id: true }), url: true },
        },
      },
      where: {
        slug,
      },
    });

    if (!product) return { ok: false, product: null };

    const { categoryId, typeId, productImage, ...restProduct } = product;

    const productData: Product & { productImage?: ProductImage[] } = {
      ...(showProductImage && {
        productImage: productImage.map((image) => ({
          url: image.url,
          id: image.id,
        })),
      }),
      images: showProductImage ? [] : productImage.map((image) => image.url),
      category: categoryId as CategoryOption,
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
