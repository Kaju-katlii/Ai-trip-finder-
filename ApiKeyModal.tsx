import React, { useState } from 'react';
import { Key, X, ExternalLink, Check, Sparkles, MapPin } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mapsApiKey: string;
  onSaveMapsKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  mapsApiKey,
  onSaveMapsKey,
}) => {
  const [customKeyInput, setCustomKeyInput] = useState(mapsApiKey);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMapsKey(customKeyInput.trim());
    onClose();
  };

  const copySecretName = () => {
    navigator.clipboard.writeText('GOOGLE_MAPS_PLATFORM_KEY');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#0A0A0A] shadow-2xl border border-white/10 text-white">
        {/* Header */}
        <div className="bg-[#050505] px-6 py-5 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF8A5C]/10 text-[#FF8A5C] border border-[#FF8A5C]/20 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-white" style={{ fontFamily: 'Georgia, serif' }}>Google Maps API Setup</h3>
              <p className="text-xs text-white/40">Enable live Google Places photos & interactive maps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Status banner */}
          {mapsApiKey ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Google Maps Platform API key is connected and active.</span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#FF8A5C]/10 border border-[#FF8A5C]/30 text-[#FF8A5C] text-xs flex items-center gap-2.5 font-mono">
              <Sparkles className="w-4 h-4 text-[#FF8A5C] shrink-0" />
              <span>Add your API key to fetch live place photos, ratings, and interactive Google Maps.</span>
            </div>
          )}

          {/* Option A: AI Studio Secrets */}
          <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
            <div className="flex items-center justify-between font-semibold text-white text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-[#FF8A5C] text-black font-mono text-xs flex items-center justify-center font-bold">1</span>
                Add via AI Studio Secrets (Recommended)
              </span>
            </div>
            <ol className="list-decimal list-inside text-xs text-white/70 space-y-1.5 leading-relaxed pl-1">
              <li>
                Get a key from the{' '}
                <a
                  href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8A5C] underline hover:text-[#ff7b45] font-medium inline-flex items-center gap-0.5"
                >
                  Google Cloud Console <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Click <strong>Settings ⚙️</strong> in the top-right corner of AI Studio.
              </li>
              <li>
                Navigate to <strong>Secrets</strong>.
              </li>
              <li>
                Type <code className="bg-white/10 text-[#FF8A5C] px-1.5 py-0.5 rounded border border-white/10 font-mono text-[11px]">GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name and paste your key.
              </li>
            </ol>
            <button
              onClick={copySecretName}
              className="mt-2 text-xs text-white/80 hover:text-white font-medium bg-white/5 px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-1.5 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Key className="w-3.5 h-3.5 text-[#FF8A5C]" />}
              {copied ? 'Copied Secret Name!' : 'Copy Secret Name'}
            </button>
          </div>

          {/* Option B: Direct Runtime Override */}
          <form onSubmit={handleSave} className="space-y-3 pt-1">
            <label className="block text-xs font-semibold text-white/80">
              Or paste API key directly for this session:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customKeyInput}
                onChange={(e) => setCustomKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-xs font-mono focus:outline-none focus:border-[#FF8A5C] bg-white/5 text-white"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#FF8A5C] hover:bg-[#ff7b45] text-black font-bold text-xs shadow-sm transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-[#050505] px-6 py-4 flex justify-end border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
