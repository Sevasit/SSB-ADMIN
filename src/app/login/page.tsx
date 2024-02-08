"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

type Props = {};

function Page({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submit = () => {
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* <!-- left side --> */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-1 text-4xl font-bold">Sign in</span>
          <span className="font-light text-gray-400 mb-4">
            Suggestion system for BUS
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className=" focus:text-[#00DC82] w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              className=" focus:text-[#00DC82] w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 "
            />
          </div>
          <button
            onClick={submit}
            className="w-full mt-5 transition delay-150 duration-300 bg-[#00DC82] text-white p-2 rounded-lg mb-6 hover:bg-[#f0f4f2] border shadow-md hover:text-black hover:border"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
