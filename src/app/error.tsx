"use client";

import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

export default function GlobalError({
  error,
  reset
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <Typography
              variant="h4"
              color="error"
              className="text-2xl font-bold"
            >
              Oops! Something went wrong.
            </Typography>
            <Typography className="mt-2 text-gray-700">
              Please try refreshing the page or come back later.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => reset()}
              className="flex justify-between gap-2 items-center"
            >
              <RefreshRoundedIcon /> Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
