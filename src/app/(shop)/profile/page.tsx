import { TitlePage } from "@/components/shared/title-page";
import { auth } from "@/config/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  // !session?.user && redirect("/auth/login");

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title="Perfil" />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
