import { TopBar } from "@/components/shared/top-bar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopBar />
      <div className="flex flex-col gap-y-10 pb-40 px-6 py-6">{children}</div>
    </main>
  );
}
