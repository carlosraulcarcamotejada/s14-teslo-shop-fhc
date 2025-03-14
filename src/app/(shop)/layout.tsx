import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar/navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-40 pt-6 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {children}
      </main>
      <Footer className="h-10" />
    </>
  );
}
