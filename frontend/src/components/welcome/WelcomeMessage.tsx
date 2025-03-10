"use client";

import { Paper, Typography, Box } from "@mui/material";

interface WelcomeMessageProps {
  userName: string;
}

export function WelcomeMessage({ userName }: WelcomeMessageProps) {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hi {userName}!
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to your travel app. You've successfully logged in.
      </Typography>
      <Typography variant="body2" paragraph>
        Use the menu in the top left to navigate through the app.
      </Typography>
    </Paper>
  );
}