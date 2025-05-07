import { UserRole } from "@/interfaces/user/user";

interface ChangeUserRoleArgs {
  userId: string;
  role: UserRole;
}

export type { ChangeUserRoleArgs };
