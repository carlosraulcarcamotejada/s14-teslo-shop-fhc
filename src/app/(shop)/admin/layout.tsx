import { redirect } from "next/navigation";
import { PageContainer } from "@/components/page/page-container";
import { auth } from "@/config/auth.config";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/auth/login");
  }

  return <PageContainer>{children}</PageContainer>;
}
