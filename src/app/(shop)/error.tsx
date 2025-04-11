"use client";
import { useEffect } from "react";
import { ErrorProps } from "@/interfaces/error-props";
import { RotateCwIcon } from "lucide-react";
import { PageContainer } from "@/components/page/page-container";
import { ElementNotFound } from "@/components/shared/element-not-found";

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {}, [error]);

  return (
    <PageContainer>
      <ElementNotFound
        show404={false}
        title="Hubo un error"
        subTitle={error.message}
        buttonProps={{
          label: "Recargar",
          icon: RotateCwIcon,
          onClick: () => reset(),
        }}
      />
    </PageContainer>
  );
}
