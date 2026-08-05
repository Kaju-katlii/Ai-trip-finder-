export interface TripSearchParams {
  startCity: string;
  budget: number;
  currency: string;
  people: number;
  days: number;
  interests: string[];
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  placeSearchQuery: string;
  estimatedCost: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  theme: string;
  activities: Activity[];
}

export interface CostBreakdown {
  travel: number;
  stay: number;
  food: number;
  activities: number;
}

export interface Destination {
  id: string;
  name: string;
  stateOrCountry: string;
  vibe: string;
  tagline: string;
  matchScore: number;
  searchQuery: string;
  coordinates?: { lat: number; lng: number };
  estimatedCost: {
    total: number;
    breakdown: CostBreakdown;
  };
  bestTimeToVisit: string;
  travelDuration: string;
  keyHighlights: string[];
  whyMatch: string;
  itinerary: ItineraryDay[];
}

export interface TripPlanResult {
  summary: string;
  searchParams: TripSearchParams;
  destinations: Destination[];
}

export interface PlaceInfo {
  id: string;
  displayName: string;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  photos?: string[];
  location?: { lat: number; lng: number };
  googleMapsUri?: string;
}
