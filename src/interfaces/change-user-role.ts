import { UserRole } from "@/interfaces/user/user";

interface ChangeUserRole {
  userId: string;
  role: UserRole;
}

export type { ChangeUserRole };
