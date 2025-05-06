import { Card, CardContent, CardFooter } from "../ui/card";
import { ProductImage } from "@/components/product/product-image";
import { Trash2Icon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImageCardProps } from "@/interfaces/product/product-image-card-props";
import { cn } from "@/lib/utils";
import { deleteProductImage } from "@/actions/product/delete-product-image";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";

export const ProductDeleteImageCard = ({
  className,
  id,
  isDisabled = false,
  url,
  ...rest
}: ProductImageCardProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              className="w-full rounded-b-md rounded-t-none"
              type="button"
              variant={"destructive"}
              disabled={isDisabled}
            >
              <Trash2Icon />
              Eliminar
            </Button>
          </DrawerTrigger>

          {!isDesktop && (
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle className="text-center">
                  Eliminar imágen
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  ¿Está seguro que desea eliminar la imágen?
                </DrawerDescription>
              </DrawerHeader>
              {/* <ProfileForm className="px-4" /> */}
              <div className="px-4">
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={async () => {
                    const { message } = await deleteProductImage({
                      id,
                      url,
                    });
                    toast(message, {
                      action: {
                        label: <XIcon className="w-4 h-4" />,
                        onClick: () => {
                          toast.dismiss();
                        },
                      },
                    });
                    setOpen(false);
                  }}
                >
                  <Trash2Icon />
                  Eliminar
                </Button>
              </div>
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Drawer>
        {isDesktop && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Eliminar imágen
                </DialogTitle>
                <DialogDescription className="text-center">
                  ¿Está seguro que desea eliminar la imágen?
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-y-2">
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={async () => {
                    const { message } = await deleteProductImage({
                      id,
                      url,
                    });
                    toast(message, {
                      action: {
                        label: <XIcon className="w-4 h-4" />,
                        onClick: () => {
                          toast.dismiss();
                        },
                      },
                    });
                    setOpen(false);
                  }}
                >
                  <Trash2Icon />
                  Eliminar
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};
