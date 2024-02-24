"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";

type Props = {};

function Page({}: Props) {
  const { data: session, status } = useSession();
  // console.log(session);

  return <div className=""></div>;
}

export default Page;
