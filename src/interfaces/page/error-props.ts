import { ComponentPropsWithoutRef } from "react";

interface ErrorProps extends ComponentPropsWithoutRef<"div"> {
error: Error & { digest?: string }
  reset: () => void
}

export type { ErrorProps };
