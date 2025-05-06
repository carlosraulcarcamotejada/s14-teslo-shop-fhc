"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { DeleteProductImageArgs } from "@/interfaces/product/delete-product-image-args";
import { cloudinary } from "@/config/cloudinary";

export const deleteProductImage = async ({
  id,
  url,
}: DeleteProductImageArgs): Promise<ErrorPrisma> => {
  try {
    if (!url.startsWith("http")) {
      return {
        ok: false,
        message: "No se pueden borrar imágenes de filesystem",
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
        ok: false,
      };
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return {
      message: "Imágen eliminada correctamente",
      ok: true,
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
