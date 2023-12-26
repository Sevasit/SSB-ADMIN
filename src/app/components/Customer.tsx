"use client";
import React from "react";
import { FiUser } from "react-icons/fi";
import { data } from "../data/data.js";
import { MdOutlineAddBox } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { Dialog, DialogActions } from "@mui/material";
import { useRouter } from "next/navigation";
import useGetfindUsers from "../../../hooks/users/useGetfindUsers";
import dayjs from "dayjs";
import useCreateUsers from "../../../hooks/users/useCreateUsers";
import toast, { Toaster } from "react-hot-toast";

interface Props {}

const Empolyee = (props: Props) => {
  const { data: dataLeave = [], isLoading, isError } = useGetfindUsers();
  const {
    mutateAsync: mutateAsynccreate,
    isLoading: createisLoading,
    isError: isErrorisLoading,
  } = useCreateUsers();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const handleClickOpen = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await mutateAsynccreate(id);
      toast.success("ลบข้อมูลผู้ใช้งานเรียบร้อย");
      setOpen(false);
    } catch (error) {
      toast.error("ลบข้อมูลผู้ใช้งานไม่สำเร็จ");
    }
  };
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="flex justify-end">
              <div
                onClick={() => router.push("/employee/creating")}
                className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md py-1 rounded-lg flex gap-1 justify-between px-4 items-center cursor-pointer"
              >
                <span>เพิ่ม</span>
                <MdOutlineAddBox className=" text-xl" />
              </div>
            </div>
            <div className="my-3 p-2 grid grid-cols-2 md:grid-cols-6 items-center justify-between">
              <span>ชื่อ</span>
              <span className="sm:text-left text-right">อีเมล</span>
              <span className="hidden md:grid">วันที่สร้าง</span>
              <span className="hidden sm:grid">ประเภท</span>
            </div>
            <ul>
              {dataLeave.map((item, id) => (
                <li
                  key={item._id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="bg-[#00DC82] rounded-lg p-2 text-white">
                      <FiUser />
                    </div>
                    <p className="pl-4">
                      {item.firstName + " " + item.lastName}
                    </p>
                  </div>
                  <p className="sm:text-left text-right text-gray-600">
                    {item.email}
                  </p>
                  <p className="hidden md:flex">
                    {dayjs(item.updatedAt).format("YYYY/MM/DD")}
                  </p>
                  <div className="sm:flex hidden justify-between items-center">
                    <p>{item.role}</p>
                  </div>
                  <div>
                    <div className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center">
                      <span>เเก้ไข</span>
                      <BiEdit className=" text-lg" />
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => handleClickOpen(item._id)}
                      className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
                    >
                      <span>ลบ</span>
                      <RiDeleteBin6Line className=" text-lg" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <div className="p-6">
          <div className=" m-3 text-xl">
            {"คุณต้องการที่จะลบข้อมูล employee หรือไม่?"}
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
      <Toaster position="bottom-right" />
    </>
  );
};

export default Empolyee;
