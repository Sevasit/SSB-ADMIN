"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
