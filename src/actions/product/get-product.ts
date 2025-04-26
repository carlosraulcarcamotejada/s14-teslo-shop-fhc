"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CategoryOption } from "@/interfaces/category/category-option";
import { GetProduct } from "@/interfaces/actions/get-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Product } from "@/interfaces/product/product";
import { TypeOption } from "@/interfaces/type/type-option";

export const getProduct = async ({
  id,
  showProductImage,
  slug,
}: GetProduct): Promise<
  ErrorPrisma & {
    product?: Product;
  }
> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: {
          select: { ...(showProductImage && { id: true }), url: true },
        },
        category: {
          select: { name: true },
        },
        type: {
          select: { name: true },
        },
      },
      where: {
        ...(slug && { slug }),
        ...(id && { id }),
      },
    });

    if (!product) {
      return {
        ok: false,
        message: "No se encontró el producto",
        product: undefined,
      };
    }

    delete (product as Partial<typeof product>)?.categoryId;
    delete (product as Partial<typeof product>)?.typeId;

    const { category, type, productImage, ...restProduct } = product;

    const productData: Product = {
      ...(showProductImage && {
        productImage: productImage.map((image) => ({ ...image })),
      }),
      ...restProduct,
      category: category.name as CategoryOption,
      images: showProductImage ? [] : productImage.map((image) => image.url),
      type: type.name as TypeOption,
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
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
      };
    }
  }
};
