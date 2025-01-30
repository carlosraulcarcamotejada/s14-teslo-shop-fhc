import { TopBar } from "@/components/shared/top-bar/top-bar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopBar />
      <div className="p-6">{children}</div>
    </main>
  );
}
