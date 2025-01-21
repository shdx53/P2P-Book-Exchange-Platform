import { Inter } from "next/font/google";
import Footer from "../../components/Footer/components/Footer";
import Header from "../../components/Header/components/Header";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "P2P Book Exchange Platform",
  description: "This is a P2P Book Exchange Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col justify-between antialiased ${inter.className}`}
      >
        <div className="flex-1">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
