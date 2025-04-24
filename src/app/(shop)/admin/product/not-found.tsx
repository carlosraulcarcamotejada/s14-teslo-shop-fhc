"use client";
import { ElementNotFound } from "@/components/shared/element-not-found";
import { BoxIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NotFoundPage() {
  return (
    <ElementNotFound
      title="Producto no encontrado"
      subTitle="Lo sentimos, no pudimos encontrar el producto que estás buscando."
      buttonProps={{
        label: "Regresar a productos",
        icon: BoxIcon,
        onClick() {
          redirect("/admin/products");
        },
      }}
    />
  );
}
