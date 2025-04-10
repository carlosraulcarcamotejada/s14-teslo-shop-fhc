"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotFoundProps } from "@/interfaces/not-found-props";
import { RotateCwIcon } from "lucide-react";

export const ElementNotFound = ({
  className,
  show404 = true,
  subTitle,
  title = " Elemento no encontrado",
  buttonProps = {
    icon: RotateCwIcon,
    label: "Recargar página",
    onClick: () => {
      window.location.reload();
    },
  },
  ...props
}: NotFoundProps) => {
  const Icon = buttonProps.icon;

  return (
    <div {...props} className={cn("", className)}>
      <div className="text-center">
        {show404 && <p className="text-base font-semibold text-primary">404</p>}
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900 lg:text-5xl">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            {subTitle}
          </p>
        )}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            onClick={() => buttonProps.onClick()}
            className={buttonVariants({ variant: "default" })}
          >
            {buttonProps.label}
            {Icon && <Icon />}
          </Button>
        </div>
      </div>
    </div>
  );
};
