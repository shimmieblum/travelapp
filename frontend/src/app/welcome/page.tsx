"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const Loading = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );

  const ErrorAlert = () => (
    <>
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
      <Typography variant="body2" align="center">
        Redirecting to login page...
      </Typography>
    </>
  );

  const WelcomePage = () => (
    <>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hi {userName}!
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to your travel app. You've successfully logged in.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
      </Paper>
    </>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      {loading ? <Loading /> : error ? <ErrorAlert /> : <WelcomePage />}
    </Container>
  );
}
