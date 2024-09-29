// app/layout.tsx
'use client';

import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/ui/navbar';
import Footer from '@/components/footer/footer';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { usePathname } from 'next/navigation';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Define the routes where the NavBar should not be shown
  const noNavBarRoutes = ['/login', '/signup'];

  const showNavBar = !noNavBarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={josefinSans.className}>
        {/* Wrap the app with the AuthProvider */}
        <AuthProvider>
          {showNavBar && <NavBar />}
          <main className={`flex-grow ${showNavBar ? 'pt-[96px]' : ''}`}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
