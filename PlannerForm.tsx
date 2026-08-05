import React, { useState } from 'react';
import { TripSearchParams } from '../types';
import { Sparkles, MapPin, Wallet, Users, Calendar, Heart, Zap } from 'lucide-react';

interface PlannerFormProps {
  onSubmit: (params: TripSearchParams) => void;
  isLoading: boolean;
}

const AVAILABLE_INTERESTS = [
  { id: 'Beaches', label: '🏖️ Beaches', color: 'hover:border-blue-400' },
  { id: 'Nature', label: '🌿 Nature & Hills', color: 'hover:border-emerald-400' },
  { id: 'Culture', label: '🏰 Culture & Forts', color: 'hover:border-amber-400' },
  { id: 'Foodie', label: '🍲 Local Foodie', color: 'hover:border-orange-400' },
  { id: 'Nightlife', label: '🍸 Nightlife', color: 'hover:border-purple-400' },
  { id: 'Adventure', label: '🧗 Adventure & Trek', color: 'hover:border-red-400' },
  { id: 'Wellness', label: '🧘 Wellness & Spa', color: 'hover:border-teal-400' },
  { id: 'Shopping', label: '🛍️ Markets & Bazaars', color: 'hover:border-pink-400' },
];

const PRESETS = [
  {
    title: '🌴 Mumbai to Goa Escape',
    startCity: 'Mumbai',
    budget: 15000,
    people: 2,
    days: 4,
    interests: ['Beaches', 'Nightlife', 'Foodie'],
  },
  {
    title: '🏰 Delhi to Jaipur & Agra',
    startCity: 'New Delhi',
    budget: 12000,
    people: 2,
    days: 3,
    interests: ['Culture', 'Foodie', 'Shopping'],
  },
  {
    title: '⛰️ Bengaluru to Coorg & Ooty',
    startCity: 'Bengaluru',
    budget: 18000,
    people: 2,
    days: 4,
    interests: ['Nature', 'Wellness', 'Foodie'],
  },
];

export const PlannerForm: React.FC<PlannerFormProps> = ({ onSubmit, isLoading }) => {
  const [startCity, setStartCity] = useState('Mumbai');
  const [budget, setBudget] = useState<number | ''>(15000);
  const [currency, setCurrency] = useState('INR (₹)');
  const [people, setPeople] = useState<number | ''>(2);
  const [days, setDays] = useState<number | ''>(4);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Beaches', 'Foodie']);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setStartCity(preset.startCity);
    setBudget(preset.budget);
    setPeople(preset.people);
    setDays(preset.days);
    setSelectedInterests(preset.interests);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!startCity.trim()) newErrors.startCity = 'Please enter your starting city.';
    if (!budget || Number(budget) <= 0) newErrors.budget = 'Please enter a valid budget.';
    if (!people || Number(people) <= 0) newErrors.people = 'Please enter number of travelers.';
    if (!days || Number(days) <= 0) newErrors.days = 'Please enter number of days.';
    if (selectedInterests.length === 0) newErrors.interests = 'Please select at least one interest.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      startCity: startCity.trim(),
      budget: Number(budget),
      currency,
      people: Number(people),
      days: Number(days),
      interests: selectedInterests,
    });
  };

  return (
    <section id="planner" className="relative py-16 lg:py-24 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF8A5C]/10 text-[#FF8A5C] border border-[#FF8A5C]/20 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A5C]" />
            Trip Parameters
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white font-light tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Where should you <span className="italic text-[#FF8A5C]">explore next?</span>
          </h2>
          <p className="text-white/50 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Specify your origin, budget, and vibe. Gemini AI will calculate optimal itineraries paired with live Google Places attractions.
          </p>

          {/* Preset Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-1 mr-1">
              <Zap className="w-3.5 h-3.5 text-[#FF8A5C]" />
              Presets:
            </span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:border-[#FF8A5C]/50 hover:text-white transition-all"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Starting City */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase text-white/40 font-bold tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A5C]" />
                Starting Point / City
              </label>
              <input
                type="text"
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF8A5C] transition-all placeholder:text-white/20"
              />
              {errors.startCity && <p className="text-xs text-rose-400 font-medium">{errors.startCity}</p>}
            </div>

            {/* Total Budget */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] uppercase text-white/40 font-bold tracking-widest flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-[#FF8A5C]" />
                  Total Budget
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-xs font-mono text-white/70 bg-white/5 rounded-md px-2 py-0.5 border border-white/10 focus:outline-none focus:border-[#FF8A5C]"
                >
                  <option value="INR (₹)" className="bg-[#0A0A0A] text-white">INR (₹)</option>
                  <option value="USD ($)" className="bg-[#0A0A0A] text-white">USD ($)</option>
                  <option value="EUR (€)" className="bg-[#0A0A0A] text-white">EUR (€)</option>
                </select>
              </div>
              <input
                type="number"
                min="500"
                step="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 15000"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF8A5C] transition-all placeholder:text-white/20 font-mono"
              />
              {errors.budget && <p className="text-xs text-rose-400 font-medium">{errors.budget}</p>}
            </div>

            {/* Number of People */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase text-white/40 font-bold tracking-widest flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FF8A5C]" />
                Travelers
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={people}
                onChange={(e) => setPeople(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 2"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF8A5C] transition-all placeholder:text-white/20 font-mono"
              />
              {errors.people && <p className="text-xs text-rose-400 font-medium">{errors.people}</p>}
            </div>

            {/* Number of Days */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase text-white/40 font-bold tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF8A5C]" />
                Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 4"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF8A5C] transition-all placeholder:text-white/20 font-mono"
              />
              {errors.days && <p className="text-xs text-rose-400 font-medium">{errors.days}</p>}
            </div>

            {/* Travel Interests / Vibe */}
            <div className="sm:col-span-2 space-y-3 pt-2">
              <label className="block text-[10px] uppercase text-white/40 font-bold tracking-widest flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#FF8A5C]" />
                Vibe / Travel Interests
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AVAILABLE_INTERESTS.map((item) => {
                  const isSelected = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FF8A5C]/20 text-[#FF8A5C] border-[#FF8A5C]/50 shadow-md'
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#FF8A5C] shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {errors.interests && <p className="text-xs text-rose-400 font-medium">{errors.interests}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-[#FF8A5C] hover:bg-[#ff7b45] text-black font-bold text-sm py-3.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg mt-6"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{isLoading ? 'Recalculating Itinerary...' : 'Calculate Itinerary Recommendations'}</span>
          </button>
        </form>
      </div>
    </section>
  );
};
