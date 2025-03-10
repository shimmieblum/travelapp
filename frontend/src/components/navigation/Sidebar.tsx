"use client";

import { Box, Toolbar, List, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from "@mui/material";
import { useRouter } from "next/navigation";
import { sidebarTabs } from "@/config/sidebarConfig";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number;
}

export function Sidebar({ open, onClose, width = 240 }: SidebarProps) {
  const router = useRouter();

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {sidebarTabs.map((tab) => (
            <Box key={tab.id}>
              <ListItemButton onClick={() => tab.action(onClose, router)}>
                <ListItemIcon>
                  {tab.icon}
                </ListItemIcon>
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