import React, { useState } from 'react';
import { Destination, TripSearchParams } from '../types';
import { PlacesWidget } from './PlacesWidget';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Bookmark,
  Share2,
  Printer,
  Sparkles,
  DollarSign,
  Compass,
  Check,
  Star,
  ExternalLink,
} from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  searchParams: TripSearchParams;
  mapsApiKey: string;
  onClose: () => void;
  onSaveTrip: (dest: Destination) => void;
  isSaved: boolean;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  searchParams,
  mapsApiKey,
  onClose,
  onSaveTrip,
  isSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'map'>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!destination) return null;

  const {
    name,
    stateOrCountry,
    vibe,
    tagline,
    matchScore,
    estimatedCost,
    itinerary,
    coordinates,
    bestTimeToVisit,
    travelDuration,
    keyHighlights,
  } = destination;

  const defaultCenter = coordinates || { lat: 15.2993, lng: 74.124 }; // Fallback lat/lng

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative bg-[#0A0A0A] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 my-auto flex flex-col max-h-[92vh]">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#050505] text-white px-6 py-5 z-20 flex items-center justify-between border-b border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF8A5C]/10 text-[#FF8A5C] border border-[#FF8A5C]/20 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{stateOrCountry}</span>
                <span className="px-2 py-0.5 rounded bg-[#FF8A5C]/20 text-[#FF8A5C] border border-[#FF8A5C]/30 text-[10px] font-mono font-bold">
                  {matchScore}% Match
                </span>
              </div>
              <h2 className="font-display font-medium text-2xl text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Trip Button */}
            <button
              onClick={() => onSaveTrip(destination)}
              className={`px-3 py-2 rounded-lg border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-400 text-emerald-400' : 'text-[#FF8A5C]'}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share Link */}
            <button
              onClick={handleCopyShare}
              className="p-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex p-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold"
              title="Print Itinerary"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#080808] border-b border-white/10 px-6 py-3 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'itinerary'
                  ? 'bg-[#FF8A5C] text-black shadow-sm'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              🗓️ Day-by-Day Itinerary ({itinerary.length} Days)
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'map'
                  ? 'bg-[#FF8A5C] text-black shadow-sm'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              🗺️ Interactive Google Map
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-white/60">
            <span>
              Total Est. Cost:{' '}
              <strong className="text-[#FF8A5C] font-mono text-sm">
                {searchParams.currency.split(' ')[0]} {estimatedCost.total.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              {/* Day selector pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {itinerary.map((dayObj) => (
                  <button
                    key={dayObj.day}
                    onClick={() => setSelectedDay(dayObj.day)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                      selectedDay === dayObj.day
                        ? 'bg-[#FF8A5C] text-black border-[#FF8A5C] shadow-md'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>Day {dayObj.day}</span>
                    <span className="opacity-80 font-normal">· {dayObj.theme}</span>
                  </button>
                ))}
              </div>

              {/* Day details */}
              {itinerary
                .filter((d) => d.day === selectedDay)
                .map((dayObj) => (
                  <div key={dayObj.day} className="space-y-4">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-white flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8A5C]">
                          Day {dayObj.day} Schedule
                        </span>
                        <h4 className="font-display font-medium text-xl text-white mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>{dayObj.title}</h4>
                      </div>
                      <span className="px-3 py-1 rounded bg-white/5 text-white/70 text-xs font-mono border border-white/10">
                        Theme: {dayObj.theme}
                      </span>
                    </div>

                    {/* Timeline Activities */}
                    <div className="space-y-4 relative pl-4 border-l-2 border-white/10 ml-2">
                      {dayObj.activities.map((act, actIdx) => (
                        <div key={actIdx} className="relative group">
                          {/* Timeline node icon */}
                          <div className="absolute -left-[25px] top-3 w-4 h-4 rounded-full bg-[#FF8A5C] border-2 border-[#0A0A0A] shadow-sm" />

                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="inline-block px-2.5 py-0.5 rounded bg-white/10 text-[#FF8A5C] text-[10px] font-mono font-bold uppercase tracking-wider">
                                  {act.time}
                                </span>
                                <h5 className="font-display font-medium text-base text-white mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                                  {act.title}
                                </h5>
                              </div>
                              <span className="text-xs font-mono font-semibold text-[#FF8A5C] bg-[#FF8A5C]/10 px-2.5 py-1 rounded border border-[#FF8A5C]/20">
                                {act.estimatedCost}
                              </span>
                            </div>

                            <p className="text-xs text-white/70 leading-relaxed">{act.description}</p>

                            {/* Google Places Live Widget */}
                            <div className="pt-1">
                              <PlacesWidget query={act.placeSearchQuery || `${act.title} ${name}`} compact={false} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Trip Itemized Budget Cards */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-display font-medium text-base text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>Itemized Estimated Cost Breakdown</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Transport</p>
                    <p className="font-mono font-bold text-lg text-[#FF8A5C] mt-1">
                      {searchParams.currency.split(' ')[0]} {estimatedCost.breakdown.travel.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Stay / Hotel</p>
                    <p className="font-mono font-bold text-lg text-[#FF8A5C] mt-1">
                      {searchParams.currency.split(' ')[0]} {estimatedCost.breakdown.stay.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Food & Dining</p>
                    <p className="font-mono font-bold text-lg text-[#FF8A5C] mt-1">
                      {searchParams.currency.split(' ')[0]} {estimatedCost.breakdown.food.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Sightseeing</p>
                    <p className="font-mono font-bold text-lg text-[#FF8A5C] mt-1">
                      {searchParams.currency.split(' ')[0]} {estimatedCost.breakdown.activities.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Google Map Tab */}
          {activeTab === 'map' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-display font-medium text-lg" style={{ fontFamily: 'Georgia, serif' }}>Interactive Destination Map</h4>
                  <p className="text-xs text-white/50">Explore points of interest in {name} with Google Maps</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-md bg-[#FF8A5C] text-black text-xs font-bold hover:bg-[#ff7b45] transition-colors flex items-center gap-1.5"
                >
                  <span>Open Full Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {mapsApiKey ? (
                <div className="h-[450px] w-full rounded-xl overflow-hidden border border-white/10 shadow-md">
                  <APIProvider apiKey={mapsApiKey} version="weekly">
                    <Map
                      defaultCenter={defaultCenter}
                      defaultZoom={11}
                      mapId="WAYFARE_DESTINATION_MAP"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <AdvancedMarker
                        position={defaultCenter}
                        onClick={() => setActiveMarker(name)}
                      >
                        <Pin background="#FF8A5C" glyphColor="#000000" borderColor="#ffffff" />
                      </AdvancedMarker>

                      {activeMarker && (
                        <InfoWindow position={defaultCenter} onCloseClick={() => setActiveMarker(null)}>
                          <div className="p-2 text-black space-y-1">
                            <h5 className="font-bold text-sm">{name}</h5>
                            <p className="text-xs text-gray-600">{vibe}</p>
                          </div>
                        </InfoWindow>
                      )}
                    </Map>
                  </APIProvider>
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center space-y-3">
                  <div className="p-3 rounded-lg bg-[#FF8A5C]/10 text-[#FF8A5C] w-12 h-12 mx-auto flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-white text-base">Google Maps API Key Needed</h5>
                  <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                    To render interactive maps directly in this view, please add your Google Maps API key via the key icon in the navigation bar.
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-[#FF8A5C] text-black font-bold text-xs hover:bg-[#ff7b45] transition-colors"
                  >
                    View {name} directly on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#050505] border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-white/40">
            Trip for {searchParams.people} person(s) · {searchParams.days} Days from {searchParams.startCity}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            Close Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};
