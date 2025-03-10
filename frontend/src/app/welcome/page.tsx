"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";
import { WelcomeMessage } from "@/components/welcome/WelcomeMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function WelcomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function checkAuth() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("No active session found. Please log in again.");
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.name || "defaultname");
      } else {
        setError("User information could not be retrieved.");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(`Authentication error: ${error.message || "Unknown error"}`);
      setTimeout(() => router.push("/login"), 3000);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} redirecting={true} />;
  }

  return (
    <AuthenticatedLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <WelcomeMessage userName={userName} />
      </Container>
    </AuthenticatedLayout>
  );
}
