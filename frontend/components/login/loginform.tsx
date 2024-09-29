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

      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p> // Display error message if login fails
      )}
    </form>
  );
};

export default LoginForm;
