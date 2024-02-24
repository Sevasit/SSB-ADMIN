"use client";
import Link from "next/link";
import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import NoRowsOverlay from "../components/NoRows";
import { FiUser } from "react-icons/fi";
import useGetTaskByAdmin from "../../../hooks/task/useGetTaskByAdmin";
import { useSession } from "next-auth/react";
import { BiEdit } from "react-icons/bi";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { Toaster } from "react-hot-toast";
import TableLoading from "../components/TableLoading";
import useGetTaskHistory from "../../../hooks/task/useGetTaskHistory";
import PrintCsvOnly from "../components/PrintCsvOnly";

dayjs.extend(buddhistEra);
dayjs.locale("th");

type Props = {};

function HistoryTask({}: Props) {
  const {
    data: dataTaskHistory = [],
    isLoading,
    isError,
  } = useGetTaskHistory();

  function formatPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber === undefined) return "";
    const formattedPhoneNumber = `${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerAlign: "center",
      align: "left",
      headerName: "ชื่อผู้เเจ้ง",
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
      field: "phone",
      headerAlign: "center",
      align: "center",
      headerName: "เบอร์โทร",
      headerClassName: "text-[#0f8d67]",
      width: 150,
    },
    {
      field: "building",
      headerAlign: "center",
      align: "center",
      headerName: "อาคาร",
      headerClassName: "text-[#0f8d67]",
      width: 150,
    },
    {
      field: "type",
      headerAlign: "center",
      align: "center",
      headerName: "ประเภทปัญหา",
      headerClassName: "text-[#0f8d67]",
      width: 150,
    },
    {
      field: "status",
      headerAlign: "center",
      align: "center",
      headerName: "สถานะ",
      headerClassName: "text-[#0f8d67]",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <span
              className={` ${
                params.row.status === "pending"
                  ? " text-xs bg-gray-300 p-2 rounded-md"
                  : params.row.status === "approve"
                  ? "text-xs p-2 bg-[#dc8000] rounded-md"
                  : params.row.status === "reject"
                  ? "text-xs p-2 bg-[#b91515] rounded-md"
                  : "text-xs p-2 bg-[#00DC82] rounded-md"
              }`}
            >
              {params.row.status === "pending"
                ? "รอการยืนยัน"
                : params.row.status === "approve"
                ? "รอดำเนินการให้สำเร็จ"
                : params.row.status === "reject"
                ? "ปัญหาถูกปฏิเสธ"
                : "เเก้ปัญหาสำเร็จ"}
            </span>
          </>
        );
      },
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
      field: "ดูรายละเอียด",
      width: 250,
      headerAlign: "center",
      headerClassName: "text-[#0f8d67] hidden",
      align: "center",
      renderCell: (params) => {
        return (
          <Link
            href={`/historyTask/${params.row.id}`}
            className=" w-36 bg-white border-2 border-[#dc8000] text-[#dc8000] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
          >
            <span>ดูรายละเอียด</span>
            <BiEdit className=" text-lg" />
          </Link>
        );
      },
      sortable: false,
    },
  ];

  const ExportCsv = () => {
    return (
      <>
        <PrintCsvOnly
          fileName={`tasks_${dayjs().format("DD-MM-YYYY")}`}
          fields={[
            "userId",
            "name",
            "phone",
            "type",
            "building",
            "status",
            "createdAt",
            "updatedAt",
          ]}
        />
      </>
    );
  };

  const rows: GridRowsProp = [
    ...dataTaskHistory.map((item, index) => {
      return {
        id: item._id,
        userId: item.userId,
        name: item.name,
        phone: formatPhoneNumber(item.phone),
        type: item.type.typeName,
        building: item.building.nameBuilding,
        status: item.status,
        createdAt: dayjs(item.createdAt).format("DD MMMM BBBB"),
        updatedAt: dayjs(item.updatedAt).format("DD MMMM BBBB"),
      };
    }),
  ];
  return (
    <>
      <div className="bg-white min-h-screen p-4">
        <div className="p-4">
          <div className=" mb-3 text-xl font-semibold border-b-2 p-2">
            ประวัติการแจ้งปัญหา
          </div>
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
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
                  slots={{
                    toolbar: ExportCsv,
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
      <Toaster position="bottom-right" />
    </>
  );
}

export default HistoryTask;
