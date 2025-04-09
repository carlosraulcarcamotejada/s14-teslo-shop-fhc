"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotFoundProps } from "@/interfaces/not-found-props";
import { RotateCwIcon } from "lucide-react";

export const NotFoundElement = ({
  className,
  title = " Elemento no encontrado",
  subTitle,
  ...props
}: NotFoundProps) => {
  return (
    <div {...props} className={cn("", className)}>
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            {subTitle}
          </p>
        )}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            onClick={() => window.location.reload()}
            className={buttonVariants({ variant: "default" })}
          >
            Recargar página
            <RotateCwIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
