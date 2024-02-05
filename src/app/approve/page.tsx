"use client";
import React from "react";
import { FiUser } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useSession } from "next-auth/react";
import useGetTaskPending from "../../../hooks/task/useGetTaskPending";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

dayjs.extend(buddhistEra);
dayjs.locale("th");

type Props = {};

function ApprovePage({}: Props) {
  const { data: session, status } = useSession();
  const {
    data: dataTaskPending = [],
    isLoading,
    isError,
  } = useGetTaskPending(session?.userData.role!!);
  return (
    <>
      <div className="bg-white min-h-screen p-4">
        <div className="p-4">
          <div className=" mb-3 text-xl font-semibold border-b-2 p-2">
            หน้าอนุมัติการเเจ้งปัญหา
          </div>
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="py-2"></div>
            <div className="my-3 p-2 grid grid-cols-2 md:grid-cols-6 items-center justify-between">
              <span>ชื่อผู้เเจ้ง</span>
              <span className="sm:text-left text-right">อาคาร</span>
              <span className="hidden md:grid">วันที่เเจ้ง</span>
              <span className="hidden sm:grid">ประเภท</span>
            </div>
            <ul>
              {!isLoading &&
                !isError &&
                dataTaskPending &&
                dataTaskPending.map((item, id) => (
                  <li
                    key={item._id}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="bg-[#00DC82] rounded-lg p-2 text-white">
                        <FiUser />
                      </div>
                      <p className="pl-4 text-sm">{item.name}</p>
                    </div>
                    <p className="sm:text-left text-right text-sm">
                      {item.building}
                    </p>
                    <p className="hidden md:flex text-sm">
                      {dayjs(item.createdAt).format("DD MMMM BBBB")}
                    </p>
                    <div className="sm:flex text-sm hidden justify-between items-center">
                      <p>{item.type}</p>
                    </div>
                    <div>
                      <Link
                        href={`/approve/${item._id}`}
                        className=" w-36 bg-white border-2 border-[#dc8000] text-[#dc8000] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
                      >
                        <span>ดูรายละเอียด</span>
                        <BiEdit className=" text-lg" />
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default ApprovePage;
