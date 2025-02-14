import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await Promise.all([]);

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  
  const { categories, products } = initialData;


  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = new Map<string, string>();

  categoriesDB.forEach((category) => {
    categoriesMap.set(category.name, category.id);
  });

  products.forEach( async(product) => {

    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap.get(type) || "non-category"
      }
    })


    // Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });

  });


  console.log("seed efecutado exitosamente");
}

(() => {
  main();
})();
