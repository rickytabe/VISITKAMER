import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer style={{ background: "#0d1a0e", color: "#F0F0F0" }} className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-bold mb-6 block text-white">
            VisitKamer
          </Link>
          <p className="max-w-sm mb-8 leading-relaxed" style={{ color: "rgba(240,240,240,0.6)" }}>
            The ultimate gateway to Cameroon's tourism. Discover all 10 regions, book unforgettable experiences, and explore the "Africa in miniature".
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Explore</h4>
          <ul className="space-y-4">
            {[
              { name: 'Discover', href: '/' },
              { name: 'All 10 Regions', href: '/regions' },
              { name: 'Top Destinations', href: '/top-destinations' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href}
                  className="transition-colors hover:text-white"
                  style={{ color: "rgba(240,240,240,0.5)" }}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">About</h4>
          <ul className="space-y-4">
            {[
              { name: 'Our Mission', href: '/about' },
              { name: 'Contact Us', href: '/contact' },
              { name: 'Terms of Service', href: '/terms' },
              { name: 'Sign In', href: '/login' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href}
                  className="transition-colors hover:text-white"
                  style={{ color: "rgba(240,240,240,0.5)" }}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-sm" style={{ color: "rgba(240,240,240,0.4)" }}>
          © {new Date().getFullYear()} VisitKamer. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Instagram', 'Twitter', 'Facebook'].map(s => (
            <Link key={s} href="#"
              className="text-sm transition-colors hover:text-white"
              style={{ color: "rgba(240,240,240,0.4)" }}>
              {s}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
