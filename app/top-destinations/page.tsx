"use client";

import { useState, useEffect } from "react";
import { getFeaturedSites, type TouristSite } from "@/lib/data";
import { DestinationCard } from "@/components/Cards";

export default function TopDestinationsPage() {
  const [sites, setSites] = useState<TouristSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedSites().then(data => {
      setSites(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="py-20 px-6 text-center" style={{ background: "var(--bg-subtle)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-primary font-bold tracking-widest text-xs uppercase mb-3">Trending</p>
          <h1 className="text-5xl font-extrabold mb-5" style={{ color: "var(--text-base)" }}>
            Top Destinations
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Discover the most highly-rated and spectacular sites across all regions of Cameroon.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl animate-pulse" style={{ background: "var(--bg-subtle)" }} />
            ))}
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl font-semibold mb-2" style={{ color: "var(--text-base)" }}>No featured sites found</p>
            <p style={{ color: "var(--text-muted)" }}>Check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sites.map(site => (
              <DestinationCard
                key={site.id}
                id={site.id}
                title={site.name}
                description={site.description}
                image={site.image_url || '/placeholder.jpg'}
                price={site.price_per_person === 0 ? "Free" : `$${site.price_per_person}`}
                category="Featured"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
