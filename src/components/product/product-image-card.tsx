import { Card, CardContent, CardFooter } from "../ui/card";
import { ProductImage } from "@/components/product/product-image";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImageCardProps } from "@/interfaces/product/product-image-card-props";
import { cn } from "@/lib/utils";
import { deleteProductImage } from "@/actions/product/delete-product-image";

export const ProductImageCard = ({
  className,
  id,
  url,
  ...rest
}: ProductImageCardProps) => {
  return (
    <Card {...rest} className={cn("w-m", className)}>
      <CardContent className="p-0 overflow-hidden">
        <ProductImage
          className="size-40 rounded-t-md"
          src={url}
          alt={url}
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter className="flex justify-center p-0">
        <Button
          className="w-full rounded-b-md rounded-t-none"
          type="button"
          variant={"destructive"}
          onClick={() => {
            // console.log({ id });
            deleteProductImage({ id, url });
          }}
        >
          <Trash2Icon />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};
