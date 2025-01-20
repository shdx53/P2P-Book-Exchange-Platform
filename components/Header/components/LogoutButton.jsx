"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/modules/login/actions/logout";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Log out
    </Button>
  );
}
