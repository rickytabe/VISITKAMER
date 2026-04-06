"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCityById, getSitesByCity, getRegionById, type City, type TouristSite, type Region } from "@/lib/data";
import { ArrowLeft, MapPin, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CityPage() {
  const params = useParams();
  const id = params.id as string;
  const [city, setCity] = useState<City | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [sites, setSites] = useState<TouristSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const cityData = await getCityById(id);
      if (!cityData) return;
      setCity(cityData);
      const [siteList, reg] = await Promise.all([
        getSitesByCity(id),
        getRegionById(cityData.region_id),
      ]);
      setSites(siteList);
      if (reg) setRegion(reg);
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-64 flex items-end overflow-hidden">
        {city?.image_url && (
          <Image src={city.image_url} alt={city.name} fill className="object-cover" />
        )}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.1) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8 w-full">
          {!loading && region && (
            <Link href={`/regions/${region.id}`}
              className="inline-flex items-center gap-2 mb-4 text-white/60 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />{region.name} Region
            </Link>
          )}
          {loading ? (
            <div className="h-10 w-52 rounded-lg animate-pulse bg-white/20" />
          ) : (
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">{city?.name}</h1>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ background: "var(--bg-subtle)" }} />
            ))}
          </div>
        ) : (
          <>
            <div className="max-w-3xl mb-12">
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {city?.description}
              </p>
              {city?.latitude && (
                <p className="mt-3 text-sm font-mono flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {city.latitude.toFixed(4)}°N, {city.longitude?.toFixed(4)}°E
                </p>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-base)" }}>
              Tourist Sites in {city?.name}
            </h2>

            {sites.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-semibold mb-2" style={{ color: "var(--text-base)" }}>No sites listed yet</p>
                <p style={{ color: "var(--text-muted)" }}>Check back soon for upcoming attractions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {sites.map(site => (
                  <Link key={site.id} href={`/sites/${site.id}`} className="group block">
                    <div
                      className="overflow-hidden rounded-2xl shadow-premium transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: "var(--bg-card)" }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image src={site.image_url || '/placeholder.jpg'} alt={site.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        {site.is_featured && (
                          <span className="absolute top-3 left-3 flex items-center gap-1 text-xs font-bold text-white px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(249,168,37,0.9)" }}>
                            <Star className="w-3 h-3" fill="white" />Featured
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-base)" }}>{site.name}</h3>
                        <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>{site.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-primary font-bold text-sm">
                            <DollarSign className="w-3.5 h-3.5" />
                            {site.price_per_person === 0 ? "Free" : `${site.price_per_person} / person`}
                          </span>
                          <span className="text-primary text-xs font-semibold group-hover:underline">Details →</span>
                        </div>
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
