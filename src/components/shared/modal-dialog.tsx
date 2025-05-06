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
import { ModalDialogProps } from "@/interfaces/components/modal-dialog-props";
import { IconTypeLucideProps } from "@/interfaces/icon/icon-type-lucide-props";

export const ModalDialog = ({ buttonTrigger, modalArgs }: ModalDialogProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const IconButtonTrigger: IconTypeLucideProps | undefined = buttonTrigger.icon;
  const IconPrimaryBtn: IconTypeLucideProps | undefined =
    modalArgs?.primaryActionButton?.icon;
  const IconSecondaryBtn: IconTypeLucideProps | undefined =
    modalArgs?.secondaryActionButton?.icon;

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            className="w-full rounded-b-md rounded-t-none"
            type="button"
            variant={"destructive"}
            disabled={isLoading}
          >
            {IconButtonTrigger && <IconButtonTrigger />}
            {buttonTrigger.text}
          </Button>
        </DrawerTrigger>

        {!isDesktop && modalArgs && (
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-center">
                {modalArgs.title}
              </DrawerTitle>
              <DrawerDescription className="text-center">
                {modalArgs.description}
              </DrawerDescription>
            </DrawerHeader>
            {/* <ProfileForm className="px-4" /> */}
            <div className="px-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => {
                  setIsLoading(true);
                  typeof modalArgs?.primaryActionButton?.onClick ===
                    "function" && modalArgs?.primaryActionButton?.onClick();
                  // const { message } = await deleteProductImage({
                  //   id,
                  //   url,
                  // });
                  // toast(message, {
                  //   action: {
                  //     label: <XIcon className="w-4 h-4" />,
                  //     onClick: () => {
                  //       toast.dismiss();
                  //     },
                  //   },
                  // });
                  // setOpen(false);
                  setIsLoading(false);
                }}
              >
                {IconPrimaryBtn && <IconPrimaryBtn />}
                {modalArgs.primaryActionButton?.text}
              </Button>
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">
                  {IconSecondaryBtn && <IconSecondaryBtn />}
                  {modalArgs.secondaryActionButton?.text}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
      {isDesktop && modalArgs && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                {modalArgs.title}
              </DialogTitle>
              <DialogDescription className="text-center">
                {modalArgs.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-2">
              <Button
                className="w-full"
                variant="destructive"
                onClick={async () => {
                  // const { message } = await deleteProductImage({
                  //   id,
                  //   url,
                  // });
                  // toast(message, {
                  //   action: {
                  //     label: <XIcon className="w-4 h-4" />,
                  //     onClick: () => {
                  //       toast.dismiss();
                  //     },
                  //   },
                  // });
                  setOpen(false);
                }}
              >
                {IconPrimaryBtn && <IconPrimaryBtn />}
                {modalArgs.primaryActionButton?.text}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                className="w-full"
                variant="outline"
              >
                {IconSecondaryBtn && <IconSecondaryBtn />}
                {modalArgs.secondaryActionButton?.text}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
