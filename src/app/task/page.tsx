"use client";
import Link from "next/link";
import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import NoRowsOverlay from "../components/NoRows";
import { FiUser } from "react-icons/fi";

type Props = {};

function Tasks({}: Props) {
  const columns: GridColDef[] = [
    {
      field: "typeName",
      headerAlign: "center",
      align: "left",
      headerName: "ชื่อผู้เเจ้ง",
      headerClassName: "text-[#0f8d67]",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center ml-2">
            <div className="bg-[#00DC82] rounded-lg p-2 text-white">
              <FiUser />
            </div>
            <p className="pl-4 text-sm">{params.row.typeName}</p>
          </div>
        );
      },
    },
    {
      field: "typeCode",
      headerAlign: "center",
      align: "center",
      headerName: "อาคาร",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    {
      field: "createdAt",
      headerAlign: "center",
      align: "center",
      headerName: "วันที่เเจ้ง",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    {
      field: "updatedAt",
      headerAlign: "center",
      align: "center",
      headerName: "ประเภท",
      headerClassName: "text-[#0f8d67]",
      width: 200,
    },
    // {
    //   field: "เเก้ไข",
    //   width: 250,
    //   headerAlign: "center",
    //   headerClassName: "text-[#0f8d67]",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         onClick={() => handleClickOpenEdit(params.row._id)}
    //         className=" w-24 bg-white border-2 border-[#dc8000] text-[#dc8000] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
    //       >
    //         <span>เเก้ไข</span>
    //         <BiEdit className=" text-lg" />
    //       </div>
    //     );
    //   },
    //   sortable: false,
    // },
    // {
    //   field: "ลบ",
    //   width: 150,
    //   headerAlign: "center",
    //   headerClassName: "text-[#0f8d67]",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         onClick={() => handleClickOpen(params.row._id)}
    //         className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
    //       >
    //         <span>ลบ</span>
    //         <RiDeleteBin6Line className=" text-lg" />
    //       </div>
    //     );
    //   },
    //   sortable: false,
    // },
  ];

  const rows: GridRowsProp = [
    // ...dataTypes.map((item, index) => {
    //   return {
    //     _id: item._id,
    //     typeName: item.typeName,
    //     typeCode: item.typeCode,
    //     createdAt: dayjs(item.createdAt).format("DD MMMM BBBB"),
    //     updatedAt: dayjs(item.updatedAt).format("DD MMMM BBBB"),
    //   };
    // }),
  ];
  return (
    <>
      <div className="bg-white min-h-screen p-4">
        <div className="p-4">
          <div className=" mb-3 text-xl font-semibold border-b-2 p-2">
            หน้าจัดการปัญหา
          </div>
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className=" h-[400px] pt-3">
              <DataGrid
                components={{ NoRowsOverlay }}
                rows={rows}
                getRowId={(row: any) => row._id}
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
