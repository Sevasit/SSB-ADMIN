import React from "react";
import { FiMoreHorizontal, FiUser } from "react-icons/fi";
import { data } from "../data/data.js";

interface Props {}

const Customer = (props: Props) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid grid-cols-2 md:grid-cols-4 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-pink-100 rounded-lg p-2 text-pink-600">
                    <FiUser />
                  </div>
                  <p className="pl-4">
                    {order.name.first + " " + order.name.last}
                  </p>
                </div>
                <p className="sm:text-left text-right text-gray-600">
                  {order.name.first}@gmail.com
                </p>
                <p className="hidden md:flex">{order.date}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{order.method}</p>
                  <FiMoreHorizontal />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Customer;
