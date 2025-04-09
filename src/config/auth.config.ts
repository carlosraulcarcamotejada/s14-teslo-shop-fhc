import prisma from "@/lib/prisma";
import NextAuth, { Session, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.data as Session["user"];
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        console.log({ email, password });

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLocaleLowerCase(),
          },
        });
        if (!user) return null;

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        const userWithoutPassword = { ...user } as Partial<typeof user>;
        delete userWithoutPassword.password;
        return userWithoutPassword;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
