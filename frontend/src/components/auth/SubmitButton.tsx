'use client';

import { Button } from '@mui/material';

export interface SubmitButtonProps {
  loading: boolean;
  text: string;
  onSubmit: () => void;
}

export function SubmitButton({ loading, text, onSubmit }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {text}
    </Button>
  );
}