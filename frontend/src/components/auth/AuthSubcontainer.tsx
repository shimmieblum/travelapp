"use client";

import { ReactNode } from "react";
import { Box, Divider } from "@mui/material";
import exp from "constants";

export interface AuthSubcontainerProps {
  children: ReactNode;
}

export function AuthSubcontainer({ children }: AuthSubcontainerProps) {
  return (
    <>
      <Box component="form" sx={{ mt: 2 }}>
        {children}
      </Box>
    </>
  );
}

export interface StyledDividerProps {
  text?: string;
}

export function StyledDivider({ text }: StyledDividerProps) {
  return <Divider sx={{ my: 2 }}>{text}</Divider>;
}
