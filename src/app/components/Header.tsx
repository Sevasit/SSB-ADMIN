"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LogoRms from "../../../public/SSB.png";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });

    // if (data?.url) {
    //   router.push(data.url);
    // }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <div className="flex fixed w-full z-50  bg-gradient-to-r from-[#00DC82] to-[#97ffe0] py-5 justify-between items-center px-4 pt-4">
        <div className=" pl-5">
          <Image src={LogoRms} alt="LogoRms" width={50} height={50} />
        </div>
        <div className=" flex gap-3 items-center">
          <div>
            {session && (
              <div className="flex gap-3 justify-center items-center">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    className=" shadow-lg border-2 border-white"
                    alt="User logo"
                    src="/userAvartar.png"
                  />
                </StyledBadge>
                {session?.userData.firstName + " " + session?.userData.lastName}
              </div>
            )}
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
