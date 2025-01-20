import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 text-sm">
      <div className="flex items-center gap-4">
        <Logo />
        <nav>
          <span>Listings</span>
        </nav>
      </div>
      <span>Log in</span>
    </header>
  );
}
