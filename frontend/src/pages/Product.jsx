import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';

function Product() {
  const features = [
    {
      title: "AI-Powered Insights",
      description: "Leverage advanced machine learning to generate data-driven insights into user behavior, preferences, and demographic patterns for informed decision-making.",
    },
    {
      title: "Customizable Personas",
      description: "Create highly detailed, industry-specific user personas that align with your business goals and target market segments, enabling precise audience targeting.",
    },
    {
      title: "Intuitive Interface",
      description: "A streamlined platform designed for efficiency — from brand input to a full AI-generated persona report in under 10 seconds.",
    },
  ];

  const highlights = [
    { icon: "📊", label: "Competitor Analysis" },
    { icon: "🗺️", label: "MVP Roadmaps" },
    { icon: "💡", label: "Pain Point Discovery" },
    { icon: "🎯", label: "Use Case Mapping" },
    { icon: "📈", label: "Business Plans" },
    { icon: "💬", label: "Customer Q&A" },
  ];

  return (
    <div className="page-wrapper pb-20">
      <div className="container-wide">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6">Our Platform</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
              style={{ color: 'var(--text-primary)' }}>
            Everything you need to
            <br />
            <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>win your market</span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Persona AI delivers cutting-edge persona generation tools powered by AI, helping businesses
            create deeper connections with their target audience.
          </p>
        </div>

        {/* Feature Chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-16">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="badge"
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              <span>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="card text-center py-14 px-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Ready to understand your customers?
          </h2>
          <p className="mb-8 max-w-md mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of businesses already using Persona AI to drive smarter marketing decisions.
          </p>
          <Link to="/persona/details">
            <button id="product-cta" className="btn-primary px-8 py-3 text-sm">
              Start For Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Product;
