import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-neutral-black text-neutral-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-bold mb-6 block text-neutral-white">
            VisitKamer
          </Link>
          <p className="text-neutral-medium max-w-sm mb-8 leading-relaxed">
            The ultimate gateway to Cameroon’s tourism. Discover all 10 regions, book unforgettable experiences, and explore the "Africa in miniature".
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Explore</h4>
          <ul className="space-y-4">
            <li><Link href="/discover" className="text-neutral-medium hover:text-white transition-colors">Discover</Link></li>
            <li><Link href="/regions" className="text-neutral-medium hover:text-white transition-colors">All 10 Regions</Link></li>
            <li><Link href="/attractions" className="text-neutral-medium hover:text-white transition-colors">Destinations</Link></li>
            <li><Link href="/bookings" className="text-neutral-medium hover:text-white transition-colors">Interactive Map</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">About</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-neutral-medium hover:text-white transition-colors">Our Mission</Link></li>
            <li><Link href="/contact" className="text-neutral-medium hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="text-neutral-medium hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-neutral-medium hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-medium/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-medium text-sm">© {new Date().getFullYear()} VisitKamer. All rights reserved.</p>
        <div className="flex gap-6">
           <Link href="#" className="text-neutral-medium hover:text-white transition-colors">Instagram</Link>
           <Link href="#" className="text-neutral-medium hover:text-white transition-colors">Twitter</Link>
           <Link href="#" className="text-neutral-medium hover:text-white transition-colors">Facebook</Link>
        </div>
      </div>
    </footer>
  );
};
