"use client";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useGetType from "../../../../hooks/type/useGetType";

interface Props {}

const CreateEmp = (props: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: dataType = [],
    isLoading: createisLoading,
    isError: isErrorisLoading,
  } = useGetType();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <hr className="my-5" />
        <Container component="main" maxWidth="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-[5%] mt-5 flex flex-col gap-8 p-5 rounded-lg border-4 border-[#00DC82]">
              <div className="text-lg text-start w-full font-semibold">
                สร้างบัญชีผู้ใช้
              </div>
              <div className="flex items-center gap-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl size="small" sx={{ minWidth: 300 }}>
                    <TextField
                      id="name"
                      variant="outlined"
                      size="small"
                      label="ชื่อ"
                      {...register("name", { required: true })}
                    />
                  </FormControl>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl size="small" sx={{ minWidth: 300 }}>
                    <TextField
                      id="lastname"
                      variant="outlined"
                      size="small"
                      label="นามสกุล"
                      {...register("lastname", { required: true })}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center gap-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl size="small" sx={{ minWidth: 300 }}>
                    <TextField
                      id="email"
                      variant="outlined"
                      size="small"
                      label="อีเมล์"
                      {...register("email", { required: true })}
                    />
                  </FormControl>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl size="small" sx={{ minWidth: 300 }}>
                    <TextField
                      id="phone"
                      variant="outlined"
                      size="small"
                      label="เบอร์โทรศัพท์"
                      {...register("phone", { required: true })}
                      //   value={phone}
                      //   InputLabelProps={{
                      //     shrink: true,
                      //   }}
                      //   onChange={handleValidationMobilePhone}
                      //   error={dirty?.mobilePhone && !isValid?.mobilePhone}
                      //   onBlur={() => setDirty({ ...dirty, mobilePhone: true })}
                      //   helperText={
                      //     dirty?.mobilePhone &&
                      //     !isValid?.mobilePhone &&
                      //     "Please enter a valid mobile phone number."
                      //   }
                      inputProps={{ maxLength: 12 }}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center gap-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl size="small" sx={{ minWidth: 300 }}>
                    <TextField
                      id="password"
                      variant="outlined"
                      size="small"
                      label="รหัสผ่าน"
                      type="password"
                      {...register("password", { required: true })}
                    />
                  </FormControl>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
                  <FormControl size="small" sx={{ minWidth: 300 }}>
                    <TextField
                      id="newPassword"
                      variant="outlined"
                      size="small"
                      type="password"
                      label="ยืนยันรหัสผ่าน"
                      {...register("newPassword", { required: true })}
                      //   value={phone}
                      //   InputLabelProps={{
                      //     shrink: true,
                      //   }}
                      //   onChange={handleValidationMobilePhone}
                      //   error={dirty?.mobilePhone && !isValid?.mobilePhone}
                      //   onBlur={() => setDirty({ ...dirty, mobilePhone: true })}
                      //   helperText={
                      //     dirty?.mobilePhone &&
                      //     !isValid?.mobilePhone &&
                      //     "Please enter a valid mobile phone number."
                      //   }
                      inputProps={{ maxLength: 12 }}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-20">
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-label">
                    ประเภทงาน
                  </InputLabel>
                  <Select
                    label="ประเภทงาน"
                    id="type"
                    {...register("type", { required: true })}
                    defaultValue={""}
                  >
                    {dataType.map((item, index) => (
                      <MenuItem key={item._id} value={item.typeName}>
                        {item.typeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
                <div
                  onClick={() => router.push("/employee")}
                  className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
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
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default CreateEmp;
