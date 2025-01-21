import { getSession } from "@/modules/login/actions/getSession";
import Link from "next/link";
import Logo from "../../Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./Logout";

export default async function Header() {
  const { isLoggedIn, username } = await getSession();

  return (
    <header className="flex items-center justify-between px-8 py-6 text-sm">
      <div className="flex items-center gap-6">
        <Logo />
        <nav>
          <Link href="/listings/new">New Listing</Link>
        </nav>
      </div>

      <span>
        {isLoggedIn ? (
          <Dropdown username={username} />
        ) : (
          <Link href="/login">Log in</Link>
        )}
      </span>
    </header>
  );
}

const Dropdown = ({ username }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>{username}</DropdownMenuTrigger>
    <DropdownMenuContent className="border-border">
      <DropdownMenuLabel className="font-medium">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/listings/my">My Listings</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/requests/my">My Requests</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/requests/manage">Manage Requests</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Logout />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
