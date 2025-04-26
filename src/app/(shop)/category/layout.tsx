import { PageContainer } from "@/components/page/page-container";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
