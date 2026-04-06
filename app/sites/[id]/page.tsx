"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSiteById, getCityById, getRegionById, type TouristSite, type City, type Region } from "@/lib/data";
import { ArrowLeft, MapPin, Star, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function SiteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [site, setSite] = useState<TouristSite | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState(1);
  const [booked, setBooked] = useState(false);
  const { user, addBooking } = useAuth();

  useEffect(() => {
    const load = async () => {
      const siteData = await getSiteById(id);
      if (!siteData) return;
      setSite(siteData);
      const cityData = await getCityById(siteData.city_id);
      if (cityData) {
        setCity(cityData);
        const reg = await getRegionById(cityData.region_id);
        if (reg) setRegion(reg);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const total = site ? site.price_per_person * people : 0;

  const handleBook = () => {
    if (!user || !site) return;
    addBooking({
      siteId: site.id,
      siteName: site.name,
      date: new Date().toISOString(),
      people,
      totalPrice: total
    });
    setBooked(true);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative h-[55vh] overflow-hidden">
        {loading ? (
          <div className="w-full h-full animate-pulse" style={{ background: "var(--bg-subtle)" }} />
        ) : (
          <>
            <Image src={site?.image_url || '/placeholder.jpg'} alt={site?.name || ''} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </>
        )}
        <div className="absolute top-6 left-6 z-10">
          <Link href={city ? `/cities/${city.id}` : '/top-destinations'}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <ArrowLeft className="w-4 h-4" />Back
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <div className="max-w-7xl mx-auto">
            {!loading && (
              <>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-white/60 text-xs mb-3 flex-wrap">
                  {region && <><Link href={`/regions/${region.id}`} className="hover:text-white">{region.name}</Link><span>/</span></>}
                  {city && <><Link href={`/cities/${city.id}`} className="hover:text-white">{city.name}</Link><span>/</span></>}
                  <span className="text-white">{site?.name}</span>
                </div>
                <div className="flex items-start flex-wrap gap-3 mb-2">
                  {site?.is_featured && (
                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(249,168,37,0.9)", color: "white" }}>
                      <Star className="w-3 h-3" fill="white" />Featured
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">{site?.name}</h1>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: details */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-6 rounded animate-pulse" style={{ background: "var(--bg-subtle)" }} />)}
            </div>
          ) : (
            <>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
                {site?.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10">
                {[
                  { icon: <DollarSign className="w-5 h-5 text-primary" />, label: "Price", value: site?.price_per_person === 0 ? "Free Entry" : `$${site?.price_per_person} / person` },
                  { icon: <MapPin className="w-5 h-5 text-primary" />, label: "Location", value: city?.name || "—" },
                  { icon: <Star className="w-5 h-5 text-accent" />, label: "Status", value: site?.is_featured ? "Featured" : "Standard" },
                ].map(item => (
                  <div key={item.label} className="rounded-xl p-4 shadow-premium" style={{ background: "var(--bg-card)" }}>
                    <div className="flex items-center gap-2 mb-2">{item.icon}<span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{item.label}</span></div>
                    <p className="font-bold" style={{ color: "var(--text-base)" }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {site?.latitude && (
                <div className="rounded-xl p-5" style={{ background: "var(--bg-subtle)" }}>
                  <h3 className="font-bold mb-1" style={{ color: "var(--text-base)" }}>Coordinates</h3>
                  <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
                    {site.latitude.toFixed(6)}°N, {site.longitude?.toFixed(6)}°E
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl p-6 shadow-premium" style={{ background: "var(--bg-card)", border: "1px solid var(--border-base)" }}>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-8 rounded animate-pulse" style={{ background: "var(--bg-subtle)" }} />)}
              </div>
            ) : booked ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-7 h-7 text-primary" fill="currentColor" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-base)" }}>Booking Confirmed!</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Your spot for {people} {people === 1 ? 'person' : 'people'} at {site?.name} has been reserved.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text-base)" }}>Book This Experience</h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                  {site?.price_per_person === 0 ? "Free entry — just show up!" : `$${site?.price_per_person} per person`}
                </p>

                {site?.price_per_person !== 0 && (
                  <div className="mb-5">
                    <label className="text-sm font-semibold mb-2 block" style={{ color: "var(--text-base)" }}>
                      Number of People
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setPeople(Math.max(1, people - 1))}
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors hover:bg-primary/10"
                        style={{ background: "var(--bg-subtle)", color: "var(--text-base)" }}>−</button>
                      <span className="font-bold text-lg w-8 text-center" style={{ color: "var(--text-base)" }}>{people}</span>
                      <button onClick={() => setPeople(Math.min(20, people + 1))}
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors hover:bg-primary/10"
                        style={{ background: "var(--bg-subtle)", color: "var(--text-base)" }}>+</button>
                    </div>
                  </div>
                )}

                {site?.price_per_person !== 0 && (
                  <div className="flex justify-between items-center py-4 mb-5" style={{ borderTop: "1px solid var(--border-base)", borderBottom: "1px solid var(--border-base)" }}>
                    <span className="font-semibold" style={{ color: "var(--text-base)" }}>Total</span>
                    <span className="text-2xl font-bold text-primary">${total}</span>
                  </div>
                )}

                {user ? (
                  <Button variant="primary" className="w-full" size="lg" onClick={handleBook}>
                    {site?.price_per_person === 0 ? 'Reserve Free Spot' : `Book for $${total}`}
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>You need to be signed in to book.</p>
                    <Link href="/login">
                      <Button variant="primary" className="w-full">Sign In to Book</Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
