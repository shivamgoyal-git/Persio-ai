import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';

function Product() {
  const features = [
    {
      title: "AI-Powered Insights",
      description: "Leverage advanced machine learning algorithms to generate data-driven insights into user behavior, preferences, and demographic patterns for informed decision-making.",
    },
    {
      title: "Customizable Personas",
      description: "Create highly detailed, industry-specific user personas that align with your business goals and target market segments, enabling precise audience targeting.",
    },
    {
      title: "Intuitive Interface",
      description: "Experience our streamlined platform designed for efficiency, featuring drag-and-drop functionality, customizable templates, and real-time collaboration tools.",
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
    <div className="mesh-bg min-h-screen pt-28">
      <div className="max-w-6xl mx-auto px-6 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6">Our Platform</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Everything You Need to
            <br />
            <span className="gradient-text">Win Your Market</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Persona AI delivers cutting-edge persona generation tools powered by AI, helping businesses create deeper connections with their target audience.
          </p>
        </div>

        {/* Feature Highlights Chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-slate-300"
            >
              <span>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="card-dark glow-indigo text-center py-16 px-8">
          <h2 className="text-3xl font-bold mb-4 text-slate-100">
            Ready to Understand Your Customers?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Join thousands of businesses already using Persona AI to drive smarter marketing decisions.
          </p>
          <Link to="/persona/details">
            <button className="btn-primary px-10 py-4 text-base">
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
