"use client";

import { ReactNode, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Sidebar } from "@/components/navigation/Sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AuthenticatedLayout({ children, title = "Travel App" }: AuthenticatedLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}