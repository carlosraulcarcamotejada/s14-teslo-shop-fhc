"use client";
import { Tab, Tabs } from "@heroui/react";
import { useRouter } from "next/navigation";

export const TopBarMenuTabs = () => {
  interface Tabs {
    id: number;
    label: string;
    path: string;
  }

  const tabs: Tabs[] = [
    { id: 1, label: "Hombres", path: "/category/hombres" },
    { id: 2, label: "Mujeres", path: "/category/mujeres" },
    { id: 3, label: "Niños", path: "/category/ninos" },
  ];

  const router = useRouter();

  const handleTabClick = (path: string) => {
    router.push(path); // Navega a la ruta especificada
  };

  return (
    <Tabs aria-label="Tabs radius" radius={"lg"}>
      {tabs.map(({ id, label, path }) => (
        <Tab
          key={id}
          title={label}
          onClick={() => {
            console.log({ path });
            // handleTabClick(path);
          }}
        />
      ))}
    </Tabs>
  );
};
