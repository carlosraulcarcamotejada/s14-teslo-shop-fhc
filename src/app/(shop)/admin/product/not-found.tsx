"use client";
import { ElementNotFound } from "@/components/shared/element-not-found";
import { HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NotFoundPage() {
  return (
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
  );
}
