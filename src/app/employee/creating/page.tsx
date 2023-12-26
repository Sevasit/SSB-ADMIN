"use client";
import {
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

interface Props {}

const CreateEmp = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center">
        <hr className="my-5" />
        <div className="px-[5%] mt-5 flex flex-col gap-8 w-[900px] p-5 rounded-lg border-4 border-[#00DC82]">
          <div className="text-lg text-start w-full font-semibold">
            สร้างบัญชีผู้ใช้
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-20">
            <FormControl size="small" sx={{ minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">ประเภทงาน</InputLabel>
              <Select
                label="ประเภทงาน"
                id="type"
                // value={type}
                // onChange={(e) => {
                //   handleCountLeaveDay(String(e.target.value));
                // }}
              >
                {/* {data.map((item, index) => (
                  <MenuItem
                    key={Number(item.id)}
                    value={Number(item.id)}>
                    {item.typeName}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-[44px]">
            <TextField
              id="phone"
              variant="outlined"
              size="small"
              label="เบอร์โทรศัพท์"
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
          </div>
          <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
            <div
              onClick={() => router.push("/employee")}
              className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
            >
              <span>ยกเลิก</span>
            </div>
            <div className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
              <span>ยืนยัน</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmp;
