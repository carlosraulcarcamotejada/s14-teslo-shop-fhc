interface ProductImageCardProps extends React.ComponentPropsWithoutRef<"div"> {
  id: string;
  url: string;
  isDisabled?: boolean;
}

export type { ProductImageCardProps };
