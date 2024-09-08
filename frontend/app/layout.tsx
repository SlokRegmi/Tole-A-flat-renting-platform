'use client';

import { usePathname } from 'next/navigation';
import type { Metadata } from "next";
import { Josefin_Sans } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/ui/navbar";

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400'], // Specify the weights you need
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define the routes where the NavBar should not be shown
  const noNavBarRoutes = ['/login', '/signup'];

  return (
    <html lang="en">
      <body className={josefinSans.className}>
        {/* Conditionally render NavBar if pathname is not in noNavBarRoutes */}
        {!noNavBarRoutes.includes(pathname) && <NavBar />}
        <div>{children}</div>
      </body>
    </html>
  );
}
