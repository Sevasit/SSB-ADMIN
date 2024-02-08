"use client";
import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import useGetType from "../../../hooks/type/useGetType";
import { RxCube } from "react-icons/rx";
import useDeleteTypes from "../../../hooks/type/useDeleteType";
import { useForm } from "react-hook-form";
import useCreateType from "../../../hooks/type/useCreateType";
import useEditType from "../../../hooks/type/useEditType";
import useGetTypeById from "../../../hooks/type/useGetTypeById";
import { IType } from "../../../types/IType";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import TableLoading from "./TableLoading";
import NoRowsOverlay from "./NoRows";

dayjs.extend(buddhistEra);
dayjs.locale("th");
type Props = {};

type FormData = {
  typeName: string;
  typeCode: string;
};

const Types = (props: Props) => {
  const {
    mutateAsync: mutateAsyncType,
    isLoading: typeisLoading,
    isError: typeIsError,
  } = useDeleteTypes();

  const {
    data: dataTypes = [],
    isLoading: getISLoading,
    isError: getISError,
  } = useGetType();

  const {
    mutateAsync: mutateAsyncTypeCreate,
    isLoading: createISLoading,
    isError: createISError,
  } = useCreateType();

  const {
    mutateAsync: mutateAsyncTypeEdit,
    isLoading: editISLoading,
    isError: editISError,
  } = useEditType();

  const {
    mutateAsync: mutateAsyncTypeById,
    isLoading: getTypeByIdISLoading,
    isError: getTypeByIdISError,
  } = useGetTypeById();

  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [id, setId] = React.useState("");
  const [idEdit, setIdEdit] = React.useState("");
  const [findTypeById, setFindTypeById] = React.useState<IType>();

  React.useEffect(() => {
    if (idEdit) {
      const res = mutateAsyncTypeById(idEdit);
      res
        .then((data) => {
          resetEdit({
            typeName: data?.typeName,
            typeCode: data?.typeCode,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idEdit]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const payload = {
      typeName: data.typeName,
      typeCode: data.typeCode,
    };
    const res = mutateAsyncTypeCreate(payload);
    res
      .then((data) => {
        if (data.message === "Created type successfully") {
          toast.success("เพิ่มข้อมูลประเภทงานสำเร็จ");
          setOpenCreate(false);
        } else if (data.message === "Type already exists") {
          toast.error("มีประเภทงานนี้ถูกใช้เเล้ว", {
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
        } else {
          toast.error("มี Code นี้ถูกใช้เเล้ว", {
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
        toast.error("เพิ่มข้อมูลประเภทงานไม่สำเร็จ");
      });
  };

  const onSubmitEdit = (data: FormData) => {
    const payload = {
      id: idEdit,
      typeName: data.typeName,
      typeCode: data.typeCode,
    };
    const res = mutateAsyncTypeEdit(payload);
    res
      .then((data) => {
        if (data.message === "Updated type successfully") {
          toast.success("เเก้ไขข้อมูลประเภทงานสำเร็จ");
          setOpenEdit(false);
        } else if (data.message === "Type already exists") {
          toast.error("มีประเภทงานนี้ถูกใช้เเล้ว", {
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
        } else {
          toast.error("มี Code นี้ถูกใช้เเล้ว", {
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
        toast.error("เเก้ไขข้อมูลประเภทงานไม่สำเร็จ");
      });
  };

  const handleClickOpen = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleClickOpenEdit = (id: string) => {
    setIdEdit(id);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    reset();
    setOpenCreate(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmitDelete = async () => {
    try {
      await mutateAsyncType(id);
      toast.success("ลบข้อมูลประเภทงานสำเร็จ");
      setOpen(false);
    } catch (error) {
      toast.error("ลบข้อมูลประเภทงานไม่สำเร็จ");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "typeName",
      headerAlign: "center",
      align: "left",
      headerName: "ชื่อประเภท",
      headerClassName: "text-[#0f8d67]",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center ml-2">
            <div className="bg-[#00DC82] rounded-lg p-2 text-white">
              <RxCube />
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
      headerName: "Code ประเภท",
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
      width: 250,
      headerAlign: "center",
      headerClassName: "text-[#0f8d67]",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            onClick={() => handleClickOpenEdit(params.row._id)}
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
    ...dataTypes.map((item, index) => {
      return {
        _id: item._id,
        typeName: item.typeName,
        typeCode: item.typeCode,
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
            หน้าจัดการประเภทงาน
          </div>
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="flex justify-end">
              <div
                onClick={handleClickOpenCreate}
                className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md py-1 rounded-lg flex gap-1 justify-between px-4 items-center cursor-pointer"
              >
                <span>เพิ่ม</span>
                <MdOutlineAddBox className=" text-xl" />
              </div>
            </div>
            {getISLoading ? (
              <TableLoading />
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <div className="p-6">
          <div className=" m-3 text-xl">
            {"คุณต้องการที่จะลบข้อมูลประเภทงานหรือไม่?"}
          </div>
          <DialogActions className="flex justify-around items-center">
            <div
              onClick={handleClose}
              className=" w-24 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
            >
              <span>ยกเลิก</span>
            </div>
            <div
              onClick={handleSubmitDelete}
              className=" w-24 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
            >
              <span>ยืนยัน</span>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogContent style={{ minWidth: 500 }}>
          <span>สร้างประเภทงาน</span>
          <form onSubmit={handleSubmit(onSubmit)} className=" mt-4">
            <div className="flex flex-col gap-3">
              <FormControl size="small" sx={{ minHeight: 60 }}>
                <TextField
                  id="typeName"
                  variant="outlined"
                  size="small"
                  label="ชื่อประเภทงาน"
                  color="success"
                  fullWidth
                  {...register("typeName", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.typeName &&
                    errors.typeName.type === "required" &&
                    "กรุณากรอกชื่อประเภทงาน"}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minHeight: 60 }}>
                <TextField
                  id="typeCode"
                  variant="outlined"
                  size="small"
                  label="Code ประเภทงาน"
                  color="success"
                  fullWidth
                  inputProps={{
                    maxLength: 7,
                  }}
                  {...register("typeCode", {
                    required: true,
                    pattern: {
                      value: /^BA\d{5}$/,
                      message:
                        "กรุณากรอก Code ประเภทงานให้ถูกต้อง ตัวอย่าง BA00001",
                    },
                  })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.typeCode &&
                    errors.typeCode.type === "required" &&
                    "กรุณากรอก Code ประเภทงาน"}
                  {errors.typeCode &&
                    errors.typeCode.type === "pattern" &&
                    errors.typeCode.message}
                </p>
              </FormControl>
            </div>
            <DialogActions>
              <div className="flex gap-10 items-start md:justify-end justify-center md:items-center">
                <div
                  onClick={handleCloseCreate}
                  className=" w-20 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
                >
                  <span>ยกเลิก</span>
                </div>
                <button
                  type="submit"
                  className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
                >
                  <span>ยืนยัน</span>
                </button>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogContent style={{ minWidth: 500 }}>
          <span>เเก้ไขประเภทงาน</span>
          <form onSubmit={handleSubmitEdit(onSubmitEdit)} className=" mt-4">
            <div className="flex flex-col gap-3">
              <FormControl size="small" sx={{ minHeight: 60 }}>
                <TextField
                  id="typeName"
                  variant="outlined"
                  size="small"
                  label="ชื่อประเภทงาน"
                  color="success"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...registerEdit("typeName", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errorsEdit.typeName &&
                    errorsEdit.typeName.type === "required" &&
                    "กรุณากรอกชื่อประเภทงาน"}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minHeight: 60 }}>
                <TextField
                  id="typeCode"
                  variant="outlined"
                  size="small"
                  label="Code ประเภทงาน"
                  color="success"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 7,
                  }}
                  {...registerEdit("typeCode", {
                    required: true,
                    pattern: {
                      value: /^BA\d{5}$/,
                      message:
                        "กรุณากรอก Code ประเภทงานให้ถูกต้อง ตัวอย่าง BA00001",
                    },
                  })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errorsEdit.typeCode &&
                    errorsEdit.typeCode.type === "required" &&
                    "กรุณากรอก Code ประเภทงาน"}
                  {errorsEdit.typeCode &&
                    errorsEdit.typeCode.type === "pattern" &&
                    errorsEdit.typeCode.message}
                </p>
              </FormControl>
            </div>
            <DialogActions>
              <div className="flex gap-10 items-start md:justify-end justify-center md:items-center">
                <div
                  onClick={handleCloseEdit}
                  className=" w-20 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
                >
                  <span>ยกเลิก</span>
                </div>
                <button
                  type="submit"
                  className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
                >
                  <span>ยืนยัน</span>
                </button>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Types;
