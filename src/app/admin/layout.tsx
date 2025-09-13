'use client'

import { Button } from "@mui/material";
import React from "react";

const Layout = () => {

  const logout = async () => {
    await fetch('/api/logout');
    window.location.href = '/login';
  };
  return (
    <div>
      layout
      <Button onClick={() => logout()} className="text-sm underline">
        Logout
      </Button>
    </div>
  );
};

export default Layout;
