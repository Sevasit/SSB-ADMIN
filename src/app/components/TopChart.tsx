"use client ";

import React from "react";
import useGetTaskCount from "../../../hooks/task/useGetTaskCount";

const TopCard = () => {
  const { data: dataTaskCount = [], isLoading, isError } = useGetTaskCount();
  return (
    <div className=" font-prompt grid lg:grid-cols-5 gap-4 p-4">
      {dataTaskCount &&
        dataTaskCount.map((item, id) => (
          <div
            key={id}
            className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl"
          >
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-center items-center text-2xl gap-2">
                <p className="font-bold text-[#398ffe]">{item.count}</p>
              </div>
              <p className=" ">ประเภทปัญหา : {item._id}</p>
            </div>
          </div>
        ))}
      {/* <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <p className="font-bold text-[#00DC82]">0</p>
          </div>
          <p className=" ">ปัญหาถนน</p>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <p className="font-bold text-[#00DC82]">5</p>
          </div>
          <p className=" ">ปัญหาฮาร์ดเเวร์</p>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <p className="font-bold text-[#ff4b4c]">20</p>
          </div>
          <p className=" ">ปัญหาห้องเรียน</p>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center text-2xl gap-2">
            <p className="font-bold text-[#ff4b4c]">15</p>
          </div>
          <p className=" ">ปัญหาห้องน้ำ</p>
        </div>
      </div> */}
    </div>
  );
};

export default TopCard;
