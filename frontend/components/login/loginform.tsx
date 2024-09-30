'use client';

import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { PasswordInput } from "../ui/passwordinput";
import { Button } from "../ui/button";
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext'; // Use the AuthContext

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); // Call useAuth once here

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        const { jwt, payload } = response.data; // Extract token and payload from the response

        // Pass both the token and the payload to the login function
        login(jwt, payload);
      }
    } catch (error) {
      // Handle different error cases
      if (axios.isAxiosError(error)) {
        // Handle error responses from the server
        if (error.response?.status === 401) {
          setErrorMessage('Invalid credentials. Please try again.');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <form className="flex flex-col space-y-[1rem]" onSubmit={handleLogin}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm"
        />
      </div>
      <PasswordInput
        id="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="w-full text-[24px]">
        Login
      </Button>
      <Button  className="w-full" variant={"secondary"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px"><g id="Layer_1"><rect x="15" y="13" width="10" height="4" /><path d="M22.733,13C22.899,13.641,23,14.307,23,15c0,4.418-3.582,8-8,8s-8-3.582-8-8s3.582-8,8-8c2.009,0,3.84,0.746,5.245,1.969l2.841-2.84C20.952,4.185,18.116,3,15.003,3C8.374,3,3,8.373,3,15s5.374,12,12.003,12c10.01,0,12.266-9.293,11.327-14H22.733z" /></g></svg>
              <span className='ml-1 text-[24px]'>Sign in with Google</span>
            </Button>

      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p> // Display error message if login fails
      )}
    </form>
  );
};

export default LoginForm;
