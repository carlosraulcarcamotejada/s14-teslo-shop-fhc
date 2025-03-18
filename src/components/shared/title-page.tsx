import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { TitleProps } from "@/interfaces/title-props";

export const TitlePage = ({
  title,
  subTitle,
  className,
  ...props
}: TitleProps) => {
  return (
    <div {...props} className={cn("", className)}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-xl">{subTitle}</h3>}
    </div>
  );
};
