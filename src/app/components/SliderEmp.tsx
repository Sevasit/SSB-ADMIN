import React from "react";
import Link from "next/link";

import { RxDashboard } from "react-icons/rx";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Slider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="fixed w-32 pt-24 h-screen p-4 bg-[#f0f4f2] border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/dashboard"
            className=" w-20 text-white gap-2 border  bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-center items-center"
          >
            <RxDashboard size={28} />
            <span className=" text-[10px] uppercase font-semibold">
              Dashboard
            </span>
          </Link>
          <Link
            href="/approve"
            className=" w-20 text-white gap-2 border  bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-center items-center"
          >
            <IoPaperPlaneOutline size={28} />
            <span className=" text-[10px] uppercase font-semibold">
              Approved
            </span>
          </Link>
          <Link
            href="/completed"
            className=" w-20 text-white gap-2 border  bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-center items-center"
          >
            <IoMdCheckmarkCircleOutline size={28} />
            <span className=" text-[10px] uppercase font-semibold">
              Completed
            </span>
          </Link>
        </div>
      </div>
      <main className=" pt-20 ml-28 w-full">{children}</main>
    </div>
  );
};

export default Slider;
