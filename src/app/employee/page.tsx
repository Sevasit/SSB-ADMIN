"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Customer from "../components/Customer";

type Props = {};

function Employee({}: Props) {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="p-4">
      <Customer />
    </div>
  );
}

export default Employee;
