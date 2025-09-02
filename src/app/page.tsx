import { fetchAllData } from "@/scripts/getProperties";
import Home from "./home/page";

export default async function Page() {
  const propertiesData = await fetchAllData();
  return <Home initialData={propertiesData} />;
}
