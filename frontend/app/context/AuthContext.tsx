// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (token: string, payload: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if JWT token exists in cookies when the component mounts
    const token = Cookies.get('token');
    const payload = Cookies.get('payload'); // Optionally store payload in cookies if needed

    if (token && payload) {
      // Parse payload from cookies
      const parsedPayload = JSON.parse(payload);
      console.log('Logged in as:', parsedPayload.firstname); // Log the first name to console

      // Set the user state with the token and payload
      setUser({
        token,
        ...parsedPayload, // Spread the payload information (e.g., user ID, firstname)
      });
    }
  }, []);

  const login = (token: string, payload: any) => {
    // Save the token and payload in cookies
    Cookies.set('token', token, {
      expires: 7, // Token expires in 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    // Optionally save the payload in cookies as well if you want to persist it
    Cookies.set('payload', JSON.stringify(payload), {
      expires: 7, // Sync payload with token expiration
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    console.log('Logged in as:', payload.firstname); // Log the first name to console

    // Set the user state with the token and payload data
    setUser({
      token,
      ...payload, // Spread the payload (e.g., user ID, firstname)
    });

    router.push('/'); // Redirect user to profile page after login
  };

  const logout = () => {
    // Clear the JWT token and payload from cookies
    Cookies.remove('token');
    Cookies.remove('payload');
    setUser(null);
    router.push('/'); // Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};