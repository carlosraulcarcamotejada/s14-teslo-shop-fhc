"use server";

import prisma from "@/lib/prisma";
import { Type } from "@/seed/seed";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  try {
    // 1. Obetener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: { productImage: { take: 2, select: { url: true } } },
    });

    // 2. Obtener el total de páginas
    const totalItems = await prisma.product.count({});

    const totalPages = Math.ceil(totalItems / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        id: product.id,
        description: product.description,
        images: product.productImage.map((image) => image.url), // Mapea las imágenes
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes,
        slug: product.slug,
        tags: product.tags,
        title: product.title,
        type: product.categoryId as Type, // Tipado como Type
        gender: product.gender as Gender, // Tipado como Category
      })),
    };
  } catch (error) {
    throw new Error("Servicio no disponible");
  }
};
