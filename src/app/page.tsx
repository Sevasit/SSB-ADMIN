"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

function Page({}: Props) {
  const route = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const email = user?.email;
  console.log("user", user);
  console.log("session client", session);

  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session!!]);

  // If the session is not yet available, show a loading message
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Secure Page</h1>
      <p>Welcome! {email}</p>
    </div>
  );
}

export default Page;
