import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/Button';

interface CardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  price?: string;
}

export const RegionCard = ({ id, title, description, image }: CardProps) => (
  <Link href={id ? `/regions/${id}` : '/regions'} className="block group">
    <div
      className="relative overflow-hidden rounded-2xl shadow-premium transition-transform duration-500 hover:-translate-y-2"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm line-clamp-3 mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
        <span className="text-primary text-sm font-semibold group-hover:underline">
          Explore Region →
        </span>
      </div>
    </div>
  </Link>
);

export const DestinationCard = ({ id, title, description, image, category, price }: CardProps) => (
  <div
    className="group relative overflow-hidden rounded-2xl shadow-premium transition-transform duration-500 hover:-translate-y-2 flex flex-col h-full"
    style={{ background: "var(--bg-card)" }}
  >
    <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {category && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md text-white"
          style={{ background: "rgba(46,125,50,0.85)" }}>
          {category}
        </span>
      )}
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-base)" }}>{title}</h3>
        {price && <span className="text-primary font-bold text-sm ml-2 shrink-0">{price}</span>}
      </div>
      <p className="text-sm mb-5 leading-relaxed flex-grow" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>
      <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--border-base)" }}>
        <Link href={id ? `/sites/${id}` : '/top-destinations'}>
          <Button variant="primary" size="sm" className="w-full">Book Now</Button>
        </Link>
      </div>
    </div>
  </div>
);
