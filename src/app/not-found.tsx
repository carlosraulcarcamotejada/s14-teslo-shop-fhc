"use client";
import { PageContainer } from "@/components/page/page-container";
import { ElementNotFound } from "@/components/shared/element-not-found";
import { HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NamePage() {
  return (
    <PageContainer className="grid place-content-center h-screen">
      <ElementNotFound
        buttonProps={{
          label: "Regresar a la página de inicio",
          icon: HomeIcon,
          onClick: redirect("/"),
        }}
        title="Pagina no encontrada"
        subTitle="Lo sentimos, no pudimos encontrar la página que estás buscando."
      />
    </PageContainer>
  );
}
