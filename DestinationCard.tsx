import React from 'react';
import { Destination } from '../types';
import { PlacesWidget } from './PlacesWidget';
import { Star, Clock, Calendar, Sparkles, MapPin, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  currency: string;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  currency,
  onSelect,
}) => {
  const {
    name,
    stateOrCountry,
    tagline,
    vibe,
    matchScore,
    searchQuery,
    estimatedCost,
    bestTimeToVisit,
    travelDuration,
    keyHighlights,
    whyMatch,
  } = destination;

  // Formatting helper
  const formatAmount = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="group relative bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden hover:border-[#FF8A5C]/50 transition-all flex flex-col h-full shadow-2xl">
      {/* Card Header & Places Visual */}
      <div className="relative">
        <div className="p-5 bg-black/40 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#FF8A5C]" />
              <span>{stateOrCountry}</span>
            </div>
            <h3 className="font-display font-medium text-2xl text-white mt-0.5 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{name}</h3>
          </div>

          {/* Match Score Badge */}
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF8A5C]/20 text-[#FF8A5C] border border-[#FF8A5C]/30 font-mono text-xs font-bold shadow-sm">
              <Sparkles className="w-3 h-3 text-[#FF8A5C]" />
              {matchScore}% Match
            </span>
            <span className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-bold">{vibe}</span>
          </div>
        </div>

        {/* Live Google Places Image & Details */}
        <div className="px-4 pt-3 pb-1">
          <PlacesWidget query={searchQuery} destinationName={name} />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Tagline & Why Match */}
        <div>
          <p className="text-xs font-semibold text-[#FF8A5C] uppercase tracking-wider">{tagline}</p>
          <p className="text-xs text-white/70 mt-2 leading-relaxed italic bg-white/5 p-3 rounded-lg border border-white/5">
            "{whyMatch}"
          </p>
        </div>

        {/* Quick Details: Time & Travel */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#FF8A5C] shrink-0" />
            <div>
              <p className="text-[9px] uppercase text-white/40 font-bold tracking-wider">Best Time</p>
              <p className="font-medium text-white/90 truncate">{bestTimeToVisit}</p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF8A5C] shrink-0" />
            <div>
              <p className="text-[9px] uppercase text-white/40 font-bold tracking-wider">Travel Time</p>
              <p className="font-medium text-white/90 truncate">{travelDuration}</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Key Highlights</p>
          <div className="flex flex-wrap gap-1.5">
            {keyHighlights.map((hl, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 text-white/80 text-xs border border-white/10 font-medium"
              >
                <CheckCircle2 className="w-3 h-3 text-[#FF8A5C]" />
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Budget Breakdown Summary */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 mt-auto">
          <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 text-white/50 font-medium">
              <Wallet className="w-3.5 h-3.5 text-[#FF8A5C]" />
              Est. Total Cost
            </span>
            <span className="font-mono font-bold text-base text-[#FF8A5C]">
              {currency.split(' ')[0]} {formatAmount(estimatedCost.total)}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1 text-[10px] text-center text-white/50 font-mono">
            <div>
              <p className="text-[9px] text-white/30 uppercase">Travel</p>
              <p className="font-semibold text-white">₹{formatAmount(estimatedCost.breakdown.travel)}</p>
            </div>
            <div>
              <p className="text-[9px] text-white/30 uppercase">Stay</p>
              <p className="font-semibold text-white">₹{formatAmount(estimatedCost.breakdown.stay)}</p>
            </div>
            <div>
              <p className="text-[9px] text-white/30 uppercase">Food</p>
              <p className="font-semibold text-white">₹{formatAmount(estimatedCost.breakdown.food)}</p>
            </div>
            <div>
              <p className="text-[9px] text-white/30 uppercase">Activities</p>
              <p className="font-semibold text-white">₹{formatAmount(estimatedCost.breakdown.activities)}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full py-3 px-4 rounded-md bg-white/5 hover:bg-[#FF8A5C] text-white hover:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
        >
          <span>View Day-by-Day Itinerary</span>
          <ArrowRight className="w-4 h-4 text-[#FF8A5C] group-hover:text-black group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
