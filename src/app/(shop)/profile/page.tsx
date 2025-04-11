import { TitlePage } from "@/components/shared/title-page";
import { auth } from "@/config/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");

  return (
    <>
      <TitlePage title="Perfil" />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </>
  );
}
