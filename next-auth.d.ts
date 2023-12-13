import { DefaultSession, DefaultUser } from "next-auth";
import { IUserResponse } from "./types/IUserResponse";

declare module "next-auth" {
  interface Session {
    jwt: JWT;
    userData: IUserResponse;
  }
}

declare module "next-auth" {
  interface User {
    token: JWT;
  }
}
