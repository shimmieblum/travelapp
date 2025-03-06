'use client';

import { ReactNode } from 'react';
import { Box, Divider } from '@mui/material';

export interface AuthSubcontainerProps {
  children: ReactNode;
  withDivider?: boolean;
}

export default function AuthSubcontainer({ children, withDivider = false }: AuthSubcontainerProps) {
  return (
    <>
      <Box component="form" sx={{ mt: 2 }}>
        {children}
      </Box>
      {withDivider && <Divider sx={{ my: 2 }}>or</Divider>}
    </>
  );
}