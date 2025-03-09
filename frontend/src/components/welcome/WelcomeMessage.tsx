"use client";

import { Box, Typography, Paper } from "@mui/material";

interface WelcomeMessageProps {
  name: string;
}

export default function WelcomeMessage({ name }: WelcomeMessageProps) {
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {name}!
      </Typography>
      <Typography variant="body1">
        We're excited to have you here. Start planning your next adventure with us.
      </Typography>
    </Paper>
  );
}