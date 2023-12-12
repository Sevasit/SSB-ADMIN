import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import AxiosCustom from "../../../../../utils/AxiosApi";

const handler = NextAuth({
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
        console.log(credentials);
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
        console.log("ressssssssssssssss", res);
        if (res) {
          return {
            ...res.data.data,
            accessToken: res.data.token,
          };
        }
        return null;
      },
    }),
  ],
});
export { handler as GET, handler as POST };
