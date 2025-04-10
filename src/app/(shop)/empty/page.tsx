"use client";
import { PageContainer } from "@/components/page/page-container";
import { ElementNotFound } from "@/components/shared/element-not-found";
import { HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function EmptyPage() {
  return (
    <PageContainer>
      <ElementNotFound
        title="No hay productos en el carrito de compras"
        show404={false}
        subTitle="Puede elegir productos en la página de inicio o en las diferentes categorías"
        buttonProps={{
          label: "Ir al home",
          icon: HomeIcon,
          onClick: () => {
            redirect("/");
          },
        }}
      />
    </PageContainer>
  );
}
