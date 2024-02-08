"use client ";
import React from "react";
import useGetTaskCountToGraph from "../../../hooks/task/useGetTaskCountToGraph";

const TopCard = () => {
  const {
    data: dataTaskCountToGraph = [],
    isLoading,
    isError,
  } = useGetTaskCountToGraph();
  return (
    <div className=" font-prompt grid lg:grid-cols-5 gap-4 p-4">
      {dataTaskCountToGraph &&
        dataTaskCountToGraph.map((item, id) => (
          <div
            key={item._id}
            className="lg:col-span-1 col-span-1 bg-[#f0f4f2] flex justify-between w-full border p-4 rounded-lg shadow-xl"
          >
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-center items-center text-2xl gap-2">
                <p className="font-bold text-[#398ffe]">{item.count}</p>
              </div>
              <p className=" ">ประเภทปัญหา : {item.type}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TopCard;
