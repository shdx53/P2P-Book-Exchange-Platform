import Link from "next/link";
import Logo from "../../Logo";
import { footerNavLinks } from "../lib/constants/footerNavLinks";

export default function Footer() {
  return (
    <footer className="bg-primary p-8 text-secondary-foreground">
      <div className="mb-16 flex items-start gap-80">
        <Logo />
        <div className="grid grid-cols-2 gap-12 text-sm">
          {footerNavLinks.map((footerNavLink, index) => (
            <NavLinkColumn key={index} footerNavLink={footerNavLink} />
          ))}
        </div>
      </div>

      <div className="flex justify-between text-end text-xs text-muted-foreground">
        <span>© 2024 BookSwap. All rights reserved</span>
        <div className="space-x-4">
          <span>Terms of Use</span>
          <span>Policy Policy</span>
        </div>
      </div>
    </footer>
  );
}

const NavLinkColumn = ({ footerNavLink }) => (
  <div className="col-span-1 space-y-3">
    <span className="font-medium opacity-50">{footerNavLink.heading}</span>
    <nav className="flex flex-col space-y-1">
      {Object.values(footerNavLink.navLinks).map((navLink, index) => (
        <Link key={index} href={navLink.href}>
          {navLink.label}
        </Link>
      ))}
    </nav>
  </div>
);
