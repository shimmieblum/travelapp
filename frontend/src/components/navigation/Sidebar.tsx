"use client";

import {
  Box,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import { SidebarTabConfig, sidebarTabConfigs } from "@/config/sidebarConfig";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number;
}

export function Sidebar({ open, onClose, width = 240 }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = useCallback(
    (tab: SidebarTabConfig) => () => {
      onClose();
      const url = tab.url || `/${tab.id}`;
      if (pathname === url) {
        router.refresh();
        return;
      }
      router.push(url);
    },
    [onClose, pathname, router]
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sidebarTabConfigs.map((tab) => (
            <Box key={tab.id}>
              <ListItemButton onClick={handleClick(tab)}>
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.label} />
              </ListItemButton>
              {tab.dividerAfter && <Divider />}
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
