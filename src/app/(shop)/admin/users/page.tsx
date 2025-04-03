export const revalidate = 0;
import { getUsers } from "@/actions/users/get-users";
import { TitlePage } from "@/components/shared/title-page";
import { UsersTable } from "@/components/users/users-table";
import { User } from "@/interfaces/user";

export default async function AdminUsersPage() {
  const { users = [] } = await getUsers();

  const data: User[]  = users?.map((user) => user) ;

  return (
    <div className="col-start-1 col-span-full px-4">
      <TitlePage size="m" title={`Mantenimiento de usuarios:`} />
      <UsersTable className="" data={data} />
    </div>
  );
}
