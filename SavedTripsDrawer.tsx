import React from 'react';
import { Destination } from '../types';
import { Bookmark, X, ArrowRight, Trash2, MapPin, Sparkles } from 'lucide-react';

interface SavedTripsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onRemoveTrip: (id: string) => void;
  onClearAll: () => void;
}

export const SavedTripsDrawer: React.FC<SavedTripsDrawerProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectDestination,
  onRemoveTrip,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A] shadow-2xl flex flex-col border-l border-white/10">
          {/* Header */}
          <div className="bg-[#050505] px-6 py-5 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF8A5C]/10 text-[#FF8A5C] border border-[#FF8A5C]/20 flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-[#FF8A5C]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg text-white" style={{ fontFamily: 'Georgia, serif' }}>Saved Trip Plans</h3>
                <p className="text-xs text-white/40">{savedTrips.length} destination(s) saved</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {savedTrips.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="p-4 rounded-xl bg-white/5 text-white/40 w-16 h-16 mx-auto flex items-center justify-center border border-white/10">
                  <Bookmark className="w-8 h-8" />
                </div>
                <h4 className="font-display font-medium text-white text-base" style={{ fontFamily: 'Georgia, serif' }}>No Saved Trips Yet</h4>
                <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                  When you find a destination you like, click "Save" on the card to keep it here for easy reference.
                </p>
              </div>
            ) : (
              savedTrips.map((dest) => (
                <div
                  key={dest.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:border-[#FF8A5C]/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF8A5C]" />
                        {dest.stateOrCountry}
                      </span>
                      <h4 className="font-display font-medium text-lg text-white mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>{dest.name}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#FF8A5C]/20 text-[#FF8A5C] border border-[#FF8A5C]/30 text-[11px] font-mono font-bold">
                      {dest.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2">{dest.tagline}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <span className="font-mono font-bold text-[#FF8A5C]">
                      Est. ₹{dest.estimatedCost.total.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveTrip(dest.id)}
                        className="p-1.5 rounded-md text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Remove saved trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectDestination(dest);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-md bg-[#FF8A5C] hover:bg-[#ff7b45] text-black font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {savedTrips.length > 0 && (
            <div className="bg-[#050505] border-t border-white/10 px-6 py-4 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
              >
                Clear All Saved
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-md bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
