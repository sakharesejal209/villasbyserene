import { Backdrop } from "@mui/material";

export default function Loading() {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 200,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(3px)",
      }}
      open={true}
    >
      <div className="loader w-[50px] h-auto" />
    </Backdrop>
  );
}
