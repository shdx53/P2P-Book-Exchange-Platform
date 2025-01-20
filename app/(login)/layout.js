import { Inter } from "next/font/google";
import "../globals.css";
import Logo from "@/components/Logo";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Login Page",
  description: "This is Login Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        <div className="px-8 py-6">
          <Logo />
        </div>
        {children}
      </body>
    </html>
  );
}
