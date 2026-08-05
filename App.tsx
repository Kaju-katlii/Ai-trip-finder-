import React, { useState, useEffect } from 'react';
import { TripSearchParams, TripPlanResult, Destination } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PlannerForm } from './components/PlannerForm';
import { LoadingOverlay } from './components/LoadingOverlay';
import { DestinationCard } from './components/DestinationCard';
import { DestinationModal } from './components/DestinationModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SavedTripsDrawer } from './components/SavedTripsDrawer';
import { Sparkles, SlidersHorizontal, ArrowUpDown, AlertCircle, RefreshCw } from 'lucide-react';

const INITIAL_DEMO_PLAN: TripPlanResult = {
  summary: 'Curated 5 top budget-friendly destinations for 2 travelers from Mumbai with ₹15,000 budget.',
  searchParams: {
    startCity: 'Mumbai',
    budget: 15000,
    currency: 'INR (₹)',
    people: 2,
    days: 4,
    interests: ['Beaches', 'Foodie'],
  },
  destinations: [
    {
      id: 'goa-beach',
      name: 'North Goa',
      stateOrCountry: 'Goa, India',
      vibe: 'Beaches & Shacks',
      tagline: 'Sun-kissed beaches, coastal seafood & sunset shacks',
      matchScore: 98,
      searchQuery: 'Baga Beach Goa attractions',
      coordinates: { lat: 15.5527, lng: 73.7517 },
      estimatedCost: {
        total: 13800,
        breakdown: { travel: 3500, stay: 5200, food: 3200, activities: 1900 },
      },
      bestTimeToVisit: 'Nov - Feb',
      travelDuration: '8h train / 1.2h flight',
      keyHighlights: ['Baga & Anjuna Beach', 'Chapora Fort', 'Thalassa Sunset', 'Cashew Spice Farm'],
      whyMatch: 'Perfect balance of beach vibe and local coastal seafood within your ₹15,000 budget.',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & North Goa Beach Vibe',
          theme: 'Coastline Relaxation',
          activities: [
            {
              time: 'Morning',
              title: 'Check-in & Calangute Beach Walk',
              description: 'Arrive in North Goa, check into beach guesthouse and take a gentle stroll along Calangute shoreline.',
              placeSearchQuery: 'Calangute Beach Goa',
              estimatedCost: 'Free',
            },
            {
              time: 'Afternoon',
              title: 'Seafood Lunch at Souza Lobo',
              description: 'Enjoy traditional Goan Fish Curry Rice and butter garlic prawns at iconic beach restaurant.',
              placeSearchQuery: 'Souza Lobo Calangute Goa',
              estimatedCost: '₹900 for two',
            },
            {
              time: 'Evening',
              title: 'Sunset at Chapora Fort',
              description: 'Climb the historic Dil Chahta Hai fort for breathtaking panoramic views of Vagator Beach at sunset.',
              placeSearchQuery: 'Chapora Fort Vagator Goa',
              estimatedCost: 'Free',
            },
          ],
        },
        {
          day: 2,
          title: 'Water Sports & Night Market',
          theme: 'Adventure & Culture',
          activities: [
            {
              time: 'Morning',
              title: 'Parasailing & Jet Skiing at Baga Beach',
              description: 'Experience exhilarating watersports and dip in the gentle Arabian sea waves.',
              placeSearchQuery: 'Baga Beach Watersports Goa',
              estimatedCost: '₹1,200',
            },
            {
              time: 'Afternoon',
              title: 'Old Goa Heritage Basilica of Bom Jesus',
              description: 'Explore UNESCO heritage Portuguese baroque churches and historic cobbled streets.',
              placeSearchQuery: 'Basilica of Bom Jesus Old Goa',
              estimatedCost: 'Free entry',
            },
            {
              time: 'Evening',
              title: 'Anjuna Flea Market & Live Music Shack',
              description: 'Browse local handicrafts, silver jewelry, and relax at Curlies shack with live acoustic music.',
              placeSearchQuery: 'Curlies Beach Shack Anjuna Goa',
              estimatedCost: '₹800',
            },
          ],
        },
      ],
    },
    {
      id: 'gokarna-peace',
      name: 'Gokarna',
      stateOrCountry: 'Karnataka, India',
      vibe: 'Serene Beaches & Treks',
      tagline: 'Pristine trek beaches, cliffside cafes & tranquil spirituality',
      matchScore: 95,
      searchQuery: 'Om Beach Gokarna Karnataka',
      coordinates: { lat: 14.5479, lng: 74.3188 },
      estimatedCost: {
        total: 11500,
        breakdown: { travel: 2800, stay: 4200, food: 2800, activities: 1700 },
      },
      bestTimeToVisit: 'Oct - Mar',
      travelDuration: '11h overnight bus/train',
      keyHighlights: ['Om Beach', 'Kudle Beach Trek', 'Mahabaleshwar Temple', 'Namaste Cafe'],
      whyMatch: 'Ultra budget-friendly alternative to Goa with scenic cliff treks and serene beaches.',
      itinerary: [
        {
          day: 1,
          title: 'Kudle Beach & Sunset Cliff Views',
          theme: 'Relaxation & Coastal Views',
          activities: [
            {
              time: 'Morning',
              title: 'Check-in at Kudle Beach Shack',
              description: 'Arrive via overnight bus, settle in beachside bamboo cottages facing the sea waves.',
              placeSearchQuery: 'Kudle Beach Gokarna',
              estimatedCost: 'Free',
            },
            {
              time: 'Evening',
              title: 'Om Beach Trek & Namaste Cafe Dinner',
              description: 'Hike over the scenic headland to Om Beach and enjoy fresh woodfired pizza at Namaste Cafe.',
              placeSearchQuery: 'Namaste Cafe Om Beach Gokarna',
              estimatedCost: '₹600 for two',
            },
          ],
        },
      ],
    },
    {
      id: 'lonavala-khandala',
      name: 'Lonavala & Khandala',
      stateOrCountry: 'Maharashtra, India',
      vibe: 'Hills & Lakes',
      tagline: 'Mist-covered forts, roaring waterfalls & sweet chikki trails',
      matchScore: 91,
      searchQuery: 'Tiger Point Lonavala Maharashtra',
      coordinates: { lat: 18.7557, lng: 73.4091 },
      estimatedCost: {
        total: 9200,
        breakdown: { travel: 1200, stay: 4000, food: 2500, activities: 1500 },
      },
      bestTimeToVisit: 'Jul - Feb',
      travelDuration: '2.5h scenic train / drive',
      keyHighlights: ['Tiger Point', 'Bhushi Dam', 'Karla Caves', 'Maganlal Chikki'],
      whyMatch: 'Closest getaway from Mumbai saving transport budget for luxury stay & food.',
      itinerary: [
        {
          day: 1,
          title: 'Hill Station Vistas & Cave Exploration',
          theme: 'Scenic Views & History',
          activities: [
            {
              time: 'Morning',
              title: 'Scenic Express Train & Tiger Point Viewpoint',
              description: 'Hop on morning train from Mumbai to Lonavala and head straight to Tiger Point for valley views.',
              placeSearchQuery: 'Tiger Point Lonavala',
              estimatedCost: '₹300',
            },
          ],
        },
      ],
    },
    {
      id: 'udaipur-lakes',
      name: 'Udaipur',
      stateOrCountry: 'Rajasthan, India',
      vibe: 'Lakes & Palaces',
      tagline: 'City of lakes, royal palaces & romantic sunset boat rides',
      matchScore: 88,
      searchQuery: 'City Palace Udaipur Rajasthan',
      coordinates: { lat: 24.5854, lng: 73.7125 },
      estimatedCost: {
        total: 14600,
        breakdown: { travel: 4200, stay: 5000, food: 3400, activities: 2000 },
      },
      bestTimeToVisit: 'Oct - Mar',
      travelDuration: '14h train / 1.5h flight',
      keyHighlights: ['Lake Pichola', 'Udaipur City Palace', 'Jag Mandir', 'Saheliyon Ki Bari'],
      whyMatch: 'Regal heritage culture and scenic lake vistas fitting comfortably into budget.',
      itinerary: [
        {
          day: 1,
          title: 'Lake Pichola & City Palace Splendor',
          theme: 'Royal Heritage',
          activities: [
            {
              time: 'Morning',
              title: 'Explore Udaipur City Palace',
              description: 'Tour the grand majestic palace complex overlooking Lake Pichola.',
              placeSearchQuery: 'City Palace Udaipur',
              estimatedCost: '₹300 entry',
            },
          ],
        },
      ],
    },
    {
      id: 'mahabaleshwar-green',
      name: 'Mahabaleshwar',
      stateOrCountry: 'Maharashtra, India',
      vibe: 'Strawberry Valleys',
      tagline: 'Lush green plateaus, strawberry farms & Venna Lake boating',
      matchScore: 85,
      searchQuery: 'Venna Lake Mahabaleshwar',
      coordinates: { lat: 17.9237, lng: 73.6586 },
      estimatedCost: {
        total: 10800,
        breakdown: { travel: 1800, stay: 4500, food: 2700, activities: 1800 },
      },
      bestTimeToVisit: 'Oct - May',
      travelDuration: '5.5h scenic drive',
      keyHighlights: ['Mapro Garden', 'Venna Lake', 'Arthur Seat Point', 'Pratapgad Fort'],
      whyMatch: 'Cool climate, fresh strawberry treats and easy road connectivity.',
      itinerary: [
        {
          day: 1,
          title: 'Strawberry Farms & Lake Sunset',
          theme: 'Nature & Local Flavors',
          activities: [
            {
              time: 'Morning',
              title: 'Boating at Venna Lake',
              description: 'Enjoy a peaceful paddle boat ride surrounded by green pine trees.',
              placeSearchQuery: 'Venna Lake Mahabaleshwar',
              estimatedCost: '₹400',
            },
          ],
        },
      ],
    },
  ],
};

