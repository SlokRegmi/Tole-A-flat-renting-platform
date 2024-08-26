import React from "react";
import { PasswordInput } from "../ui/passwordinput";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoginForm from "./loginform";

export default function RightSide() {
  return (
    <div className="relative bg-white p-10 rounded-lg shadow-lg flex flex-col justify-center ml-[33rem] w-[35rem] h-[42rem] z-0 px-[6rem]">
      <div className="mb-[2rem]">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Hello!</h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

