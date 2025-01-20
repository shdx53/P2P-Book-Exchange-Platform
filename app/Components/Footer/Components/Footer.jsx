import { footerNavLinks } from "../lib/constants/footerNavLinks";
import { BookCopy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-primary p-8 text-secondary-foreground">
      <div className="mb-16 flex gap-80">
        <div className="flex gap-2">
          <BookCopy />
          <span className="font-bold">BookSwap</span>
        </div>
        <div className="grid grid-cols-2 gap-12 text-sm">
          {footerNavLinks.map((footerNavLink) => (
            <NavLinkColumn footerNavLink={footerNavLink} />
          ))}
        </div>
      </div>

      <div className="text-end text-xs opacity-50 flex justify-between">
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
