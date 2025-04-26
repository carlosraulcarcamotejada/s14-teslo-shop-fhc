"use client";
import { ElementNotFound } from "@/components/shared/element-not-found";
import { HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NotFoundCategoryPage() {
  return (
    <ElementNotFound
      title="La categoría no existe"
      subTitle="Lo sentimos, no pudimos encontrar la categoría que estás buscando."
      buttonProps={{
        label: "Regresar al inicio",
        icon: HomeIcon,
        onClick() {
          redirect("/");
        },
      }}
    />
  );
}
