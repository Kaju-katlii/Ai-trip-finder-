import React, { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { PlaceInfo } from '../types';
import { Star, MapPin, ExternalLink, Image as ImageIcon, Navigation } from 'lucide-react';

interface PlacesWidgetProps {
  query: string;
  destinationName?: string;
  onPlaceFound?: (place: PlaceInfo) => void;
  compact?: boolean;
}

export const PlacesWidget: React.FC<PlacesWidgetProps> = ({
  query,
  destinationName,
  onPlaceFound,
  compact = false,
}) => {
  const placesLib = useMapsLibrary('places');
  const [place, setPlace] = useState<PlaceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!query) return;

    if (!placesLib) {
      // Fallback preview image based on search query
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      placesLib.Place.searchByText({
        textQuery: query,
        fields: ['id', 'displayName', 'formattedAddress', 'rating', 'userRatingCount', 'photos', 'location', 'googleMapsUri'],
        maxResultCount: 1,
      })
        .then(({ places }) => {
          if (!isMounted) return;
          if (places && places.length > 0) {
            const found = places[0];
            let pUrl: string | null = null;

            if (found.photos && found.photos.length > 0) {
              try {
                pUrl = found.photos[0].getURI({ maxWidth: 600 });
              } catch (e) {
                // Ignore if getURI method fails
              }
            }

            const info: PlaceInfo = {
              id: found.id || String(Math.random()),
              displayName: typeof found.displayName === 'string' ? found.displayName : (found.displayName as any)?.text || query,
              formattedAddress: found.formattedAddress,
              rating: found.rating,
              userRatingCount: found.userRatingCount,
              photos: pUrl ? [pUrl] : [],
              location: found.location ? { lat: found.location.lat(), lng: found.location.lng() } : undefined,
              googleMapsUri: (found as any).googleMapsURI || (found as any).googleMapsUri,
            };

            setPlace(info);
            if (pUrl) setPhotoUrl(pUrl);
            if (onPlaceFound) onPlaceFound(info);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.warn('Google Places search error:', err);
          if (isMounted) setLoading(false);
        });
    } catch (e) {
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [placesLib, query]);

  const mapsUrl = place?.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (compact) {
    return (
      <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-white/5 border border-white/10 text-white">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-[#FF8A5C] shrink-0" />
          <span className="font-medium text-white truncate">{place?.displayName || query}</span>
          {place?.rating && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-400 ml-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {place.rating.toFixed(1)}
            </span>
          )}
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-[#FF8A5C] p-1 shrink-0 transition-colors"
          title="Open in Google Maps"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#080808] text-white overflow-hidden shadow-sm">
      {photoUrl && (
        <div className="relative h-36 w-full overflow-hidden bg-white/5">
          <img
            src={photoUrl}
            alt={place?.displayName || query}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-black/80 text-white text-[11px] px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1 border border-white/10 font-mono">
            <MapPin className="w-3 h-3 text-[#FF8A5C]" />
            Google Places
          </div>
        </div>
      )}

      <div className="p-3.5 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h5 className="font-display font-medium text-sm text-white leading-tight">
            {place?.displayName || query}
          </h5>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-white/50 hover:text-[#FF8A5C] hover:bg-white/10 shrink-0 transition-colors"
            title="View on Google Maps"
          >
            <Navigation className="w-4 h-4" />
          </a>
        </div>

        {place?.formattedAddress && (
          <p className="text-xs text-white/50 line-clamp-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0 text-[#FF8A5C]" />
            {place.formattedAddress}
          </p>
        )}

        {place?.rating && (
          <div className="flex items-center gap-1.5 text-xs pt-0.5">
            <div className="flex items-center gap-1 font-bold font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{place.rating.toFixed(1)}</span>
            </div>
            {place.userRatingCount && (
              <span className="text-white/40 text-[11px] font-mono">({place.userRatingCount.toLocaleString()} reviews)</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
