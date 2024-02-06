"use client";
import React from "react";
import Image from "next/image";
import noContent from "../../../public/No-data-amico.png";
import { Box, styled } from "@mui/material";

type Props = {};

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

const NoRowsOverlay = (props: Props) => {
  return (
    <StyledGridOverlay>
      <Image src={noContent} alt="No Data" width={200} height={200} />
      <Box sx={{ mt: 1 }}>ไม่มีข้อมูล</Box>
    </StyledGridOverlay>
  );
};

export default NoRowsOverlay;
