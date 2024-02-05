"use client";
import React from "react";
import Types from "../components/Types";
import { signIn, useSession } from "next-auth/react";

type Props = {};

const Type = (props: Props) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const email = user?.email;
  console.log("user", user);
  console.log("session client", session);

  // if (status === "unauthenticated") {
  //   signIn();
  // }
  return (
    <div className="p-4">
      <Types />
    </div>
  );
};

export default Type;
