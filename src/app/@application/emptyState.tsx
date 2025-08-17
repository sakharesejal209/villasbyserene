import { Typography } from "@mui/material";
import React, { FC } from "react";

type EmptyStatePropType = {
  message: string;
  description?: string;
};

const EmptyState: FC<EmptyStatePropType> = (props: EmptyStatePropType) => {
  const { message, description } = props;
  return (
    <div className=" w-full h-[calc(100vh-110px)] flex flex-col items-center justify-center gap-y-2">
      <Typography variant="h5">{message}</Typography>
      <Typography>{description}</Typography>
    </div>
  );
};

export default EmptyState;
