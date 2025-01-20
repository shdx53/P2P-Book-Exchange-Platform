import { getSession } from "@/modules/login/actions/getSession";
import Link from "next/link";
import Logo from "../../Logo";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const { isLoggedIn } = await getSession();

  return (
    <header className="flex items-center justify-between px-8 py-6 text-sm">
      <div className="flex items-center gap-4">
        <Logo />
        <nav>
          <span>Listings</span>
        </nav>
      </div>

      <span>
        {isLoggedIn ? <LogoutButton /> : <Link href="/login">Log in</Link>}
      </span>
    </header>
  );
}
