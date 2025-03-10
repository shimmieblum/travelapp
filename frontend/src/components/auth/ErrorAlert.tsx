import { Alert } from "@mui/material";

export interface errorAlertProps {
  error: string | null;
}

export function ErrorAlert({ error }: errorAlertProps) {
  return (
    <>
      {typeof window !== "undefined" && error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
}
