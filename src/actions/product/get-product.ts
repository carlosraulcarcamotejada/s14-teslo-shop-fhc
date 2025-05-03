"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { GetProduct } from "@/interfaces/actions/get-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Product } from "@/interfaces/product/product";

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

    const { categoryId, productImage, typeId, ...restProduct } = product;

    const productData: Product = {
      ...(showProductImage && {
        productImage: productImage.map((image) => ({ ...image })),
      }),
      ...restProduct,
      category: categoryId,
      images: showProductImage ? [] : productImage.map((image) => image.url),
      type: typeId,
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
