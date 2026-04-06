"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const navLinks = [
  { name: 'Discover', href: '/' },
  { name: 'Regions', href: '/regions' },
  { name: 'Top Sites', href: '/top-destinations' },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const isDark = mounted && resolvedTheme === 'dark';

  const navBg = isDark
    ? 'rgba(15, 15, 15, 0.82)'
    : 'rgba(255, 255, 255, 0.82)';

  const mobileBg = isDark ? '#1A1A1A' : '#FFFFFF';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: navBg,
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group shrink-0">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:opacity-80 transition-opacity">
            VisitKamer
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: pathname === link.href ? 'var(--primary)' : 'var(--text-muted)' }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div
            className="hidden md:flex items-center gap-3 pl-3"
            style={{ borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}
          >
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0 transition-transform hover:scale-105 hover:bg-primary/25" title="Go to Dashboard">
                  {user.avatar}
                </Link>
                <span className="text-sm font-medium hidden lg:block" style={{ color: 'var(--text-base)' }}>
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-full transition-colors hover:bg-red-50"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4 text-secondary" />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: mobileBg,
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-base font-medium rounded-lg transition-colors hover:text-primary"
                style={{ color: pathname === link.href ? 'var(--primary)' : 'var(--text-base)' }}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-3" style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}` }} />

            <div className="flex items-center justify-between py-2 px-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Theme</span>
              <ThemeToggle />
            </div>

            {user ? (
              <div className="flex flex-col gap-3 pt-3">
                <Link href="/dashboard" className="flex items-center gap-3 px-2 group transition-opacity hover:opacity-80">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold group-hover:bg-primary/25 transition-colors">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--text-base)' }}>{user.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Dashboard & Settings</p>
                  </div>
                </Link>
                <Button variant="outline" onClick={logout} className="w-full mt-1">Sign Out</Button>
              </div>
            ) : (
              <Link href="/login" className="w-full mt-3 block">
                <Button variant="primary" className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
