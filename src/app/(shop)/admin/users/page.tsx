export const revalidate = 0;
import { getUsersPaginated } from "@/actions/users/get-users-paginated";
import { TitlePage } from "@/components/shared/title-page";
import { UsersTable } from "@/interfaces/users/users-table";

export default async function AdminUsersPage() {
  const { users, totalPages } = await getUsersPaginated();

  return (
    <div className="col-start-1 col-span-full px-4">
      <TitlePage size="m" title={`Mantenimiento de usuarios:`} />
      <UsersTable data={users} totalPages={totalPages} />
    </div>
  );
}
