"use client";
import Container from "@mui/material/Container";
import Image from "next/image";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import useGetTaskPendingById from "../../../../hooks/task/useGetTaskById";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import Link from "next/link";
import useApprove from "../../../../hooks/task/useApprove";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

dayjs.extend(buddhistEra);
dayjs.locale("th");

type Props = {};

const ApproveDetail = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const { taskId } = useParams();
  const { data, isLoading, isError } = useGetTaskPendingById(taskId as string);
  console.log(data);

  const router = useRouter();

  const {
    mutateAsync: mutateAsyncApprove,
    isLoading: approveIsLoading,
    isError: approveIsError,
  } = useApprove();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function formatPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber === undefined) return "";
    const formattedPhoneNumber = `${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  }

  const handleSubmit = async () => {
    const res = mutateAsyncApprove(taskId as string);
    res
      .then((data) => {
        console.log(data);
        if (data.message === "Approve task successfully") {
          toast.success("อนุมัติปัญหาสำเร็จ");
          router.push("/approve");
        } else {
          toast.error("อนุมัติปัญหาไม่สำเร็จ", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#dc8000",
            },
            iconTheme: {
              primary: "#dc8000",
              secondary: "#FFFAEE",
            },
          });
        }
      })
      .catch((error) => {
        toast.error("อนุมัติปัญหาไม่สำเร็จ");
      });
  };
  return (
    <>
      <div className="flex flex-col items-center mx-[5%]">
        <div className="mt-5 flex flex-col items-center gap-4 p-5 rounded-lg border-4 border-[#00DC82] w-full">
          <h2 className=" font-semibold text-xl">รายละเอียดปัญหา</h2>
          <div className=" flex justify-center gap-10 items-center w-auto">
            {data?.imageStart && (
              <Image
                className=" border border-gray-300 shadow-xl rounded-md"
                src={data?.imageStart as string}
                alt="imageStart"
                width={280}
                height={280}
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
                <span className="text-md text-gray-500">{data?.type}</span>
              </div>
              <div className="flex flex-col gap-3 w-[300px]">
                <span className=" font-semibold">รายละเอียดปัญหา : </span>
                <span className=" break-all text-md text-gray-500">
                  {data?.remark}
                </span>
              </div>
              <div>
                <span className=" font-semibold">สถานะ : </span>
                <span className="text-md text-gray-500">{data?.status}</span>
              </div>
              <div>
                <span className=" font-semibold">วันที่เเจ้ง : </span>
                <span className="text-md text-gray-500">
                  {dayjs(data?.createdAt).format("DD MMMM BBBB")}
                </span>
              </div>
              <div>
                <span className=" font-semibold">อาคาร : </span>
                <span className="text-md text-gray-500">{data?.building}</span>
              </div>
              <div className="flex flex-col gap-3 w-[300px]">
                <span className=" font-semibold">รายละเอียดสถานที่ : </span>
                <span className=" break-all text-md text-gray-500">
                  {data?.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
            <Link href="/approve">
              <div className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                <span>ยกเลิก</span>
              </div>
            </Link>
            <div
              className=" w-auto bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
              onClick={handleClickOpen}
            >
              <span>อนุมัติปัญหา</span>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <div className="p-6">
            <div className=" m-3 text-xl">
              {"คุณต้องการที่จะอนุมัติปัญหาหรือไม่?"}
            </div>
            <DialogActions>
              <div
                onClick={handleClose}
                className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
              >
                <span>ยกเลิก</span>
              </div>
              <div
                onClick={handleSubmit}
                className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
              >
                <span>ยืนยัน</span>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default ApproveDetail;
