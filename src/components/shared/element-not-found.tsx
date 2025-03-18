import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ElementNotFoundProps } from "@/interfaces/element-not-found-props";

export const ElementNotFound = ({
  className,
  ...props
}: ElementNotFoundProps) => {
  return (
    <div
      {...props}
      className={cn(
        "grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8",
        className
      )}
    >
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Regresa a inicio
          </Link>
          <Link href="#" className={buttonVariants({ variant: "link" })}>
            Contactar con soporte técnico <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
