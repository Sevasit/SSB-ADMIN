"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import noContent from "../../../public/No-data-amico.png";
import Image from "next/image";

type Props = {};

function Tasks({}: Props) {
  return (
    <>
      <div className="bg-white min-h-screen p-4">
        <div className="p-4">
          <div className=" mb-3 text-xl font-semibold border-b-2 p-2">
            หน้าจัดการปัญหา
          </div>
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="my-3 p-2 grid grid-cols-2 md:grid-cols-6 items-center justify-between">
              <span>ชื่อผู้เเจ้ง</span>
              <span className="sm:text-left text-right">อาคาร</span>
              <span className="hidden md:grid">วันที่เเจ้ง</span>
              <span className="hidden sm:grid">ประเภท</span>
            </div>
            <div className="flex rounded-md justify-center items-center h-[350px]">
              <div>
                <Image
                  priority
                  src={noContent}
                  alt="No data"
                  width={300}
                  height={300}
                />
                <p className="text-center text-xl font-semibold">ไม่มีข้อมูล</p>
              </div>
            </div>
            {/* <ul>
              {!isLoading &&
                !isError &&
                dataUsers &&
                dataUsers.map((item, id) => (
                  <li
                    key={item._id}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="bg-[#00DC82] rounded-lg p-2 text-white">
                        <FiUser />
                      </div>
                      <p className="pl-4 text-sm">
                        {item.firstName + " " + item.lastName}
                      </p>
                    </div>
                    <p className="sm:text-left text-right text-sm">
                      {item.email}
                    </p>
                    <p className="hidden md:flex text-sm">
                      {dayjs(item.updatedAt).format("DD MMMM BBBB")}
                    </p>
                    <div className="sm:flex text-sm hidden justify-between items-center">
                      <p>{item.role}</p>
                    </div>
                    <div>
                      <div
                        onClick={() => router.push(`/employee/${item._id}`)}
                        className=" w-24 bg-white border-2 border-[#dc8000] text-[#dc8000] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
                      >
                        <span>เเก้ไข</span>
                        <BiEdit className=" text-lg" />
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => handleClickOpen(item._id)}
                        className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
                      >
                        <span>ลบ</span>
                        <RiDeleteBin6Line className=" text-lg" />
                      </div>
                    </div>
                  </li>
                ))}
            </ul> */}
          </div>
        </div>
      </div>
      {/* <Dialog open={open} onClose={handleClose}>
        <div className="p-6">
          <div className=" m-3 text-xl">
            {"คุณต้องการที่จะลบข้อมูลผู้ใช้หรือไม่?"}
          </div>
          <DialogActions>
            <div
              onClick={handleClose}
              className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
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
      <Toaster position="bottom-right" /> */}
    </>
  );
}

export default Tasks;
