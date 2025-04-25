"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CategoryOption } from "@/interfaces/category/category-option";
import { GetProduct } from "@/interfaces/actions/get-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";
import { TypeOption } from "@/interfaces/type/type-option";

export const getProduct = async ({
  id,
  showProductImage,
  slug,
}: GetProduct): Promise<
  ErrorPrisma & {
    product: (Product & { productImage?: ProductImage[] }) | undefined;
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
        ...(slug && { slug }),
        ...(id && { id }),
      },
    });

    if (!product) return { ok: false, product: undefined };

    const { categoryId, typeId, productImage, ...restProduct } = product;

    const productData: Product & { productImage?: ProductImage[] } = {
      ...(showProductImage && {
        productImage: productImage.map((image) => ({ ...image })),
      }),
      images: showProductImage ? [] : productImage.map((image) => image.url),
      category: categoryId as CategoryOption,
      type: typeId as TypeOption,
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
        product: undefined,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        product: undefined,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        product: undefined,
      };
    }
  }
};
