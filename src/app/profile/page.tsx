import { Suspense } from "react";
import { Metadata } from "next";
import ProfilePage from "@/app/components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "My Profile | Villas by Serene",
};

export default function Page() {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  );
}
