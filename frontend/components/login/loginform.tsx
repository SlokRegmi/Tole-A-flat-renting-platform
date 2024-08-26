import React from 'react';
import {Label} from '../ui/label';
import { Input } from '../ui/input';
import { PasswordInput } from "../ui/passwordinput";
import { Button } from "../ui/button";

const LoginForm: React.FC = () => {
  return (
    <form className="flex flex-col space-y-[1rem]">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" />
      </div>
      <PasswordInput id="password" label="Password" />
      <div className="flex justify-between items-center mb-4">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
