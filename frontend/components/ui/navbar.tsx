'use client'
import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "./button";
import SearchBar from "./searchbar";
import { Separator } from "./separator";

export default function NavBar() {
  // Simulating authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This function will toggle the login state for demonstration
  const handleLoginToggle = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="flex justify-between items-center p-4 shadow-md px-[48px]">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="text-4xl font-bold">
          {/* Insert SVG or Image for Logo */}
        </div>
        <div className="text-2xl font-semibold">Tole</div>
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex justify-center">
        <div className="w-[463px] h-[48px]">
          <SearchBar />
        </div>
      </div>

      {/* Right Side (conditionally rendered based on isLoggedIn) */}
      <div className="flex items-center">
        <Globe className="mr-[21px]" />
        <Separator orientation="vertical" className="h-[40px] bg-black" />
        <div className="flex space-x-[24px] ml-[21px]">
          {isLoggedIn ? (
            <>
              <span>Welcome, User</span>
              <Button
                variant={"default"}
                onClick={() => handleLoginToggle()} // Handle logout
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant={"default"} onClick={() => handleLoginToggle()}>
                Login
              </Button>
              <Button variant={"secondary"}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
