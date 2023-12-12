"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    if (data?.url) {
      router.push(data.url);
    }
  };
  return (
    <div>
      <button onClick={() => handleSignOut()} className="bg-red-500">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
