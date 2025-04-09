import { ComponentPropsWithoutRef } from "react";

interface NotFoundProps extends ComponentPropsWithoutRef<"div"> {
    title?: string;
    subTitle?: string;
    
}

export type { NotFoundProps };
