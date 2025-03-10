"use client";

import { Alert, Typography, Container } from "@mui/material";

interface ErrorMessageProps {
  message: string;
  redirecting?: boolean;
}

export function ErrorMessage({ message, redirecting = false }: ErrorMessageProps) {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {message}
      </Alert>
      {redirecting && (
        <Typography variant="body2" align="center">
          Redirecting to login page...
        </Typography>
      )}
    </Container>
  );
}