import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { plainPassword } from "./app/api/auth/salt";
import prisma from "@/db";
export const AUTHOPTIONS: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};
        const user = await prisma.user.findFirst({
          where: {
            email: username ?? "",
          },
        });

        if (user && password) {
          const isValid = await plainPassword(
            (password as string) ?? "",
            user.password
          );

          if (!isValid) {
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      //第一次登录先暂时用user.name暂存token，因为nextauth不让覆盖字段
      // 获取用户信息之后就可以覆盖
      if (trigger === "update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.email = session.email;
        token.avatar = session.avatar;
      }

      return token;
    },
    async session({ session, token }) {
      return session;
    },
    async authorized({ request, auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user;
    },
  },
};
const { handlers, auth, signIn, signOut } = NextAuth(AUTHOPTIONS);
export { handlers as POST, handlers as GET, auth, signIn, signOut };

// 获取当前user
