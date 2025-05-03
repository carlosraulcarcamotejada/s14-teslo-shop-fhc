"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { GetProduct } from "@/interfaces/actions/get-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Product } from "@/interfaces/product/product";
import { CategoryOption } from "@/interfaces/category/category-option";
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

    const { category, type, productImage, ...restProduct } = product;

    const productData: Product = {
      ...(showProductImage && {
        productImage: productImage.map((image) => ({ ...image })),
      }),
      ...restProduct,
      images: showProductImage ? [] : productImage.map((image) => image.url),
      categoryOption: category.name as CategoryOption,
      typeOption: type.name as TypeOption,
    };

    return {
      ok: true,
      product: productData,
      message: "Producto obtenido correctamente",
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
