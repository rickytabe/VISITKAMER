"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getRegionById, getCitiesByRegion, type Region, type City } from "@/lib/data";
import { ArrowLeft, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [region, setRegion] = useState<Region | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [reg, cityList] = await Promise.all([
        getRegionById(id),
        getCitiesByRegion(id),
      ]);
      if (!reg) return;
      setRegion(reg);
      setCities(cityList);
      setLoading(false);
    };
    load();
  }, [id]);

  if (!loading && !region) return notFound();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-72 flex items-end overflow-hidden">
        {region?.image_url && (
          <Image src={region.image_url} alt={region.name} fill className="object-cover" />
        )}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <Link href="/regions" className="inline-flex items-center gap-2 mb-6 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Regions
          </Link>
          {loading ? (
            <div className="h-10 w-64 rounded-lg animate-pulse bg-white/20" />
          ) : (
            <>
              <p className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Cameroon</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">{region?.name} Region</h1>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: "var(--bg-subtle)" }} />)}
          </div>
        ) : (
          <>
            {/* About */}
            <div className="max-w-3xl mb-14">
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {region?.description}
              </p>
            </div>

            {/* Cities */}
            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-base)" }}>
              <span className="inline-flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Cities in {region?.name}
              </span>
            </h2>

            {cities.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No cities listed for this region yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map(city => (
                  <Link key={city.id} href={`/cities/${city.id}`} className="group block">
                    <div
                      className="rounded-2xl p-6 shadow-premium transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: "var(--bg-card)" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold" style={{ color: "var(--text-base)" }}>{city.name}</h3>
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                        {city.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                          {city.latitude?.toFixed(2)}°N, {city.longitude?.toFixed(2)}°E
                        </span>
                        <span className="text-primary text-sm font-semibold group-hover:underline">View →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
