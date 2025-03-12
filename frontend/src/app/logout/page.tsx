"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NavigationService } from "@/services/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    NavigationService.handleLogout(router);
  }, [router]);

  return null;
}
