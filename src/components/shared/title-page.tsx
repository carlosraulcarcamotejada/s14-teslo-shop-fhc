import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { TitleProps } from "@/interfaces/title-props";
import { clsx } from "clsx";

export const TitlePage = ({
  className,
  size = "l",
  subTitle,
  title,
  ...props
}: TitleProps) => {
  return (
    <div {...props} className={cn("", className)}>
      <h1
        className={clsx(
          titleFont.className,
          "antialiased font-semibold",
          size === "s" && "text-xl",
          size === "m" && "text-2xl",
          size === "l" && "text-4xl"
        )}
      >
        {title}
      </h1>
      {subTitle && (
        <h3
          className={clsx(
            size === "s" && "text-medium" ,
            size === "m" && "text-lg",
            size === "l" && "text-xl"
          )}
        >
          {subTitle}
        </h3>
      )}
    </div>
  );
};
