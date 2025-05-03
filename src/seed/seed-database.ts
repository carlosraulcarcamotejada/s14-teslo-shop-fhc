import { CategoryOption } from "../interfaces/category/category-option";
import { TypeOption } from "../interfaces/type/type-option";
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

  const categoriesMap = new Map<CategoryOption, string>();

  const typesMap = new Map<TypeOption, string>();

  categoriesDB.forEach(({ id, name }) => {
    categoriesMap.set(name as CategoryOption, id);
  });

  typesDB.forEach(({ id, name }) => {
    typesMap.set(name as TypeOption, id);
  });

  for (const product of products) {
    try {
      const {
        images,
        inStock = 0,
        price = 0,
        categoryId,
        typeId,
        categoryOption,
        typeOption,
        ...restProduct
      } = product;

      void categoryOption;
      void typeOption;

      const dbProduct = await prisma.product.create({
        data: {
          ...restProduct,
          inStock,
          price,
          categoryId:
            categoriesMap.get(categoryId as CategoryOption) ?? "non-category",
          typeId: typesMap.get(typeId as TypeOption) ?? "non-type",
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

  console.log("¡Seed efecutado exitosamente!");
}

(() => {
  main();
})();
