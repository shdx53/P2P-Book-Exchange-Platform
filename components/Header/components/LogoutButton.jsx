"use client";

import { logout } from "@/modules/login/actions/logout";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <span variant="ghost" className="cursor-pointer" onClick={handleLogout}>
      Log out
    </span>
  );
}
