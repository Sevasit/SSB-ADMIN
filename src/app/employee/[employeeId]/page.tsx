"use client";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useGetByIdUsers from "../../../../hooks/users/useGetByIdUsers";
import useEditUsers from "../../../../hooks/users/useEditUsers";
import { useSession } from "next-auth/react";
import Loader from "@/app/components/Loader";
import useGetTypeIncludeAdmin from "../../../../hooks/type/useGetTypeInclude";

type FormData = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  oldPassword: string;
  password: string;
  newPassword: string;
  role: string;
};

const EditEmp = () => {
  const { data: session, status } = useSession();
  const roleUser = session?.userData.role;
  const [loader, setLoader] = React.useState(false);

  const router = useRouter();
  const { employeeId } = useParams();

  const {
    data: dataGetId,
    isLoading: GetIdisLoading,
    isError: GetIdisError,
  } = useGetByIdUsers(employeeId.toString()!!);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const watchFieldsPassword = watch(["password", "newPassword"]);

  React.useEffect(() => {
    if (!GetIdisLoading && !GetIdisError && dataGetId!!) {
      reset({
        name: dataGetId.firstName,
        lastname: dataGetId.lastName,
        email: dataGetId.email,
        phone: dataGetId.phone,
      });
    }
  }, [dataGetId!!, GetIdisLoading!!, GetIdisError!!, reset, router]);

  const {
    data: dataType = [],
    isLoading: getisLoading,
    isError: getisErroris,
  } = useGetTypeIncludeAdmin();

  const {
    mutateAsync: mutateAsyncEdit,
    isLoading: editisLoading,
    isError: editisError,
  } = useEditUsers();

  const onSubmit = (data: FormData) => {
    setLoader(true);
    const payload = {
      id: employeeId,
      firstName: data.name,
      lastName: data.lastname,
      email: data.email,
      phone: data.phone,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      role: data.role,
    };
    const res = mutateAsyncEdit(payload);
    res
      .then((data) => {
        if (data.message === "Updated user successfully") {
          setLoader(false);
          toast.success("อัพเดตข้อมูลผู้ใช้งานสำเร็จ");
          router.push("/employee");
        } else if (data.message === "Invalid password") {
          setLoader(false);
          toast.error("รหัสผ่านเก่าผิดกรุณาลองใหม่", {
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
        } else if (data.message === "Email already exists") {
          setLoader(false);
          toast.error("อีเมล์นี้ถูกใช้เเล้ว", {
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
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error("อัพเดตข้อมูลผู้ใช้งานไม่สำเร็จ");
      });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <hr className="my-5" />
        <Container component="main" maxWidth="lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-[5%] mt-5 flex flex-col gap-4 p-5 rounded-lg border shadow-md">
              <div className="text-lg text-start w-full font-semibold">
                เเก้ไขบัญชีผู้ใช้
              </div>
              <div className="flex items-center gap-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl
                    size="small"
                    sx={{ minWidth: 400, minHeight: 60 }}
                  >
                    <TextField
                      id="name"
                      variant="outlined"
                      size="small"
                      label="ชื่อ"
                      color="success"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("name", { required: true })}
                    />
                    <p className="text-[12px] ml-1 text-[#b91515]">
                      {errors.name &&
                        errors.name.type === "required" &&
                        "กรุณากรอกชื่อผู้ใช้"}
                    </p>
                  </FormControl>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl
                    size="small"
                    sx={{ minWidth: 400, minHeight: 60 }}
                  >
                    <TextField
                      id="lastname"
                      variant="outlined"
                      size="small"
                      label="นามสกุล"
                      color="success"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("lastname", { required: true })}
                    />
                    <p className="text-[12px] ml-1 text-[#b91515]">
                      {errors.lastname &&
                        errors.lastname.type === "required" &&
                        "กรุณากรอกนามสกุลผู้ใช้"}
                    </p>
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center gap-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl
                    size="small"
                    sx={{ minWidth: 400, minHeight: 60 }}
                  >
                    <TextField
                      id="email"
                      variant="outlined"
                      size="small"
                      label="อีเมล์"
                      color="success"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[a-zA-Z0-9._-]+@rmutt\.ac\.th$/,
                          message: "กรุณากรอกอีเมล์ผู้ใช้ให้ถูกต้อง",
                        },
                      })}
                    />
                    <p className="text-[12px] ml-1 text-[#b91515]">
                      {errors.email &&
                        errors.email.type === "required" &&
                        "กรุณากรอกอีเมล์ผู้ใช้"}
                      {errors.email &&
                        errors.email.type === "pattern" &&
                        errors.email.message}
                    </p>
                  </FormControl>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl
                    size="small"
                    sx={{ minWidth: 400, minHeight: 60 }}
                  >
                    <TextField
                      id="phone"
                      variant="outlined"
                      size="small"
                      label="เบอร์โทรศัพท์"
                      color="success"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("phone", {
                        required: true,
                        pattern: {
                          value: /^(06|08|09)\d{8}$/,
                          message: "กรุณากรอกเบอร์โทรศัพท์ผู้ใช้ให้ถูกต้อง",
                        },
                      })}
                      inputProps={{
                        maxLength: 10,
                        onChange: (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        },
                      }}
                    />
                    <p className="text-[12px] ml-1 text-[#b91515]">
                      {errors.phone &&
                        errors.phone.type === "required" &&
                        "กรุณากรอกเบอร์โทรศัพท์ผู้ใช้"}
                      {errors.phone &&
                        errors.phone.type === "pattern" &&
                        errors.phone.message}
                    </p>
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center gap-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl
                    size="small"
                    sx={{ minWidth: 400, minHeight: 60 }}
                  >
                    <TextField
                      id="password"
                      variant="outlined"
                      size="small"
                      label="รหัสผ่านใหม่"
                      type="password"
                      color="success"
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 12,
                          message:
                            "กรุณากรอกรหัสผ่านผู้ใช้ให้ถูกต้อง 12 ตัวอักษร",
                        },
                      })}
                      inputProps={{ maxLength: 12 }}
                    />
                    <p className="text-[12px] ml-1 text-[#b91515]">
                      {errors.password &&
                        errors.password.type === "required" &&
                        "กรุณากรอกรหัสผ่านผู้ใช้"}
                      {errors.password &&
                        errors.password.type === "minLength" &&
                        errors.password.message}
                    </p>
                  </FormControl>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl
                    size="small"
                    sx={{ minWidth: 400, minHeight: 60 }}
                  >
                    <TextField
                      id="newPassword"
                      variant="outlined"
                      size="small"
                      type="password"
                      label="ยืนยันรหัสผ่านใหม่"
                      color="success"
                      {...register("newPassword", {
                        required: true,
                        minLength: {
                          value: 12,
                          message:
                            "กรุณากรอกรหัสผ่านผู้ใช้ให้ถูกต้อง 12 ตัวอักษร",
                        },
                        validate: (value) => {
                          return (
                            value === watchFieldsPassword[0] ||
                            "รหัสผ่านผู้ใช้ไม่ตรงกัน"
                          );
                        },
                      })}
                      inputProps={{ maxLength: 12 }}
                    />
                    <p className="text-[12px] ml-1 text-[#b91515]">
                      {errors.newPassword &&
                        errors.newPassword.type === "required" &&
                        "กรุณากรอกรหัสผ่านยืนยันผู้ใช้"}
                      {errors.newPassword &&
                        errors.newPassword.type === "minLength" &&
                        errors.newPassword.message}
                      {errors.newPassword &&
                        errors.newPassword.type === "validate" &&
                        errors.newPassword.message}
                    </p>
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-20">
                <FormControl size="small" sx={{ minWidth: 400, minHeight: 60 }}>
                  <TextField
                    id="oldPassword"
                    variant="outlined"
                    size="small"
                    label="รหัสผ่านเก่า"
                    type="password"
                    color="success"
                    {...register("oldPassword", {
                      required: true,
                      minLength: {
                        value: 12,
                        message:
                          "กรุณากรอกรหัสผ่านผู้ใช้ให้ถูกต้อง 12 ตัวอักษร",
                      },
                    })}
                    inputProps={{ maxLength: 12 }}
                  />
                  <p className="text-[12px] ml-1 text-[#b91515]">
                    {errors.oldPassword &&
                      errors.oldPassword.type === "required" &&
                      "กรุณากรอกรหัสผ่านเก่าของผู้ใช้"}
                    {errors.oldPassword &&
                      errors.oldPassword.type === "minLength" &&
                      errors.oldPassword.message}
                  </p>
                </FormControl>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-20">
                <FormControl size="small" sx={{ minWidth: 250, minHeight: 60 }}>
                  <InputLabel id="demo-simple-select-label" color="success">
                    ประเภทงาน
                  </InputLabel>
                  <Select
                    label="ประเภทงาน"
                    id="role"
                    inputProps={{ ...register("role", { required: true }) }}
                    defaultValue={""}
                    color="success"
                  >
                    {dataType.map((item, index) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.typeName}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="text-[12px] ml-1 text-[#b91515]">
                    {errors.role &&
                      errors.role.type === "required" &&
                      "กรุณาเลือกประเภทงานผู้ใช้"}
                  </p>
                </FormControl>
                <div className="flex w-[550px] gap-10 justify-end">
                  {loader && <Loader />}
                  {!loader && (
                    <Link href="/employee">
                      <div className=" w-20 bg-white border-2 border-[#b91515] text-[#b91515] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                        <span>ยกเลิก</span>
                      </div>
                    </Link>
                  )}
                  {!loader && (
                    <button
                      type="submit"
                      className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
                    >
                      <span>ยืนยัน</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Container>
        <Toaster position="bottom-right" />
      </div>
    </>
  );
};

export default EditEmp;
