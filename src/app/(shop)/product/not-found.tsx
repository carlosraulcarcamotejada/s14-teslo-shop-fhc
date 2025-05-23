"use client";
import { PageContainer } from "@/components/page/page-container";
import { ElementNotFound } from "@/components/shared/element-not-found";
import { HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NotFoundProductPage() {
  return (
    <PageContainer>
      <ElementNotFound
        title="Producto no encontrado"
        subTitle="Lo sentimos, no pudimos encontrar el producto que estás buscando."
        buttonProps={{
          label: "Regresar al inicio",
          icon: HomeIcon,
          onClick() {
            redirect("/");
          },
        }}
      />
    </PageContainer>
  );
}
