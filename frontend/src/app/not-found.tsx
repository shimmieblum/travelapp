"use client";

import { useEffect, useState } from "react";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";
import { createClient } from "@/utils/supabase/client";
import PageNotFound from "@/components/ui/PageNotFound";

export default function NotFound() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return null;
  }
  
  return (
    (!isAuthenticated && <PageNotFound />) || (
      <AuthenticatedLayout title="Page Not Found">
        <PageNotFound />
      </AuthenticatedLayout>
    )
  );
}
