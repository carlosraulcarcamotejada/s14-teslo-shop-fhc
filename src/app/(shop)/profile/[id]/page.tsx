import { getUserById } from "@/actions/users/get-user-by-id";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";

export default async function ProfileWithIdPage({ params }: PageProps) {
  const { id } = await params;

  const { user } = await getUserById({ id });

  return (
    <>
      <TitlePage title="Perfil" />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
