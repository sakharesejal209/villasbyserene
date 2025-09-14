"use client";

import { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import darkImg from "../../../public/assets/logoDark.png";
import lightImg from "../../../public/assets/logoLight.png";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  };
  
  return (
    <div className="p-8 ">
      <div className="flex flex-col items-center">
        <Image
          src={theme.palette.mode === "light" ? darkImg : lightImg}
          alt="logo"
          width={150}
        />
        <h1 className="text-xl mt-8 my-3">Admin Login</h1>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {error && (
              <div className="text-red-600 text-xs ml-1 mb-6">{error}</div>
            )}
          </div>
          <Button className="w-full" variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
