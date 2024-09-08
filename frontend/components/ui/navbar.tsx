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
    <>
      <nav className="h-[96px] fixed top-0 left-0 w-full z-50 bg-white shadow-md px-[48px] flex justify-between items-center">
        {/* Wrapper to center items inside the navbar */}
        <div className="flex w-full items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center w-[255px]">
            <div className="text-4xl font-bold">
              {/* Insert SVG or Image for Logo */}
            </div>
            <div className="text-2xl font-semibold">Tole</div>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-grow flex justify-center">
            <div className="w-full max-w-[463px]">
              <SearchBar />
            </div>
          </div>

          {/* Right Side (conditionally rendered based on isLoggedIn) */}
          <div className="flex items-center justify-end w-[255px]">
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
        </div>
      </nav>
    </>
  );
}
