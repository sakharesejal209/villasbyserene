import StaysClientPage from "./StaysClientPage";

type ParamsType = { slug: string };

export default async function Page({
  params,
}: Readonly<{
  params: Promise<ParamsType>;
  searchParams?: { guests?: string };
}>) {
  const { slug } = await params;

  return <StaysClientPage slug={slug} />;
}
