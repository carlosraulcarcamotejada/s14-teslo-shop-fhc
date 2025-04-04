"use client";
import { ErrorProps } from "@/interfaces/error-props";
import { PhoneCall, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
  className,
  ...rest
}: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={cn(className, "col-start-1 col-span-full px-4")} {...rest}>
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="hidden">
            <Chip variant="outline">We&apos;re live!</Chip>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              Hubo un error
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              {error.message}.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4 hidden" variant="outline">
              Jump on a call <PhoneCall />
            </Button>
            <Button onClick={reset} size="lg" className="gap-4">
              Recargar <RotateCwIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
