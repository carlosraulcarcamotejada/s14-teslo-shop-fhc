import { Card, CardContent, CardFooter } from "../ui/card";
import { ProductImage } from "@/components/product/product-image";
import { Trash2Icon, XIcon } from "lucide-react";
import { ProductImageCardProps } from "@/interfaces/product/product-image-card-props";
import { cn } from "@/lib/utils";
import { deleteProductImage } from "@/actions/product/delete-product-image";
import { toast } from "sonner";
import { ModalDialog } from "../shared/modal-dialog";

export const ProductDeleteImageCard = ({
  className,
  id,
  isDisabled = false,
  url,
  ...rest
}: ProductImageCardProps) => {
  return (
    <Card {...rest} className={cn("w-40 h-50", className)}>
      <CardContent className="p-0 overflow-hidden">
        <ProductImage
          className={cn(
            isDisabled &&
              "opacity-50 grayscale pointer-events-none select-none cursor-not-allowed",
            "w-full h-36 rounded-t-md object-cover"
          )}
          src={url}
          alt={url}
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter className="flex justify-center p-0">
        <ModalDialog
          buttonTrigger={{
            className: "rounded-b-md rounded-t-none w-full",
            icon: Trash2Icon,
            text: "Eliminar",
            variant: "destructive",
          }}
          modalArgs={{
            title: "Eliminar imágen",
            description: "¿Está seguro que desea eliminar la imágen?",
            primaryActionButton: {
              icon: Trash2Icon,
              text: "Eliminar",
              variant: "destructive",
              onClick: async () => {
                const { message } = await deleteProductImage({ id, url });
                toast( message, {
                  action: {
                    label: <XIcon className="w-4 h-4" />,
                    onClick: () => {
                      toast.dismiss();
                    },
                  },
                });
              },
            },
          }}
        />
      </CardFooter>
    </Card>
  );
};
