import React from 'react';
import { Wallet, Cpu, MapPin, Calendar } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Wallet,
      step: '01',
      title: 'Budget & Vibe',
      desc: 'Enter starting city, budget, trip length & travel interests.',
    },
    {
      icon: Cpu,
      step: '02',
      title: 'AI Smart Match',
      desc: 'Gemini AI evaluates destinations matching your exact budget ratio.',
    },
    {
      icon: MapPin,
      step: '03',
      title: 'Google Places Data',
      desc: 'Real live ratings, photos, addresses & interactive Google Maps.',
    },
    {
      icon: Calendar,
      step: '04',
      title: 'Day-by-Day Plan',
      desc: 'Complete morning-to-night itinerary with cost breakdowns.',
    },
  ];

  return (
    <section id="how" className="bg-[#0A0A0A] text-[#E5E5E5] py-12 border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="flex flex-col items-center text-center p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF8A5C]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FF8A5C]/10 text-[#FF8A5C] border border-[#FF8A5C]/20 flex items-center justify-center mb-3 font-mono">
                  <IconComponent className="w-4 h-4" />
                </div>
                <p className="font-display font-medium text-white text-base" style={{ fontFamily: 'Georgia, serif' }}>
                  <span className="text-[#FF8A5C] font-mono text-xs font-bold mr-1.5">{item.step}.</span>
                  {item.title}
                </p>
                <p className="text-xs mt-1.5 text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
