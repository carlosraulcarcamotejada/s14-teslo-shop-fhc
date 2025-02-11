-- CreateTable
CREATE TABLE "productImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "productImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
