"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import DashboardContent from "@/components/DashboardContent";

export default function DashboardPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <DashboardContent />;
}