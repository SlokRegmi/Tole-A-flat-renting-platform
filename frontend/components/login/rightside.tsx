import React from "react";
import { PasswordInput } from "../ui/passwordinput";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoginForm from "./loginform";
import Link from "next/link";

export default function RightSide() {
  return (
    <div className="relative bg-white rounded-lg shadow-lg flex flex-col justify-center ml-[36rem] w-[638px] h-[796px] z-0 px-[8rem]">
      <div className="mb-[2rem]">
      <h2 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-secondary to-[#73A4C5] bg-clip-text text-transparent inline-block text-[40px]">
      Hello!
    </h2>        
    <p className="text-gray-500">
          Login to your account and start managing your renting/rents efficiently.
        </p>
      </div>
      <LoginForm/>
      <div className="text-center mt-[2rem] mb-2">
        <a href="#" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <div className="text-center">
        <p className="text-gray-500">
          Don’t have an account?{" "}
          <Link href="/signup" passHref className="text-blue-500 hover:underline">
            Sign up
            </Link>
        </p>
      </div>
    </div>
  );
};

