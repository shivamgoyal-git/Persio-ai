import React from 'react'
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate('/persona/details');
  };

  const stats = [
    { value: "10K+", label: "Businesses Served" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "3 sec", label: "Avg. Generation Time" },
  ];

  return (
    <div className="mesh-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="badge mb-8 animate-pulse-glow">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          AI-Powered Marketing Intelligence
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Know Your Customer
          <br />
          <span className="gradient-text">Deeply & Instantly</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Generate rich, AI-powered customer personas, competitor insights, and strategic business plans in seconds — not weeks.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button onClick={handleGenerateClick} className="btn-primary text-base px-8 py-4">
            Generate Personas Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            className="btn-ghost text-base px-8 py-4"
            onClick={() => navigate('/how-it-works')}
          >
            See How It Works
          </button>
        </div>

        {/* Stats Row */}
        <div className="divider" />
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
