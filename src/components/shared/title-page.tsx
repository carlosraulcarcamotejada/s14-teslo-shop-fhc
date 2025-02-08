import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface TitleProps {
  title: string;
  subTitle?: string;
  className?: ClassValue;
}

export const TitlePage = ({ title, subTitle, className }: TitleProps) => {
  return (
    <div className={cn(className)}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-xl">{subTitle}</h3>}
    </div>
  );
};
