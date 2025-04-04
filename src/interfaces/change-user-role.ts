import { UserRole } from "@/interfaces/user";

interface ChangeUserRole {
  userId: string;
  role: UserRole;
}

export type { ChangeUserRole };
