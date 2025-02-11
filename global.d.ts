import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Agregamos la propiedad prisma al objeto global
}

export {};
