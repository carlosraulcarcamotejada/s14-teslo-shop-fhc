"use client";
import { getStockById } from "@/actions/product/get-stock-by-id";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StockLabelProps {
  id: string;
}

export const StockLabel = ({ id }: StockLabelProps) => {
  const [inStock, setInStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = (await getStockById(id)) ?? 1;
    setInStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-32 h-5 rounded-md" />
      ) : (
        <h3
          className={`${titleFont.className} antialiased`}
        >{`Stock: ${inStock}`}</h3>
      )}
    </>
  );
};
