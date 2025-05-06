import { useState } from "react";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  ActionButtonVariant,
  ModalDialogProps,
} from "@/interfaces/components/modal-dialog-props";
import { IconTypeLucideProps } from "@/interfaces/icon/icon-type-lucide-props";
import { cn } from "@/lib/utils";

export const ModalDialog = ({
  buttonTrigger,
  modalArgs: {
    description,
    primaryActionButton = {
      text: "Aceptar",
      variant: "default" as ActionButtonVariant,
    },
    secondaryActionButton = {
      text: "Cancelar",
      variant: "outline" as ActionButtonVariant,
    },
    title,
  } = {},
}: ModalDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const IconButtonTrigger: IconTypeLucideProps | undefined = buttonTrigger.icon;
  const IconPrimaryButton: IconTypeLucideProps | undefined =
    primaryActionButton?.icon;
  const IconSecondaryButton: IconTypeLucideProps | undefined =
    secondaryActionButton?.icon;

  const onClickPrimaryActionButton = async () => {
    setIsLoading(true);
    if (typeof primaryActionButton?.onClick === "function") {
      await primaryActionButton?.onClick();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Drawer open={isLoading} onOpenChange={setIsLoading}>
        <DrawerTrigger asChild>
          <Button
            className={cn("", buttonTrigger?.className)}
            type="button"
            variant={buttonTrigger?.variant ?? "default"}
            size={buttonTrigger?.size ?? "default"}
            disabled={isLoading}
          >
            {IconButtonTrigger && <IconButtonTrigger />}
            {buttonTrigger.text}
          </Button>
        </DrawerTrigger>

        {!isDesktop && (
          <DrawerContent>
            <DrawerHeader className="text-left">
              {title && (
                <DrawerTitle className="text-center">{title}</DrawerTitle>
              )}
              {description && (
                <DrawerDescription className="text-center">
                  {description}
                </DrawerDescription>
              )}
            </DrawerHeader>
            {/* <ProfileForm className="px-4" /> */}
            <div className="px-4">
              <Button
                className={cn("w-full", primaryActionButton?.className)}
                onClick={onClickPrimaryActionButton}
                size={primaryActionButton?.size ?? "default"}
                variant={primaryActionButton?.variant ?? "default"}
              >
                {IconPrimaryButton && <IconPrimaryButton />}
                {primaryActionButton?.text}
              </Button>
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button
                  className={cn("", secondaryActionButton?.className)}
                  size={secondaryActionButton?.size ?? "default"}
                  variant={secondaryActionButton?.variant ?? "default"}
                >
                  {IconSecondaryButton && <IconSecondaryButton />}
                  {secondaryActionButton?.text}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
      {isDesktop && (
        <Dialog open={isLoading} onOpenChange={setIsLoading}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">{title}</DialogTitle>
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-2">
              <Button
                className={cn("w-full", primaryActionButton?.className)}
                onClick={onClickPrimaryActionButton}
                size={primaryActionButton?.size ?? "default"}
                variant={primaryActionButton?.variant ?? "default"}
              >
                {IconPrimaryButton && <IconPrimaryButton />}
                {primaryActionButton?.text}
              </Button>
              <Button
                className={cn("", secondaryActionButton?.className)}
                size={secondaryActionButton?.size ?? "default"}
                variant={secondaryActionButton?.variant ?? "default"}
                onClick={() => {
                  setIsLoading(false);
                }}
              >
                {IconSecondaryButton && <IconSecondaryButton />}
                {secondaryActionButton?.text}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
