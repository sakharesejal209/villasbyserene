import React from "react";

import cancellationpolicies from "./data/cancellationpolicy.json";
import { Typography } from "@mui/material";

const CancellationPolicy = () => {
  return (
    <ul className="flex flex-col gap-2">
      {cancellationpolicies.map((item) => (
        <li key={item.id} className="flex items-start gap-2">
          <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
          <Typography>{item.description}</Typography>
        </li>
      ))}
    </ul>
  );
};

export default CancellationPolicy;
