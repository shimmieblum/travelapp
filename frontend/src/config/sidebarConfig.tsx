import { ReactNode } from "react";
import { 
  Home as HomeIcon, 
  Person as PersonIcon, 
  Logout as LogoutIcon,
  Settings as SettingsIcon 
} from "@mui/icons-material";

export interface SidebarTabConfig {
  id: string;
  label: string;
  icon: ReactNode;
  url?: string; // Optional URL, defaults to id if not specified
  dividerAfter?: boolean;
}

export const sidebarTabConfigs: SidebarTabConfig[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon />,
    url: "/welcome" // Custom URL for home
  },
  {
    id: "profile",
    label: "Profile",
    icon: <PersonIcon />,
    // url defaults to "/profile"
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    // url defaults to "/settings"
    dividerAfter: true
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogoutIcon />,
    // url defaults to "/logout"
  }
];
