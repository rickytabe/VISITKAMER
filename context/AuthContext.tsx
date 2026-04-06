"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Booking = {
  id: string;
  siteId: string;
  siteName: string;
  date: string;
  people: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  bookings: Booking[];
};

type AuthContextType = {
  user: User | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  cancelBooking: (bookingId: string) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('visitKamerAuth');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure legacy user records get a bookings array
        if (!parsedUser.bookings) parsedUser.bookings = [];
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data");
      }
    }
    setMounted(true);
  }, []);

  const login = async (name: string, email: string) => {
    setIsLoading(true);
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
    
    const loggedInUser: User = {
      name,
      email,
      avatar: initials,
      bookings: []
    };
    
    setUser(loggedInUser);
    localStorage.setItem('visitKamerAuth', JSON.stringify(loggedInUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('visitKamerAuth');
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'status'>) => {
    if (!user) return;
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substring(2, 9),
      status: 'confirmed' as const
    };
    const updatedUser: User = { ...user, bookings: [newBooking, ...user.bookings] };
    setUser(updatedUser);
    localStorage.setItem('visitKamerAuth', JSON.stringify(updatedUser));
  };

  const cancelBooking = (bookingId: string) => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      bookings: user.bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      )
    };
    setUser(updatedUser);
    localStorage.setItem('visitKamerAuth', JSON.stringify(updatedUser));
  };

  // Prevent hydration mismatch by not rendering provider content until local storage is checked
  if (!mounted) {
    return <div className="min-h-screen bg-transparent" />; // Invisible placeholder during hydration
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, addBooking, cancelBooking, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
