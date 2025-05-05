"use server";

import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { DeleteProductImageArgs } from "@/interfaces/product/delete-product-image-args";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";

// Configuration
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

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
    console.log({ url });
    const imageName: string = url.split("/").at(-1)?.split(".")[0] ?? "no-name";

    console.log({ imageName });

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
        ok: false,
      };
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug }`);

    return {
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
