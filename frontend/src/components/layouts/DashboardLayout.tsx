"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/navigation/Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarWidth = 240;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar width={sidebarWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${sidebarWidth}px` }}>
        {children}
      </Box>
    </Box>
  );
}