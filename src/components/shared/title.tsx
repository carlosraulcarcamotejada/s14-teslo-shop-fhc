import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface TitleProps {
  title: string;
  subTitle?: string;
  className?: ClassValue;
}

export const Title = ({ title, subTitle, className }: TitleProps) => {
  return (
    <div>
      <h1
        className={cn(
          `${titleFont.className} antialiased text-4xl font-semibold`,
          className
        )}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-xl">{subTitle}</h3>}
    </div>
  );
};
