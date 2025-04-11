import { PageContainer } from "@/components/page/page-container";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
