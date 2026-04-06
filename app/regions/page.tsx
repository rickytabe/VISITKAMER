"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRegions, type Region } from "@/lib/data";
import { MapPin, Search } from "lucide-react";

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [filtered, setFiltered] = useState<Region[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRegions().then(data => {
      setRegions(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!query.trim()) return setFiltered(regions);
    setFiltered(regions.filter(r => r.name.toLowerCase().includes(query.toLowerCase())));
  }, [query, regions]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="py-20 px-6 text-center" style={{ background: "var(--bg-subtle)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-primary font-bold tracking-widest text-xs uppercase mb-3">Africa in Miniature</p>
          <h1 className="text-5xl font-extrabold mb-5" style={{ color: "var(--text-base)" }}>
            All 10 Regions of Cameroon
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
            From savanna to rainforest, from coast to highlands — every region is a unique world.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search regions..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ background: "var(--bg-card)", color: "var(--text-base)", border: "1px solid var(--border-base)" }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-52 rounded-2xl animate-pulse" style={{ background: "var(--bg-subtle)" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl font-semibold mb-2" style={{ color: "var(--text-base)" }}>No regions found</p>
            <p style={{ color: "var(--text-muted)" }}>Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filtered.map((region, idx) => (
              <Link key={region.id} href={`/regions/${region.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl h-52 flex flex-col justify-end p-5 shadow-premium transition-transform duration-300 hover:-translate-y-1 group-hover:scale-[1.02]">
                    {region.image_url && (
                      <Image
                        src={region.image_url}
                        alt={region.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span className="text-accent text-xs font-bold">Region {idx + 1}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white leading-tight">{region.name}</h2>
                      <p className="text-white/80 text-xs mt-1 line-clamp-2">{region.description}</p>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
