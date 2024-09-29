// app/components/ui/navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Button } from './button';
import { Separator } from './separator';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext'; // Import useAuth hook

export default function NavBar() {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const currentPath = usePathname();

  const isHomePage = currentPath === '/';

  return (
    <nav className="h-[96px] fixed top-0 left-0 w-full z-[98] bg-white shadow-md px-[48px] flex items-center">
      <div className="flex-1 flex items-center">
        <Link href="/" legacyBehavior>
          <a className="text-4xl font-bold">
            <Image src="/logo.png" alt="Tole Logo" width={101} height={90} />
          </a>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="text-[24px] flex items-end space-x-[40px]">
          <Link href="/" legacyBehavior>
            <a
              className={`relative cursor-pointer ${
                isHomePage
                  ? 'text-[24px] mb-[5px] underline decoration-[3px] underline-offset-[8px] font-bold'
                  : ''
              }`}
            >
              Home
            </a>
          </Link>
          <span>About Us</span> {/* Add a link or route later */}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <Globe className="mr-[21px]" />
        <Separator orientation="vertical" className="h-[40px] bg-black mr-[21px]" />
        <div className="flex space-x-[24px]">
          {user ? (
            // If user is logged in, show "Profile" and "Logout" buttons
            <>
              <Link href="/profile" legacyBehavior>
                <Button className="w-[101px] h-[52px]" variant="default">
                  Profile
                </Button>
              </Link>
              <Button className="w-[101px] h-[52px]" variant="secondary" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            // If user is not logged in, show "Login" and "Sign Up" buttons
            <>
              <Link href="/login" legacyBehavior>
                <Button className="w-[101px] h-[52px]" variant="default">
                  Login
                </Button>
              </Link>
              <Link href="/signup" legacyBehavior>
                <Button className="w-[101px] h-[52px]" variant="secondary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
