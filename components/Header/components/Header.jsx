import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/modules/login/actions/getSession";
import Link from "next/link";
import Logo from "../../Logo";
import { dropdownLinks } from "../lib/contants/dropdownLinks";
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
      {dropdownLinks.map(({ href, label }) => (
        <DropdownMenuItem>
          <Link href={href} className="w-full">
            {label}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem>
        <Logout />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
