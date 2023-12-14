import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AxiosCustom from "./AxiosApi";
import { IUserResponse } from "../types/IUserResponse";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        const res = await AxiosCustom.post(
          "/auth/login",
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.data) {
          const user = {
            ...res.data.data,
            token: res.data.token,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const res = await AxiosCustom.get<IUserResponse>(
        `/auth/findUserData?email=${session.user?.email}`
      );
      session.userData = res.data;
      session.jwt = token.accessToken;
      return session;
    },
  },
};
