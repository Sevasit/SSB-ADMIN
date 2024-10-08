"use client";
import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Switch,
  SwitchProps,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { RxCube } from "react-icons/rx";
import { useForm } from "react-hook-form";
import useCreateType from "../../../hooks/type/useCreateType";
import useEditType from "../../../hooks/type/useEditType";
import useGetTypeById from "../../../hooks/type/useGetTypeById";
import { IType } from "../../../types/IType";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import TableLoading from "./TableLoading";
import NoRowsOverlay from "./NoRows";
import PrintCsvOnly from "./PrintCsvOnly";
import Loader from "./Loader";
import { styled } from "@mui/material/styles";
import useGetTypesByAdmin from "../../../hooks/type/useGetTypeByAdmin";

dayjs.extend(buddhistEra);
dayjs.locale("th");
type Props = {};

type FormData = {
  typeName: string;
  typeCode: string;
};

const Types = (props: Props) => {
  const {
    data: dataTypes = [],
    isLoading: getISLoading,
    isError: getISError,
  } = useGetTypesByAdmin();

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
  const [loader, setLoader] = React.useState(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (idEdit) {
      const res = mutateAsyncTypeById(idEdit);
      res
        .then((data) => {
          resetEdit({
            typeName: data?.typeName,
            typeCode: data?.typeCode,
          });
          setChecked(data.status);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idEdit]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const {
    register: registerEdit,
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setLoader(true);
    const payload = {
      typeName: data.typeName,
      typeCode: data.typeCode,
      status: checked,
    };
    const res = mutateAsyncTypeCreate(payload);
    res
      .then((data) => {
        if (data.message === "Created type successfully") {
          setLoader(false);
          toast.success("เพิ่มข้อมูลประเภทงานสำเร็จ");
          setOpenCreate(false);
          reset();
        } else if (data.message === "Type already exists") {
          setLoader(false);
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
          setLoader(false);
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
        setLoader(false);
        toast.error("เพิ่มข้อมูลประเภทงานไม่สำเร็จ");
      });
  };

  const onSubmitEdit = (data: FormData) => {
    setLoader(true);
    const payload = {
      id: idEdit,
      typeName: data.typeName,
      typeCode: data.typeCode,
      status: checked,
    };
    // console.log(payload);
    const res = mutateAsyncTypeEdit(payload);
    res
      .then((data) => {
        if (data.message === "Updated type successfully") {
          setLoader(false);
          toast.success("เเก้ไขข้อมูลประเภทงานสำเร็จ");
          setOpenEdit(false);
          reset();
        } else if (data.message === "Type already exists") {
          setLoader(false);
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
          setLoader(false);
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
        setLoader(false);
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
    setChecked(false);
    reset();
    setOpenCreate(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

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
                params.row.status === "ไม่ใช้งาน"
                  ? " text-xs bg-gray-300 py-2 px-4 rounded-md"
                  : "text-xs py-2 px-4 bg-[#00DC82] rounded-md"
              }`}
            >
              {params.row.status}
            </span>
          </>
        );
      },
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
            onClick={() => handleClickOpenEdit(params.row.id)}
            className=" w-24 bg-white border-2 border-[#dc8000] text-[#dc8000] hover:bg-[#dc8000] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer py-1 rounded-lg flex gap-1 justify-between px-4 items-center"
          >
            <span>เเก้ไข</span>
            <BiEdit className=" text-lg" />
          </div>
        );
      },
      sortable: false,
    },
  ];

  const ExportCsv = () => {
    return (
      <>
        <PrintCsvOnly
          fileName={`types_${dayjs().format("DD-MM-YYYY")}`}
          fields={["typeName", "typeCode", "status", "createdAt", "updatedAt"]}
        />
      </>
    );
  };

  const rows: GridRowsProp = [
    ...dataTypes.map((item, index) => {
      return {
        id: item._id,
        typeName: item.typeName,
        typeCode: item.typeCode,
        status: item.status === true ? "ใช้งาน" : "ไม่ใช้งาน",
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
              <FormControl size="small" sx={{ minHeight: 40 }}>
                <div className=" flex gap-2 items-center">
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setChecked(event.target.checked);
                    }}
                  />
                  <span>{checked ? "Active" : "Inactive"}</span>
                </div>
              </FormControl>
            </div>
            <DialogActions>
              {loader && <Loader />}
              {!loader && (
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
              )}
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
              <FormControl size="small" sx={{ minHeight: 40 }}>
                <div className=" flex gap-2 items-center">
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setChecked(event.target.checked);
                    }}
                  />
                  <span>{checked ? "Active" : "Inactive"}</span>
                </div>
              </FormControl>
            </div>
            <DialogActions>
              {loader && <Loader />}
              {!loader && (
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
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Types;
