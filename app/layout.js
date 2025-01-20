import "./globals.css";
import { BookCopy } from "lucide-react";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="flex justify-between p-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <BookCopy className="h-6 w-6" />
              <span className="font-bold">BookSwap</span>
            </div>
            <nav>
              <span>Book Listings</span>
            </nav>
          </div>
          <span>Log in</span>
        </header>
        {children}
      </body>
    </html>
  );
}
