import { PageContainer } from "@/components/page/page-container";
import { auth } from "@/config/auth.config";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth();
  
    if (!session?.user) redirect("/auth/login");
  return <PageContainer>{children}</PageContainer>;
}
