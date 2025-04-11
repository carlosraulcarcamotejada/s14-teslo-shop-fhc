interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: UserRole;
  image?: string | null;
}

type UserRole = "user" | "admin";

export type { User, UserRole };
