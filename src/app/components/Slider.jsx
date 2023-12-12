import React from "react";
import Link from "next/link";

import {
  RxSketchLogo,
  RxDashboard,
  RxPerson,
  RxLockClosed,
} from "react-icons/rx";
import { FiSettings } from "react-icons/fi";

const Slider = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-[#f0f4f2] border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center gap-2">
          <Link href="/dashboard">
            <div className="text-white bg-[#00DC82] p-2 rounded-lg inline-block">
              <RxSketchLogo size={25} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/dashboard">
            <div className="bg-gray-200 duration-200 ease-linear hover:bg-gray-300 p-2 rounded-lg inline-block">
              <RxDashboard size={25} />
            </div>
          </Link>
          <Link href="/customers">
            <div className="bg-gray-200 duration-200 ease-linear hover:bg-gray-300 p-2 rounded-lg inline-block">
              <RxPerson size={25} />
            </div>
          </Link>
          <Link href="/orders">
            <div className="bg-gray-200 duration-200 ease-linear hover:bg-gray-300 p-2 rounded-lg inline-block">
              <RxLockClosed size={25} />
            </div>
          </Link>
          <Link href="/">
            <div className="bg-gray-200 duration-200 ease-linear hover:bg-gray-300 p-2 rounded-lg inline-block">
              <FiSettings size={25} />
            </div>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Slider;
