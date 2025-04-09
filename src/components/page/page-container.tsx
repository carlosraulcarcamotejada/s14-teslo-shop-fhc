import { cn } from "@/lib/utils";
import { PageContainerProps } from "@/interfaces/page-container-props";

export const PageContainer = ({
  className,
  children,
  ...props
}: PageContainerProps) => {
  return (
    <main
      className={cn(
        "col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};
