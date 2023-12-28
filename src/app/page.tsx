"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";

type Props = {};

function Page({}: Props) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const email = user?.email;
  console.log("user", user);
  console.log("session client", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    signIn();
  }

  return (
    <div className="">
      <h1>Secure Page</h1>
      <p>Welcome! {email}</p>
    </div>
  );
}

export default Page;
