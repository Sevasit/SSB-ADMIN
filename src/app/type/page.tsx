"use client";
import React from "react";
import Types from "../components/Types";
import { signIn, useSession } from "next-auth/react";

type Props = {};

const Type = (props: Props) => {
  const { data: session, status } = useSession();
  const userRole = session?.userData.role;

  return (
    <div className="p-4">
      <Types />
    </div>
  );
};

export default Type;
