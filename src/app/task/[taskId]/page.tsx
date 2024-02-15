"use client";
import { Dialog, DialogActions, FormControl, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useParams, useRouter } from "next/navigation";
import useGetTaskPendingById from "../../../../hooks/task/useGetTaskById";
import useReject from "../../../../hooks/task/useReject";
import { ITaskReject } from "../../../../types/ITask";
import LoadingTaskById from "@/app/components/LoadingTaskById";
import { useSession } from "next-auth/react";
import Loader from "@/app/components/Loader";

dayjs.extend(buddhistEra);
dayjs.locale("th");

type Props = {};

const page = (props: Props) => {
  const { data: session, status } = useSession();
  const idAdmin = session?.userData._id;
  const [open, setOpen] = React.useState(false);
  const [annotation, setAnnotation] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const { taskId } = useParams();
  const router = useRouter();
  const { data, isLoading, isError } = useGetTaskPendingById(taskId as string);
  function formatPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber === undefined) return "";
    const formattedPhoneNumber = `${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  }
  const {
    mutateAsync: mutateAsyncReject,
    isLoading: rejectIsLoading,
    isError: rejectIsError,
  } = useReject();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    setLoader(true);
    const payload: ITaskReject = {
      id: taskId as string,
      processBy: idAdmin!!,
      annotation: annotation,
    };
    if (annotation.trim().length === 0) {
      setLoader(false);
      toast.error("กรุณากรอกหมายเหตุก่อนยืนยัน", {
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
      return;
    }
    const res = mutateAsyncReject(payload);
    res
      .then((data) => {
        if (data.message === "Reject task successfully") {
          setLoader(false);
          toast.success("ปฏิเสธปัญหาสำเร็จ");
          router.push("/task");
        } else {
          setLoader(false);
          toast.error("ปฏิเสธปัญหาไม่สำเร็จ", {
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
        setLoader(false);
        toast.error("ปฏิเสธปัญหาไม่สำเร็จ");
      });
  };
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

          <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
            <Link href="/task">
              <div className=" w-20 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                <span>ยกเลิก</span>
              </div>
            </Link>
            <div
              className=" w-auto bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
              onClick={handleClickOpen}
            >
              <span>ปฏิเสธปัญหา</span>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <div className="p-6">
            <div className=" m-3 text-xl">
              {"คุณต้องการที่จะปฏิเสธปัญหานี้หรือไม่?"}
            </div>
            <FormControl
              //   className="flex justify-center items-center"
              size="medium"
              sx={{ minWidth: 400, minHeight: 80 }}
            >
              <TextField
                id="annotation"
                variant="outlined"
                size="medium"
                label="หมายเหตุ"
                color="success"
                multiline
                rows={3}
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
              />
            </FormControl>
            <DialogActions className="flex justify-around items-center mt-3">
              {loader && <Loader />}
              {!loader && (
                <div
                  onClick={handleClose}
                  className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
                >
                  <span>ยกเลิก</span>
                </div>
              )}
              {!loader && (
                <div
                  onClick={handleSubmit}
                  className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
                >
                  <span>ยืนยัน</span>
                </div>
              )}
            </DialogActions>
          </div>
        </Dialog>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default page;