export default function App() {
  const [currentPlan, setCurrentPlan] = useState<TripPlanResult>(INITIAL_DEMO_PLAN);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [sortBy, setSortBy] = useState<'match' | 'cost-asc' | 'cost-desc'>('match');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Maps API Key state
  const [mapsApiKey, setMapsApiKey] = useState<string>(() => {
    return (
      process.env.GOOGLE_MAPS_PLATFORM_KEY ||
      (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
      localStorage.getItem('wayfare_maps_key') ||
      ''
    );
  });

  // Saved Trips state
  const [savedTrips, setSavedTrips] = useState<Destination[]>(() => {
    try {
      const stored = localStorage.getItem('wayfare_saved_trips');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wayfare_saved_trips', JSON.stringify(savedTrips));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [savedTrips]);

  const handleSaveMapsKey = (key: string) => {
    setMapsApiKey(key);
    localStorage.setItem('wayfare_maps_key', key);
  };

  const handleSaveTrip = (dest: Destination) => {
    setSavedTrips((prev) => {
      if (prev.some((d) => d.id === dest.id)) {
        return prev.filter((d) => d.id !== dest.id);
      }
      return [...prev, dest];
    });
  };

  const handleRemoveTrip = (id: string) => {
    setSavedTrips((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClearAllSaved = () => {
    setSavedTrips([]);
  };

  // Trigger Gemini Plan Generation
  const handlePlanTrip = async (params: TripSearchParams) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate trip suggestions.');
      }

      const data: TripPlanResult = await res.json();
      setCurrentPlan(data);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } catch (err: any) {
      console.error('Plan trip error:', err);
      setErrorMsg(err.message || 'Something went wrong while fetching travel recommendations.');
    } finally {
      setLoading(false);
    }
  };

  // Sort destinations logic
  const sortedDestinations = [...currentPlan.destinations].sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'cost-asc') return a.estimatedCost.total - b.estimatedCost.total;
    if (sortBy === 'cost-desc') return b.estimatedCost.total - a.estimatedCost.total;
    return 0;
  });

  const isCurrentSelectedSaved = selectedDestination
    ? savedTrips.some((d) => d.id === selectedDestination.id)
    : false;

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E5E5] font-body flex flex-col antialiased">
      {/* Sticky Header Navbar */}
      <Navbar
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasMapsKey={Boolean(mapsApiKey)}
        savedTripsCount={savedTrips.length}
        onOpenSavedTrips={() => setIsSavedDrawerOpen(true)}
      />

      {/* Hero Section */}
      <Hero />

      {/* How It Works Strip */}
      <HowItWorks />

      {/* Main Interactive Planner Form */}
      <PlannerForm onSubmit={handlePlanTrip} isLoading={loading} />

      {/* Error notification banner */}
      {errorMsg && (
        <div className="max-w-4xl mx-auto px-6 w-full -mt-4 mb-6">
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800/50 text-rose-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="px-3 py-1 rounded-md bg-rose-900/60 hover:bg-rose-900 text-rose-100 font-semibold text-xs transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay Modal */}
      <LoadingOverlay isVisible={loading} />

      {/* Results Section */}
      <section id="results" className="py-16 lg:py-24 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#FF8A5C] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8A5C]" />
                Curated by Wayfare AI
              </span>
              <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Your Top <span className="italic text-[#FF8A5C]">{currentPlan.destinations.length} Destination Matches</span>
              </h2>
              <p className="text-white/50 text-xs sm:text-sm mt-2 max-w-xl">
                {currentPlan.summary}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-white/5 p-1 rounded-lg border border-white/10">
              <span className="text-xs font-mono font-bold text-white/40 px-2 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#FF8A5C]" />
                Sort:
              </span>
              <button
                onClick={() => setSortBy('match')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  sortBy === 'match'
                    ? 'bg-[#FF8A5C] text-black shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Match Score
              </button>
              <button
                onClick={() => setSortBy('cost-asc')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  sortBy === 'cost-asc'
                    ? 'bg-[#FF8A5C] text-black shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Cost: Low to High
              </button>
              <button
                onClick={() => setSortBy('cost-desc')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  sortBy === 'cost-desc'
                    ? 'bg-[#FF8A5C] text-black shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Cost: High to Low
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedDestinations.map((destination) => (
              <DestinationCard
                key={destination.id || destination.name}
                destination={destination}
                currency={currentPlan.searchParams.currency}
                onSelect={(dest) => setSelectedDestination(dest)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Modal */}
      <DestinationModal
        destination={selectedDestination}
        searchParams={currentPlan.searchParams}
        mapsApiKey={mapsApiKey}
        onClose={() => setSelectedDestination(null)}
        onSaveTrip={handleSaveTrip}
        isSaved={isCurrentSelectedSaved}
      />

      {/* API Key Modal Setup */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        mapsApiKey={mapsApiKey}
        onSaveMapsKey={handleSaveMapsKey}
      />

      {/* Saved Trips Drawer */}
      <SavedTripsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedTrips={savedTrips}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onRemoveTrip={handleRemoveTrip}
        onClearAll={handleClearAllSaved}
      />

      {/* Footer */}
      <footer className="mt-auto bg-[#050505] text-white/40 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 font-display text-white text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A5C]" />
            WAYFARE
          </div>
          <p className="text-center text-white/40">
            Powered by Gemini AI & Google Places API · Curated budget itineraries
          </p>
          <p className="text-white/40 font-mono">© {new Date().getFullYear()} Wayfare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
