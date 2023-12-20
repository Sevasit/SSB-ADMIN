"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

type Props = {};

function Employee({}: Props) {
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
  return <div>Employee</div>;
}

export default Employee;
