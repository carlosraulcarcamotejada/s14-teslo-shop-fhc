import { titleFont } from "@/config/fonts";
import { StockLabelProps } from "@/interfaces/components/stock-label-props";

export const StockLabel = ({ inStock = 0 }: StockLabelProps) => {
  return (
    <h3
      className={`${titleFont.className} antialiased`}
    >{`Stock: ${inStock}`}</h3>
  );
};
