"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { GetProductArgs } from "@/interfaces/actions/get-product-args";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Product } from "@/interfaces/product/product";
import { CategoryOption } from "@/interfaces/category/category-option";
import { TypeOption } from "@/interfaces/type/type-option";

export const getProduct = async ({
  id,
  showProductImage,
  slug,
}: GetProductArgs): Promise<
  ApiResponse & {
    product?: Product;
  }
> => {
  try {
    const productData = await prisma.product.findFirst({
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

    if (!productData) {
      return {
        message: "No se encontró el producto",
        success: false,
      };
    }

    const { category, type, productImage, ...restProductData } = productData;

    const product: Product = {
      ...(showProductImage && {
        productImage: productImage.map((image) => ({ ...image })),
      }),
      ...restProductData,
      images: showProductImage ? [] : productImage.map((image) => image.url),
      categoryOption: category.name as CategoryOption,
      typeOption: type.name as TypeOption,
    };

    return {
      success: true,
      product,
      message: "Producto obtenido correctamente",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    } else {
      return {
        message: "No hay productos en el pedido.",
        success: false,
      };
    }
  }
};
