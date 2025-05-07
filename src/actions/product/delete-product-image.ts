"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { DeleteProductImageArgs } from "@/interfaces/product/delete-product-image-args";
import { cloudinary } from "@/config/cloudinary";

export const deleteProductImage = async ({
  id,
  url,
}: DeleteProductImageArgs): Promise<ApiResponse> => {
  try {
    if (!url.startsWith("http")) {
      return {
        message: "No se pueden borrar imágenes de filesystem",
        success: false,
      };
    }

    const imageName: string = url.split("/").at(-1)?.split(".")[0] ?? "no-name";

    await cloudinary.uploader.destroy(imageName);

    const deletedImage = await prisma.productImage.delete({
      where: {
        id,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!deletedImage) {
      return {
        message: "No se pudo borrar la imágen",
        success: false,
      };
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return {
      message: "Imágen eliminada correctamente",
      success: true,
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
