import { createClient } from "@/utils/supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export class NavigationService {
  static async handleLogout(router: AppRouterInstance) {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  static handleHomeRedirect(router: AppRouterInstance, currentPath: string) {
    if (currentPath === "/welcome") {
      window.location.reload();
    } else {
      router.push("/welcome");
    }
  }
}