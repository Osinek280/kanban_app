import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sideBar/sideBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="root">
          <div className="App">
            <Sidebar />
            <div className="main-container">
              {children} 
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
