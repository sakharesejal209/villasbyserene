import StaysClientPage from "./StaysClientPage";

type ParamsType = { slug: string };

export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: ParamsType;
  searchParams?: { guests?: string };
}>) {
  
  const { slug } = await params;
  const guests = parseInt(await searchParams?.guests || "0");

  return <StaysClientPage slug={slug} guests={guests} />;
}
