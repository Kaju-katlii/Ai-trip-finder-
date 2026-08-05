import React, { useState, useEffect } from 'react';
import { Plane, Key, Bookmark, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  hasMapsKey: boolean;
  savedTripsCount: number;
  onOpenSavedTrips: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApiKeyModal,
  hasMapsKey,
  savedTripsCount,
  onOpenSavedTrips,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 border-b border-white/10 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md shadow-2xl py-3.5'
          : 'bg-black/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-3 font-display text-xl font-bold text-white tracking-tighter group">
          <div className="w-8 h-8 rounded-lg bg-[#FF8A5C] text-black flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
          <span className="text-white tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>WAYFARE</span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-white/50">
          <a href="#planner" className="hover:text-[#FF8A5C] transition-colors">Trip Parameters</a>
          <a href="#how" className="hover:text-[#FF8A5C] transition-colors">How it Works</a>
          <a href="#results" className="hover:text-[#FF8A5C] transition-colors">Destinations</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Saved Trips Toggle */}
          <button
            onClick={onOpenSavedTrips}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider font-semibold border border-white/10 transition-all"
            title="View Saved Trip Plans"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#FF8A5C]" />
            <span className="hidden sm:inline">Saved</span>
            {savedTripsCount > 0 && (
              <span className="w-4 h-4 rounded bg-[#FF8A5C] text-black text-[10px] font-bold flex items-center justify-center">
                {savedTripsCount}
              </span>
            )}
          </button>

          {/* API Key Status Indicator */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              hasMapsKey
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-[#FF8A5C]/10 text-[#FF8A5C] border-[#FF8A5C]/30 hover:bg-[#FF8A5C]/20'
            }`}
            title="Configure Google Maps API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{hasMapsKey ? 'Maps Connected' : 'Setup Maps API'}</span>
          </button>

          {/* Start Planning CTA */}
          <a
            href="#planner"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#FF8A5C] hover:bg-[#ff7b45] text-black px-4 py-2 text-xs font-bold transition-all active:scale-95 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Plan Trip
          </a>
        </div>
      </div>
    </header>
  );
};
