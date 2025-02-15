/*
  Warnings:

  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `productImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `typeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_gender_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productImage" DROP CONSTRAINT "productImage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "productImage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "productImage_id_seq";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
