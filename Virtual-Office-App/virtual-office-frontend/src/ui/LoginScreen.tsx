import { useState, FormEvent } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';

const LoginScreen = () => {
  const { join, color } = usePlayerStore();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    if (trimmed.length > 20) {
      setError('Name must be 20 characters or fewer.');
      return;
    }
    join(trimmed);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(97,218,251,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(97,218,251,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#61DAFB]/10 border border-[#61DAFB]/20 mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="11" r="5" fill="#61DAFB" opacity="0.9" />
              <rect x="10" y="17" width="12" height="10" rx="3" fill="#61DAFB" opacity="0.7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Virtual Office
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Enter a name to join the space
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar color preview */}
            <div className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl border border-white/[0.06]">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{ background: color, boxShadow: `0 0 12px ${color}66` }}
              />
              <div>
                <p className="text-white/60 text-xs">Your avatar color</p>
                <p className="text-white text-sm font-medium" style={{ color }}>
                  {color}
                </p>
              </div>
              <span className="ml-auto text-white/30 text-xs">(random)</span>
            </div>

            {/* Name input */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="Your display name..."
                autoFocus
                maxLength={20}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/[0.06] border border-white/[0.1]
                  text-white placeholder-white/30
                  focus:outline-none focus:border-[#61DAFB]/50 focus:bg-white/[0.08]
                  transition-all duration-150
                "
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 pl-1">{error}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-[#0a0a0f]
                bg-[#61DAFB] hover:bg-[#7ee5ff]
                transition-all duration-150 active:scale-[0.98]
                disabled:opacity-40 disabled:cursor-not-allowed
              "
              disabled={name.trim().length === 0}
            >
              Join Office
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          WASD or arrow keys to move
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
