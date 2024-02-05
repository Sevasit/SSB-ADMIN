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
import axios from "axios";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { ITaskConfirm } from "../../../../types/ITask";
import useSendTask from "../../../../hooks/task/useSendTask";

dayjs.extend(buddhistEra);
dayjs.locale("th");

type Props = {};

const CompletedDetail = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const firstName = session?.userData.firstName;
  const lastName = session?.userData.lastName;
  const { taskId } = useParams();
  const [dataImage, setDataImage] = React.useState("");
  const [nameImage, setNameImage] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { data, isLoading, isError } = useGetTaskPendingById(taskId as string);

  const {
    mutateAsync: mutateAsyncSendTask,
    isLoading: sendTaskIsLoading,
    isError: sendTaskIsError,
  } = useSendTask();

  const handleClose = () => {
    setDataImage("");
    setNameImage("");
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

  const handleFileInputChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setDataImage(selectedFile);
    setNameImage(selectedFile.name);
    console.log("Selected file:", selectedFile);
  };

  const handleUpload = async () => {
    if (!dataImage) {
      toast.error("กรุณาเลือกรูปก่อนยืนยันการเเจ้งปัญหา", {
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
    const formData = new FormData();
    formData.append("file", dataImage);
    formData.append("upload_preset", "reportImg");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_URL!!,
        formData
      );
      const url = response.data.secure_url;
      console.log(url);
      if (!url) {
        return;
      }
      const payload: ITaskConfirm = {
        id: taskId as string,
        processBy: firstName + " " + lastName,
        imageEnd: url,
      };
      console.log(payload);
      const res = mutateAsyncSendTask(payload);
      res
        .then((res) => {
          if (res.message === "Updated task successfully") {
            toast.success("ยืนยันการเเจ้งปัญหาสำเร็จ");
            router.push("/completed");
          } else {
            toast.error("ยืนยันการเเจ้งปัญหาไม่สำเร็จ", {
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
        .catch((err) => {
          toast.error("ยืนยันการเเจ้งปัญหาไม่สำเร็จ", {
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
        });
    } catch (error) {
      toast.error("ยืนยันการเเจ้งปัญหาไม่สำเร็จ", {
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
            <Link href="/completed">
              <div className=" w-20 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center">
                <span>ยกเลิก</span>
              </div>
            </Link>
            <div
              className=" w-auto bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
              onClick={handleClickOpen}
            >
              <span>ยืนยันการเเจ้งปัญหา</span>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <div className="p-6">
            <div className=" m-3 text-xl mb-3">
              {"กรุณาเลือกรูปก่อนยืนยันการเเจ้งปัญหา"}
            </div>
            <div className=" flex flex-col gap-2 justify-center items-center">
              <div>
                <label
                  htmlFor="fileInput"
                  className="w-auto border-2 bg-[#d7f2e7] border-black text-black duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between p-2 items-center"
                >
                  อัพโหลดรูปภาพ
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </div>
              {nameImage && <div>{nameImage}</div>}
            </div>
            <DialogActions className="flex justify-center items-center mt-3">
              <div
                onClick={handleClose}
                className=" w-24 hover:bg-white border-2 hover:border-[#b91515] hover:text-[#b91515] bg-[#b91515] border-black text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
              >
                <span>ยกเลิก</span>
              </div>
              <div
                onClick={handleUpload}
                className=" w-24 hover:bg-white border-2 hover:border-[#0f8d67] hover:text-[#0f8d67] bg-[#00DC82] border-black text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
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

export default CompletedDetail;
