import { TopBar } from "@/components/top-bar/top-bar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-sky-400">
      <TopBar />
      {children}
    </main>
  );
}
