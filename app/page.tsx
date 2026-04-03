import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RegionCard, DestinationCard } from "@/components/Cards";

export default function Home() {
  const regions = [
    {
      title: "Littoral Region",
      description: "Home to Douala, the economic capital, and beautiful coastal towns like Kribi with its unique Lobe Waterfalls.",
      image: "/kribi.png"
    },
    {
      title: "Far North Region",
      description: "Discover the breathtaking Waza National Park, home to diverse wildlife and cultural heritage like Lake Chad.",
      image: "/waza.png"
    },
    {
      title: "South West Region",
      description: "Witness the majestic Mount Cameroon and explore the lush botanical gardens of Limbe.",
      image: "/hero-bg.png"
    }
  ];

  const destinations = [
    {
      title: "Lobe Waterfalls",
      description: "The only place in Africa where a waterfall empties directly into the Atlantic Ocean beach.",
      image: "/kribi.png",
      category: "Beach & Nature",
      price: "from $45"
    },
    {
      title: "Waza National Park",
      description: "One of the most famous wildlife parks in Central Africa, perfect for safaris and birdwatching.",
      image: "/waza.png",
      category: "Wildlife Safari",
      price: "from $120"
    },
    {
      title: "Mount Cameroon",
      description: "An active volcano and the highest peak in West Africa, offering challenging and scenic hiking.",
      image: "/hero-bg.png",
      category: "Adventure",
      price: "from $85"
    }
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt="Cameroon Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-neutral-black/40 backdrop-blur-[2px]" />
        
        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          <span className="bg-accent/90 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in shadow-xl backdrop-blur-sm">
            ✨ EXPLORE AFRICA IN MINIATURE
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl leading-tight">
            Discover the Heart of <span className="text-primary-light bg-clip-text text-transparent bg-gradient-to-r from-white to-accent">Cameroon</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed drop-shadow-md">
            From the peak of Mt. Cameroon to the golden sands of Kribi, embark on a journey through 
            Cameroon's breathtaking landscapes and vibrant cultures.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button variant="primary" size="lg" className="shadow-2xl">Start Your Journey</Button>
            <Button variant="ghost" size="lg" className="bg-white/10 text-white hover:bg-white/20 glass border-0 backdrop-blur-md">Explore Regions</Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs font-medium tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* Regions Preview Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">Diversity Redefined</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-neutral-black mb-6">Explore Our 10 Regions</h3>
            <p className="text-neutral-medium text-lg leading-relaxed">
              Every region tells a different story. Experience the unique fusion of culture, nature, and history across the entire nation.
            </p>
          </div>
          <Button variant="outline">View All Regions</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {regions.map((region, index) => (
            <RegionCard key={index} {...region} />
          ))}
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="bg-neutral-light/50 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] bg-neutral-black/5 group">
             {/* Map Placeholder Graphic */}
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/5 p-12">
               <div className="relative w-full h-full border-2 border-primary/20 border-dashed rounded-2xl flex flex-col items-center justify-center glass group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-black mb-4">Interactive Discovery</h4>
                  <p className="text-neutral-medium text-center max-w-xs mb-8">
                    Pinpoint the best spots and plan your route with our real-time interactive map of Cameroon.
                  </p>
                  <Button variant="primary">Launch Experience</Button>
               </div>
             </div>
          </div>
          
          <div className="flex flex-col items-start">
             <h2 className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">Precision Planning</h2>
             <h3 className="text-4xl md:text-5xl font-bold text-neutral-black mb-8 leading-tight">Your Map to the Hidden Gems</h3>
             <p className="text-neutral-medium text-lg leading-relaxed mb-10">
               Discover over 500+ attractions with detailed guides, weather forecasts, and local expert tips. 
               Our map doesn't just show locations – it tells you when to visit and how to maximize your stay.
             </p>
             <div className="grid grid-cols-2 gap-8 w-full mb-10">
               <div className="p-4 rounded-xl bg-white shadow-premium">
                 <p className="text-3xl font-bold text-primary mb-1">500+</p>
                 <p className="text-neutral-medium text-sm">Destinations</p>
               </div>
               <div className="p-4 rounded-xl bg-white shadow-premium">
                 <p className="text-3xl font-bold text-accent mb-1">24/7</p>
                 <p className="text-neutral-medium text-sm">Local Support</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">Must-See Spots</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-neutral-black mb-6">Unforgettable Experiences</h3>
          <p className="text-neutral-medium text-lg">Handpicked destinations that should be on every traveler's bucket list while visiting Kamer.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {destinations.map((dest, index) => (
            <DestinationCard key={index} {...dest} />
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <Button variant="outline" size="lg">Explore All Destinations</Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative rounded-[2.5rem] bg-neutral-black py-20 px-8 md:px-20 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-8 relative z-10">Ready to Discover <br />the Real Cameroon?</h2>
          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Join thousands of travelers who have found their perfect Cameroonian adventure with VisitKamer.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Button variant="primary" size="lg" className="bg-primary hover:bg-primary-dark">Create Your Account</Button>
            <Button variant="ghost" size="lg" className="text-white border-2 border-white/20 hover:bg-white/10">Read Guest Stories</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
