import React from "react";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  
  return <div>{slug ? slug : "Error"}</div>;
}
