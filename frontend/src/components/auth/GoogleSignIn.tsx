'use client';

import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export interface GoogleSignInProps {
  handler: () => void;
  loading?: boolean;
}

export default function GoogleSignIn({ handler, loading = false }: GoogleSignInProps) {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handler}
      disabled={loading}
    >
      Sign in with Google
    </Button>
  );
}