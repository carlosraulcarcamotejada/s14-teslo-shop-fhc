import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);
}

(() => {
  main();
})();
