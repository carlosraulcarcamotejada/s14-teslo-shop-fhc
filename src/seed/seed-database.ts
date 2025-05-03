import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1. Borrar registros previos
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.type.deleteMany();

  const { categories, products, types, users, countries } = initialData;

  await prisma.country.createMany({ data: countries });

  await prisma.user.createMany({
    data: users,
  });

  const categoriesData = categories.map((category) => ({ name: category }));

  const typesData = types.map((type) => ({ name: type }));

  await prisma.category.createMany({ data: categoriesData });

  await prisma.type.createMany({ data: typesData });

  const categoriesDB = await prisma.category.findMany();

  const typesDB = await prisma.type.findMany();

  const categoriesMap = new Map<string, string>();

  const typesMap = new Map<string, string>();

  categoriesDB.forEach((category) => {
    categoriesMap.set(category.name, category.id);
  });

  typesDB.forEach((type) => {
    typesMap.set(type.name, type.id);
  });

  for (const product of products) {
    try {
      const {
        images,
        inStock = 0,
        price = 0,
        categoryId,
        ...restProduct
      } = product;

      const dbProduct = await prisma.product.create({
        data: {
          ...restProduct,
          inStock,
          price,
          categoryId: categoryId,
        },
      });

      const imagesData = images.map((image) => ({
        url: image,
        productId: dbProduct.id,
      }));

      await prisma.productImage.createMany({
        data: imagesData,
      });

      console.log(`✅ Producto creado: ${dbProduct.title}`);
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
    }
  }

  console.log("seed efecutado exitosamente");
}

(() => {
  main();
})();
