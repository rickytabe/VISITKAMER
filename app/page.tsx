"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { RegionCard, DestinationCard } from "@/components/Cards";
import { getRegions, getFeaturedSites, type Region, type TouristSite } from "@/lib/data";

const heroImages = [
  "https://i.pinimg.com/1200x/07/e3/0a/07e30a643c049d44bda0faf1dc0e9486.jpg", // Southwest
  "https://i.pinimg.com/1200x/52/78/22/527822597ac14b1d6251626d42b2edbb.jpg", // Littoral
  "https://i.pinimg.com/1200x/ef/e6/c6/efe6c6f49c6c2f6d37790789160400cf.jpg", // South
  "https://i.pinimg.com/1200x/f7/f0/28/f7f0289cbb8950c11e86ce1d53c00741.jpg", // Northwest
  "https://i.pinimg.com/736x/61/60/3e/61603ef9854604c4c805868d5c424a67.jpg", // North
];

export default function Home() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [featuredSites, setFeaturedSites] = useState<TouristSite[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [loadingSites, setLoadingSites] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [regionsData, sitesData] = await Promise.all([
          getRegions(),
          getFeaturedSites()
        ]);
        setRegions(regionsData.slice(0, 3));
        setFeaturedSites(sitesData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoadingRegions(false);
        setLoadingSites(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative h-[90vh] flex items-center justify-center px-6 overflow-hidden bg-[#0d1a0e]">
        {heroImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="Cameroon landscape"
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={idx === 0}
          />
        ))}
        <div className="absolute inset-0 bg-black/60 " />

        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          <span className="bg-accent/90 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-xl">
            ✨ EXPLORE AFRICA IN MINIATURE
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight drop-shadow-2xl shadow-white ">
            Discover the Heart of{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-accent to-primary">
              Cameroon
            </span>
          </h1>
          <p className="text-white/85 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
            From the peak of Mt. Cameroon to the golden sands of Kribi, embark on a journey through
            breathtaking landscapes and vibrant cultures.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/regions">
              <Button variant="primary" size="lg" className="shadow-2xl">Start Your Journey</Button>
            </Link>
            <Link href="/top-destinations">
              <Button variant="ghost" size="lg" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-md">
                Top Destinations
              </Button>
            </Link>
          </div>
        </div>

      </section>

      {/* ── REGIONS ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-primary font-bold tracking-widest text-xs mb-3 uppercase">Diversity Redefined</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-base)" }}>
              Explore Our 10 Regions
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Every region tells a different story. Experience the unique fusion of culture, nature, and history.
            </p>
          </div>
          <Link href="/regions">
            <Button variant="outline">View All Regions</Button>
          </Link>
        </div>

        {loadingRegions ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl animate-pulse" style={{ background: "var(--bg-subtle)" }} />
            ))}
          </div>
        ) : regions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regions.map((region) => (
              <RegionCard
                key={region.id}
                id={region.id}
                title={region.name}
                description={region.description}
                image={region.image_url}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>No regions found.</p>
        )}
      </section>

      {/* ── MAP PREVIEW ────────────────────────────────── */}
      <section className="py-24 px-6 overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[460px] group">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10 p-10">
              <div className="w-full h-full border-2 border-primary/20 border-dashed rounded-2xl flex flex-col items-center justify-center glass group-hover:scale-[1.02] transition-transform duration-700 p-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-base)" }}>Interactive Discovery</h3>
                <p className="text-center max-w-xs mb-8 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Pinpoint the best spots and plan your route with our interactive map of Cameroon.
                </p>
                <Button variant="primary">Launch Map</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-primary font-bold tracking-widest text-xs mb-3 uppercase">Precision Planning</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--text-base)" }}>
              Your Map to the Hidden Gems
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
              Discover 50+ attractions with detailed guides and local expert tips.
              Our map tells you exactly when to visit and how to maximize your stay.
            </p>
            <div className="grid grid-cols-2 gap-6 w-full">
              {[
                { value: "50+", label: "Destinations", color: "text-primary" },
                { value: "10", label: "Regions", color: "text-primary" },
                { value: "30+", label: "Cities", color: "text-accent" },
                { value: "24/7", label: "Local Support", color: "text-accent" },
              ].map(stat => (
                <div key={stat.label} className="p-5 rounded-2xl shadow-premium" style={{ background: "var(--bg-card)" }}>
                  <p className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-primary font-bold tracking-widest text-xs mb-3 uppercase">Must-See Spots</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-base)" }}>
            Unforgettable Experiences
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Handpicked destinations every traveler should include in their Cameroon itinerary.
          </p>
        </div>

        {loadingSites ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] rounded-2xl animate-pulse" style={{ background: "var(--bg-subtle)" }} />
            ))}
          </div>
        ) : featuredSites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSites.map((site) => (
              <DestinationCard
                key={site.id}
                id={site.id}
                title={site.name}
                description={site.description}
                image={site.image_url}
                category="Featured"
                price={`$${site.price_per_person}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>No destinations found.</p>
        )}

        <div className="mt-16 text-center">
          <Link href="/top-destinations">
            <Button variant="outline" size="lg">Explore All Destinations</Button>
          </Link>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative rounded-[2rem] bg-[#0d1a0e] py-20 px-8 md:px-20 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/25 rounded-full blur-[120px] -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[120px] -ml-36 -mb-36 pointer-events-none" />
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 relative z-10">
            Ready to Discover the Real Cameroon?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
            Join thousands of travelers who found their perfect Cameroonian adventure with VisitKamer.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
            <Link href="/login">
              <Button variant="primary" size="lg">Create Your Account</Button>
            </Link>
            <Link href="/top-destinations">
              <Button variant="ghost" size="lg" className="text-white border border-white/20 hover:bg-white/10">
                View Top Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
