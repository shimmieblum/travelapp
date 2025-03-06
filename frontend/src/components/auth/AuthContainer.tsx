'use client';

import { ReactNode } from 'react';
import { Box, Container, Paper, Typography, Alert } from '@mui/material';

export interface AuthContainerProps {
  title: string;
  error: string | null;
  children: ReactNode;
}

export default function AuthContainer({ title, error, children }: AuthContainerProps) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            {title}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          
          {children}
        </Paper>
      </Box>
    </Container>
  );
}