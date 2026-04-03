import React from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md shadow-glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:opacity-80 transition-opacity">
            VisitKamer
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/discover" className="text-neutral-medium hover:text-primary transition-colors font-medium">Discover</Link>
          <Link href="/regions" className="text-neutral-medium hover:text-primary transition-colors font-medium">Regions</Link>
          <Link href="/attractions" className="text-neutral-medium hover:text-primary transition-colors font-medium">Destinations</Link>
          <Link href="/bookings" className="text-neutral-medium hover:text-primary transition-colors font-medium">Book Trips</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-neutral-medium hover:text-neutral-black transition-colors font-medium">Sign In</Link>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};
