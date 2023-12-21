import React from "react";
import { data } from "../data/data.js";
import { FiShoppingBag } from "react-icons/fi";

interface Props {}

const RecentTask = (props: Props) => {
  return (
    <div className="w-full mt-[-1px] col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-[#f0f4f2] overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className="bg-gray-50 shadow-md hover:bg-white rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className=" rounded-lg p-2 text-[#00DC82]">
              <FiShoppingBag />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">${order.total}</p>
              <p className="text-gray-400 text-sm">{order.name.last}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-5 text-xs">
              {order.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTask;
