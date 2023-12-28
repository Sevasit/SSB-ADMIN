"use client ";

import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";

const TopCard = () => {
  return (
    <div className=" font-prompt grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <IoTrashBinOutline />
            <p className="font-bold text-[#398ffe]">10</p>
          </div>
          <p className=" ">ปัญหาขยะ</p>
        </div>
        {/* <p className="bg-[#00DC82] flex justify-center items-center p-[10px] rounded-lg">
          <span className=" text-black text-lg">+25%</span>
        </p> */}
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <IoTrashBinOutline />
            <p className="font-bold text-[#00DC82]">0</p>
          </div>
          <p className=" ">ปัญหาถนน</p>
        </div>
        {/* <p className="bg-[#00DC82] flex justify-center items-center p-[10px] rounded-lg">
          <span className=" text-black text-lg">+25%</span>
        </p> */}
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <IoTrashBinOutline />
            <p className="font-bold text-[#00DC82]">5</p>
          </div>
          <p className=" ">ปัญหาฮาร์ดเเวร์</p>
        </div>
        {/* <p className="bg-[#00DC82] flex justify-center items-center p-[10px] rounded-lg">
          <span className=" text-black text-lg">+25%</span>
        </p> */}
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <IoTrashBinOutline />
            <p className="font-bold text-[#ff4b4c]">20</p>
          </div>
          <p className=" ">ปัญหาห้องเรียน</p>
        </div>
        {/* <p className="bg-[#00DC82] flex justify-center items-center p-[10px] rounded-lg">
          <span className=" text-black text-lg">+25%</span>
        </p> */}
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <IoTrashBinOutline />
            <p className="font-bold text-[#ff4b4c]">15</p>
          </div>
          <p className=" ">ปัญหาห้องน้ำ</p>
        </div>

        {/* <p className="bg-[#00DC82] flex justify-center items-center p-[10px] rounded-lg">
          <span className=" text-black text-lg">+25%</span>
        </p> */}
      </div>
    </div>
  );
};

export default TopCard;
