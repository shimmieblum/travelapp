import { ReactNode } from "react";
import { 
  Home as HomeIcon, 
  Person as PersonIcon, 
  Logout as LogoutIcon,
  Settings as SettingsIcon 
} from "@mui/icons-material";
import { createClient } from "@/utils/supabase/client";

export interface SidebarTab {
  id: string;
  label: string;
  icon: ReactNode;
  action: (onClose: () => void, router: any) => void;
  dividerAfter?: boolean;
}

export const sidebarTabs: SidebarTab[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon />,
    action: (onClose, router) => {
      onClose();
      if (window.location.pathname === '/welcome') {
        window.location.reload();
      } else {
        router.push('/welcome');
      }
    }
  },
  {
    id: "profile",
    label: "Profile",
    icon: <PersonIcon />,
    action: (onClose, router) => {
      onClose();
      router.push('/profile');
    }
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    action: (onClose, router) => {
      onClose();
      router.push('/settings');
    },
    dividerAfter: true
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogoutIcon />,
    action: async (onClose, router) => {
      onClose();
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
    }
  }
];
