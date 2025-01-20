import Logo from "../../Logo";
import { footerNavLinks } from "../lib/constants/footerNavLinks";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-primary p-8 text-secondary-foreground">
      <div className="mb-16 flex gap-80 items-start">
        <Logo />
        <div className="grid grid-cols-2 gap-12 text-sm">
          {footerNavLinks.map((footerNavLink) => (
            <NavLinkColumn footerNavLink={footerNavLink} />
          ))}
        </div>
      </div>

      <div className="flex justify-between text-end text-xs opacity-50">
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
    <div className="font-medium opacity-80">{footerNavLink.heading}</div>
    <nav>
      {footerNavLink.navLinks.map((navLink) => (
        <span>{navLink}</span>
      ))}
    </nav>
  </div>
);
