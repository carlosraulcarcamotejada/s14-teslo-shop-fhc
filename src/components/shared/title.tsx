import { titleFont } from "@/config/fonts";

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title = ({ title, subTitle }: TitleProps) => {
  return (
    <div>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-xl">{subTitle}</h3>}
    </div>
  );
};
