import React from 'react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { value: "10K+", label: "Businesses served" },
  { value: "98%",  label: "Accuracy rate" },
  { value: "3s",   label: "Avg. generation" },
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper flex flex-col items-center justify-center pb-20" style={{ paddingTop: '8rem' }}>
      <div className="container-narrow text-center animate-fade-up">

        {/* Badge */}
        <div className="badge mb-8 animate-pulse-glow">
          <span className="accent-dot" />
          AI-Powered Marketing Intelligence
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5"
            style={{ color: 'var(--text-primary)' }}>
          Know Your Customer
          <br />
          <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontWeight: 700 }}>
            Deeply &amp; Instantly
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
           style={{ color: 'var(--text-secondary)' }}>
          Generate rich, AI-powered customer personas, competitor insights,
          and strategic business plans in seconds — not weeks.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            id="hero-cta-primary"
            onClick={() => navigate('/persona/details')}
            className="btn-primary px-7 py-3 text-sm"
          >
            Generate Personas Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            id="hero-cta-secondary"
            className="btn-secondary px-7 py-3 text-sm"
            onClick={() => navigate('/how-it-works')}
          >
            See How It Works
          </button>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-chip">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default HeroSection;
