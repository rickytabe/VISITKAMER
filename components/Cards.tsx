import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';

interface CardProps {
  title: string;
  description: string;
  image: string;
  category?: string;
  price?: string;
}

export const RegionCard = ({ title, description, image }: CardProps) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-premium transition-transform duration-500 hover:-translate-y-2">
    <div className="relative h-64 w-full overflow-hidden">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-4 left-6">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      <p className="text-neutral-medium text-sm line-clamp-3 mb-6 leading-relaxed">
        {description}
      </p>
      <Button variant="ghost" size="sm" className="px-0 py-0 hover:bg-transparent hover:text-primary">
        Explore Region →
      </Button>
    </div>
  </div>
);

export const DestinationCard = ({ title, description, image, category, price }: CardProps) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-premium transition-transform duration-500 hover:-translate-y-2 flex flex-col h-full">
    <div className="relative h-56 w-full overflow-hidden">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      {category && (
        <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-bold text-primary backdrop-blur-md">
          {category}
        </span>
      )}
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-neutral-black tracking-tight">{title}</h3>
        {price && <span className="text-primary font-bold">{price}</span>}
      </div>
      <p className="text-neutral-medium text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="mt-auto pt-4 border-t border-neutral-light">
        <Button variant="primary" size="sm" className="w-full">
          Book Now
        </Button>
      </div>
    </div>
  </div>
);
