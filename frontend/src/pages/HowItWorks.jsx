import React from "react";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Input Your Business Details",
      description: "Provide your brand name, product description, industry, and business type. Our AI uses this as the foundation for building accurate, tailored personas.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "AI Analysis & Processing",
      description: "Our advanced AI models analyze market data, consumer behavior patterns, and industry trends in real time to generate meaningful, actionable insights.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Persona Generation",
      description: "Instantly receive detailed user personas including demographics, goals, pain points, communication channels, and feature preferences — all in a beautiful card view.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Explore Full Business Report",
      description: "Go deeper with competitor analysis, step-by-step MVP roadmaps, business & monetization plans, and pre-built customer Q&A to address common objections.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mesh-bg min-h-screen pt-28">
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6">How It Works</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            From Idea to Insights
            <br />
            <span className="gradient-text">in 4 Simple Steps</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Our AI-powered platform simplifies the process of creating detailed, accurate user personas for your business.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-5 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="card-dark flex items-start gap-6">
              {/* Step number circle */}
              <div className="step-circle">{step.number}</div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-indigo-400">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-100">{step.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden" />
              )}
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-400 mb-6 text-sm">Ready to get started? It's free, no sign-up required.</p>
          <Link to="/persona/details">
            <button className="btn-primary px-10 py-4 text-base">
              Try Persona AI Now
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

export default HowItWorks;
