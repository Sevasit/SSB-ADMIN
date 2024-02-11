import { Skeleton } from "@mui/material";

import React from "react";

type Props = {};

const LoadingTaskById = (props: Props) => {
  return (
    <>
      <div className=" flex justify-center gap-16 items-center w-auto">
        <Skeleton variant="rectangular" width={300} height={300} />
        <Skeleton variant="rectangular" width={300} height={300} />
      </div>
    </>
  );
};

export default LoadingTaskById;
