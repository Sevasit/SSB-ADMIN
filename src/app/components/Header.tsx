"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LogoRms from "../../../public/RMS.png";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    if (data?.url) {
      router.push(data.url);
    }
  };

  return (
    <>
      <div className="flex fixed w-full z-50  bg-gradient-to-r from-[#00DC82] to-[#97ffe0] py-5 justify-between items-center px-4 pt-4">
        <div className=" pl-5">
          <Image src={LogoRms} alt="LogoRms" width={50} height={50} />
        </div>
        <div className=" flex gap-3 items-center">
          <div>
            {session &&
              session?.userData.firstName + " " + session?.userData.lastName}
          </div>
          <div
            onClick={() => handleSignOut()}
            className="bg-[#0f8d67] text-white hover:bg-[#b91515] duration-300 shadow-md cursor-pointer px-2 py-1 rounded-lg flex gap-1"
          >
            <span>ออกจากระบบ</span>
            <LogoutOutlinedIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
