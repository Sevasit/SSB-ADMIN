import React from "react";
import Link from "next/link";
import { LuFileBox } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { LuFileClock } from "react-icons/lu";

const Slider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="fixed w-32 pt-24 h-screen p-4 bg-[#f0f4f2] border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center gap-2">
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
            href="/historyTask"
            className="w-20 text-white border bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-between items-center gap-2"
          >
            <LuFileClock size={28} />
            <span className=" text-[10px] uppercase font-semibold">
              History
            </span>
          </Link>
          <Link
            href="/task"
            className="w-20 text-white border bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-between items-center gap-2"
          >
            <LuFileBox size={28} />
            <span className=" text-[10px] uppercase font-semibold">Reject</span>
          </Link>
          <Link
            href="/type"
            className="w-20 text-white border bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-between items-center gap-2"
          >
            <BsBoxes size={28} />
            <span className=" text-[10px] uppercase font-semibold">Types</span>
          </Link>
          <Link
            href="/employee"
            className="w-20 text-white border bg-[#00DC82] duration-200 ease-linear hover:bg-[#00DC82] hover:border hover:border-black hover:text-slate-800 p-2 rounded-lg flex flex-col justify-between items-center gap-2"
          >
            <RxPerson size={28} />
            <span className=" text-[10px] uppercase font-semibold">Users</span>
          </Link>
        </div>
      </div>
      <main className=" pt-20 ml-28 w-full">{children}</main>
    </div>
  );
};

export default Slider;
