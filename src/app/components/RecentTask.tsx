"use client";
import React, { useEffect } from "react";
import { RiBox3Line } from "react-icons/ri";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useSession } from "next-auth/react";
import useGetTaskCurrent from "../../../hooks/task/useGetTaskCurrent";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);
dayjs.locale("th");

interface Props {}

const RecentTask = (props: Props) => {
  const { data: session, status } = useSession();
  const role = session?.userData.role.typeName!!;

  const userId = session?.userData?.role?._id!!;

  const {
    data: dataTaskCurrent = [],
    isLoading,
    isError,
  } = useGetTaskCurrent(userId);

  function formatPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber === undefined) return "";
    const formattedPhoneNumber = `${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  }
  return (
    <div className="w-full mt-[-1px] col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-[#f0f4f2] overflow-scroll">
      <div className=" flex justify-between items-center">
        <h1 className=" text-lg font-semibold">ปัญหาที่เข้ามาในวันนี้</h1>
        {role === "admin" ? (
          ""
        ) : (
          <h1 className=" text-lg font-semibold">ประเภท : {role}</h1>
        )}
      </div>
      {!isLoading ? (
        <ul>
          {dataTaskCurrent.map((item, id) => (
            <li
              key={id}
              className="bg-gray-50 shadow-md hover:bg-white rounded-lg my-3 p-2 flex items-center"
            >
              <div className=" rounded-lg p-2 text-[#00DC82]">
                <RiBox3Line />
              </div>
              <div className="pl-4">
                <p className="text-gray-800">{"ชื่อผู้เเจ้ง : " + item.name}</p>
                <p className="text-gray-400 text-sm">
                  {"เบอร์ติดต่อ : " + formatPhoneNumber(item.phone)}
                </p>
              </div>
              <p className="lg:flex md:hidden absolute right-5 text-xs">
                {dayjs().to(dayjs.unix(dayjs(item.createdAt).unix()))}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className=" h-[60vh] flex justify-center items-center">
          ไม่มีรายงานปัญหาในวันนี้
        </div>
      )}
    </div>
  );
};

export default RecentTask;
