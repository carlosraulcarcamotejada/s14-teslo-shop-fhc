import { ClassValue } from "clsx";

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title = ({ title, subTitle }: TitleProps) => {
  return (
    <div>
      <h1 className={`antialiased text-4xl font-semibold my-10`}>{title}</h1>
      {subTitle && <h3 className="text-xl mb-10">{subTitle}</h3>}
    </div>
  );
};
