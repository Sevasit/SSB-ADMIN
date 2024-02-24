"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useParams } from "next/navigation";
import useGetTaskPendingById from "../../../../hooks/task/useGetTaskById";
import LoadingTaskById from "@/app/components/LoadingTaskById";

dayjs.extend(buddhistEra);
dayjs.locale("th");

type Props = {};

const page = (props: Props) => {
  const { taskId } = useParams();
  const { data, isLoading, isError } = useGetTaskPendingById(taskId as string);
  function formatPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber === undefined) return "";
    const formattedPhoneNumber = `${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  }

  return (
    <>
      <div className="flex flex-col items-center mx-[5%] border shadow-md mt-5">
        <div className="flex flex-col items-center gap-4 p-5 rounded-lg">
          <h2 className=" font-semibold text-xl">รายละเอียดปัญหา</h2>
          {isLoading ? (
            <LoadingTaskById />
          ) : (
            <div className=" flex justify-center gap-16 items-center w-auto">
              {data?.imageStart && (
                <Image
                  className=" border border-gray-300 shadow-xl rounded-md"
                  src={data?.imageStart as string}
                  alt="imageStart"
                  width={300}
                  height={300}
                  priority
                />
              )}
              <div className=" flex flex-col justify-center items-start gap-3 w-auto">
                <div>
                  <span className=" font-semibold">ชื่อผู้เเจ้ง : </span>
                  <span className="text-md text-gray-500">{data?.name}</span>
                </div>
                <div>
                  <span className=" font-semibold">เบอร์โทรติดต่อ : </span>
                  <span className="text-md text-gray-500">
                    {formatPhoneNumber(data?.phone)}
                  </span>
                </div>
                <div>
                  <span className=" font-semibold">ประเภทปัญหา : </span>
                  <span className="text-md text-gray-500">
                    {data?.type.typeName}
                  </span>
                </div>
                <div className="flex flex-col gap-3 w-[300px]">
                  <span className=" font-semibold">รายละเอียดปัญหา : </span>
                  <span className=" break-all text-md text-gray-500">
                    {data?.remark}
                  </span>
                </div>
                <div>
                  <span className=" font-semibold">สถานะ : </span>
                  <span
                    className={`${
                      data?.status === "pending"
                        ? " text-xs bg-gray-300 px-1 rounded-md"
                        : data?.status === "approve"
                        ? "text-xs px-1 bg-[#dc8000] rounded-md"
                        : data?.status === "reject"
                        ? "text-xs px-1 bg-[#b91515] rounded-md"
                        : "text-xs px-1 bg-[#00DC82] rounded-md"
                    }`}
                  >
                    {data?.status === "pending"
                      ? "รอการยืนยัน"
                      : data?.status === "approve"
                      ? "รอดำเนินการให้สำเร็จ"
                      : data?.status === "reject"
                      ? "ปัญหาถูกปฏิเสธ"
                      : "เเก้ปัญหาสำเร็จ"}
                  </span>
                </div>
                <div>
                  <span className=" font-semibold">วันที่เเจ้ง : </span>
                  <span className="text-md text-gray-500">
                    {dayjs(data?.createdAt).format("DD MMMM BBBB")}
                  </span>
                </div>
                <div>
                  <span className=" font-semibold">อาคาร : </span>
                  <span className="text-md text-gray-500">
                    {data?.building.nameBuilding}
                  </span>
                </div>
                <div className="flex flex-col gap-3 w-[300px]">
                  <span className=" font-semibold">รายละเอียดสถานที่ : </span>
                  <span className=" break-all text-md text-gray-500">
                    {data?.location}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-10 items-start md:justify-center justify-center md:items-center mt-5">
            <Link href="/historyTask">
              <div className=" bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center">
                <span>ย้อนกลับ</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
