"use client";

import { useState } from "react";
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import darkImg from "../../../public/assets/villasbyserene-dark.png";
import lightImg from "../../../public/assets/villasbyserene-light.png";
import {
  IoEyeOffOutline,
  IoLockClosedOutline,
  IoLogoFacebook,
  IoLogoGoogle,
} from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbEye } from "react-icons/tb";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    // <div className="p-8 ">
    //   <div className="flex flex-col items-center">
    //     <Image
    //       src={theme.palette.mode === "light" ? darkImg : lightImg}
    //       alt="VillasBySerene: Your boutique getaway!"
    //       width={150}
    //     />
    //     <h1 className="text-xl mt-8 my-3">Admin Login</h1>
    //     <div>
    //       <TextField
    //         label="Password"
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <div>
    //         {error && (
    //           <div className="text-red-600 text-xs ml-1 mb-6">{error}</div>
    //         )}
    //       </div>
    //       <Button
    //         className="w-full !mt-4"
    //         variant="contained"
    //         onClick={handleLogin}
    //       >
    //         Login
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <section>
      <div className="min-h-screen flex justify-center items-center overflow-hidden bg-[#044231]">
        <div className="max-w-md mx-auto px-4 py-12">
          {/* Logo and Header */}
          <div className="flex flex-col items-center">
            <Image
              src={lightImg}
              alt="VillasBySerene: Your boutique getaway!"
              width={170}
            />

            <div className="flex flex-col justify-center items-center">
              <Typography variant="h5" className="text-white">
                Welcome to Villas By Serene
              </Typography>
            </div>
          </div>

          {/* Login Card */}
          <Card className="py-4 px-6 mt-4">
            <Typography className="!my-2 text-center">Log In</Typography>

            <form className="my-6 flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <TextField
                  className="w-full"
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdOutlineEmail />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Password"
                  className="w-full"
                  type={showPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IoLockClosedOutline />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className="hover:cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <IoEyeOffOutline className="w-5 h-5" />
                          ) : (
                            <TbEye className="w-5 h-5" />
                          )}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    size="small"
                    color={
                      theme.palette.mode == "light" ? "primary" : "secondary"
                    }
                    variant="text"
                  >
                    Forgot password?
                  </Button>
                </div>
              </div>

              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </form>

            <div className="flex flex-col ">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline-block",
                      paddingX: "8px",
                      background: theme.palette.background.default,
                    }}
                  >
                    Or continue with
                  </Typography>
                </div>
              </div>

              {/* Social Login Options */}
              <div className="grid grid-cols-2 gap-4 my-4 w-full">
                <Button
                  color={
                    theme.palette.mode == "light" ? "primary" : "secondary"
                  }
                  variant="outlined"
                  className="w-full"
                >
                  <IoLogoGoogle className="mr-1" />
                  Google
                </Button>
                <Button
                  color={
                    theme.palette.mode == "light" ? "primary" : "secondary"
                  }
                  variant="outlined"
                  className="w-full"
                >
                  <IoLogoFacebook className="mr-1" />
                  Facebook
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don&apos;t have an account?{" "}
                </span>
                <Link href="/" className="hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Login;
