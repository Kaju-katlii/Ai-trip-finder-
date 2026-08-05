import React from 'react';
import { ArrowRight, Sparkles, MapPin, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 bg-[#050505]">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
          alt="Mountain range at sunrise"
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Decorative SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
      >
        <path
          d="M -50 550 C 250 480, 350 250, 620 260 S 1050 120, 1260 40"
          fill="none"
          stroke="#FF8A5C"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-16">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#FF8A5C] mb-6 border border-[#FF8A5C]/30 rounded-md px-3.5 py-1.5 backdrop-blur-md bg-[#FF8A5C]/10 font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8A5C]" />
          AI Itineraries · Google Places Integrated
        </div>

        <h1 className="font-display font-light text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.15] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Plan Your Perfect Trip <br className="hidden sm:block" />
          <span className="italic text-[#FF8A5C]">with AI & Places</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          Discover budget-friendly destinations curated by Gemini AI, enriched with live Google Places ratings, day-by-day itineraries, and interactive maps.
        </p>

        {/* Quick CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#planner"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-[#FF8A5C] text-black px-8 py-3.5 font-bold text-sm shadow-xl hover:bg-[#ff7b45] active:scale-95 transition-all"
          >
            Calculate Itinerary
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 text-white/80 px-8 py-3.5 font-medium text-sm hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            <Compass className="w-4 h-4 text-[#FF8A5C]" />
            How it works
          </a>
        </div>

        {/* Popular Tags */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-white/40 uppercase font-bold text-[10px] tracking-widest mr-1">Trending:</span>
          <a href="#planner" className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#FF8A5C]/50 transition-colors">
            🌴 Goa Beach
          </a>
          <a href="#planner" className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#FF8A5C]/50 transition-colors">
            🏰 Udaipur Lakes
          </a>
          <a href="#planner" className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#FF8A5C]/50 transition-colors">
            ⛰️ Gokarna Treks
          </a>
          <a href="#planner" className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#FF8A5C]/50 transition-colors">
            ☕ Lonavala Hills
          </a>
        </div>
      </div>
    </section>
  );
};
