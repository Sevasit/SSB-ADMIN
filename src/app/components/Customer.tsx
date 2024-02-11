"use client";
import React from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { Dialog, DialogActions } from "@mui/material";
import { useRouter } from "next/navigation";
import useGetfindUsers from "../../../hooks/users/useGetfindUsers";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import useDeleteUsers from "../../../hooks/users/useDeleteUsers";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import Link from "next/link";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import NoRowsOverlay from "./NoRows";
import TableLoading from "./TableLoading";

dayjs.extend(buddhistEra);
dayjs.locale("th");
interface Props {}

const Empolyee = (props: Props) => {
  const { data: dataUsers = [], isLoading, isError } = useGetfindUsers();
  const {
    mutateAsync: mutateAsynccreate,
    isLoading: createisLoading,
    isError: isErrorisLoading,
  } = useDeleteUsers();

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
      toast.success("ลบข้อมูลผู้ใช้งานสำเร็จ");
      setOpen(false);
    } catch (error) {
      toast.error("ลบข้อมูลผู้ใช้งานไม่สำเร็จ");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerAlign: "center",
      align: "left",
      headerName: "ชื่อ",
      headerClassName: "text-[#0f8d67]",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center ml-2">
            <div className="bg-[#00DC82] rounded-lg p-2 text-white">
              <FiUser />
            </div>
            <p className="pl-4 text-sm">{params.row.name}</p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerAlign: "center",
      align: "center",
      headerName: "อีเมล",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    {
      field: "role",
      headerAlign: "center",
      align: "center",
      headerName: "ประเภท",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    {
      field: "createdAt",
      headerAlign: "center",
      align: "center",
      headerName: "วันที่สร้าง",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    {
      field: "updatedAt",
      headerAlign: "center",
      align: "center",
      headerName: "วันที่เเก้ไข",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    {
      field: "เเก้ไข",
      width: 150,
      headerAlign: "center",
      headerClassName: "text-[#0f8d67]",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            onClick={() => router.push(`/employee/${params.row._id}`)}
            className=" w-24 bg-white border-2 border-[#dc8000] text-[#dc8000] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
          >
            <span>เเก้ไข</span>
            <BiEdit className=" text-lg" />
          </div>
        );
      },
      sortable: false,
    },
    {
      field: "ลบ",
      width: 150,
      headerAlign: "center",
      headerClassName: "text-[#0f8d67]",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            onClick={() => handleClickOpen(params.row._id)}
            className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
          >
            <span>ลบ</span>
            <RiDeleteBin6Line className=" text-lg" />
          </div>
        );
      },
      sortable: false,
    },
  ];

  const rows: GridRowsProp = [
    ...dataUsers.map((item, index) => {
      return {
        id: item._id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        role: item.role.typeName,
        createdAt: dayjs(item.createdAt).format("DD MMMM BBBB"),
        updatedAt: dayjs(item.updatedAt).format("DD MMMM BBBB"),
      };
    }),
  ];
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="p-4">
          <div className=" mb-3 text-xl font-semibold border-b-2 p-2">
            หน้าจัดการพนักงาน
          </div>
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="flex justify-end">
              <Link href="/employee/creating">
                <div className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md py-1 rounded-lg flex gap-1 justify-between px-4 items-center cursor-pointer">
                  <span>เพิ่ม</span>
                  <MdOutlineAddBox className=" text-xl" />
                </div>
              </Link>
            </div>
            {isLoading ? (
              <TableLoading />
            ) : (
              <div className=" h-[400px] pt-3">
                <DataGrid
                  components={{ NoRowsOverlay }}
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  disableColumnFilter
                  disableColumnMenu
                  disableVirtualization
                  disableRowSelectionOnClick
                  disableColumnSelector
                  disableDensitySelector
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <div className="p-6">
          <div className=" m-3 text-xl">
            {"คุณต้องการที่จะลบข้อมูลผู้ใช้หรือไม่?"}
          </div>
          <DialogActions>
            <div
              onClick={handleClose}
              className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
            >
              <span>ยกเลิก</span>
            </div>
            <div
              onClick={handleSubmit}
              className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
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
