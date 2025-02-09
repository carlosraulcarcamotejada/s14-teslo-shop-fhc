import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar/navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
