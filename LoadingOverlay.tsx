import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LOADING_STEPS = [
  'Calculating budget-friendly destinations...',
  'Evaluating transport & hotel cost ratios...',
  'Integrating Google Places attractions & spots...',
  'Drafting morning-to-night day-by-day itineraries...',
  'Finalizing top 5 curated matches for you...',
];

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center text-center px-6 animate-fadeIn">
      {/* Flight Orbit animation */}
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-orbit" />
        <div className="p-4 rounded-xl bg-[#FF8A5C] text-black shadow-2xl animate-bounce">
          <Plane className="w-8 h-8 -rotate-45" />
        </div>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-medium text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        Wayfare AI is scouting destinations...
      </h3>
      <p className="text-white/60 mt-3 text-sm sm:text-base font-mono max-w-md h-8 transition-all">
        {LOADING_STEPS[currentStep]}
      </p>

      {/* Progress Dots */}
      <div className="flex gap-2 mt-8">
        {LOADING_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentStep ? 'w-8 bg-[#FF8A5C]' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
