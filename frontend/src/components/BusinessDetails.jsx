import personaStore from "../store/personaStore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const industries = [
  "SaaS", "E-commerce", "Healthcare & Pharmaceuticals", "Education & E-learning",
  "Finance & Fintech", "Retail", "Real Estate", "Manufacturing",
  "Logistics & Transportation", "Hospitality & Travel", "Agriculture & Agritech",
  "Media & Entertainment", "Automotive", "Telecommunications", "Energy & Utilities",
  "Consumer Goods", "Professional Services", "Construction", "Legal & Compliance",
  "Nonprofit & Social Impact",
];

function BusinessTypeOption({ value, label, sublabel, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        checked
          ? 'border-indigo-500/60 bg-indigo-500/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? 'border-indigo-400' : 'border-slate-600'
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} readOnly />
      <div>
        <p className="text-sm font-semibold text-slate-200">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>
      </div>
    </label>
  );
}

export default function BusinessDetails() {
  const [details, setDetails] = useState({ industry: industries[0] });
  const navigate = useNavigate();

  const handleBusinessChange = (type) => {
    setDetails({ ...details, businessType: type });
  };

  const handleFeatureAvailability = (featureAvailability) => {
    setDetails({ ...details, isFeature: featureAvailability });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { brandName, productDescription, industry, businessType } = details;
    personaStore.setState({ details: { brandName, productDescription, industry, businessType }, concerns: [], personas: [] });
    navigate('/persona/report');
  };

  return (
    <div className="mesh-bg min-h-screen flex items-start justify-center pt-28 pb-20">
      <div className="w-full max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="badge mb-5">Step 1 of 1</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Tell Us About
            <br />
            <span className="gradient-text">Your Business</span>
          </h1>
          <p className="text-slate-400 text-base">
            These details power the AI to craft deeply tailored personas for your audience.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card-dark flex flex-col gap-6">

          {/* Brand Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Brand Name <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              required
              className="input-dark"
              placeholder="e.g. NovaCart AI"
              onChange={(e) => setDetails({ ...details, brandName: e.target.value })}
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Product Description <span className="text-indigo-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              className="input-dark resize-none"
              placeholder="Describe what your product does and who it's for..."
              onChange={(e) => setDetails({ ...details, productDescription: e.target.value })}
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Industry <span className="text-indigo-400">*</span>
            </label>
            <select
              value={details.industry}
              onChange={(e) => setDetails({ ...details, industry: e.target.value })}
              className="input-dark"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {industries.map((industry) => (
                <option key={industry} value={industry} style={{ background: '#0c1228', color: '#f0f4ff' }}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Business Type <span className="text-indigo-400">*</span>
            </label>
            <div className="flex flex-col gap-3">
              <BusinessTypeOption
                value="B2C"
                label="B2C — Business to Consumer"
                sublabel="You sell products or services directly to individual customers"
                checked={details.businessType === "B2C"}
                onChange={() => handleBusinessChange("B2C")}
              />
              <BusinessTypeOption
                value="B2B"
                label="B2B — Business to Business"
                sublabel="You sell products or services to other companies"
                checked={details.businessType === "B2B"}
                onChange={() => handleBusinessChange("B2B")}
              />
              <BusinessTypeOption
                value="D2C"
                label="D2C — Direct to Consumer"
                sublabel="You manufacture and sell directly to customers, bypassing retailers"
                checked={details.businessType === "D2C"}
                onChange={() => handleBusinessChange("D2C")}
              />
            </div>
          </div>

          {/* Feature Availability */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Have you built any features or prototypes?
            </label>
            <div className="flex gap-3">
              <BusinessTypeOption
                value={true}
                label="Yes"
                sublabel="We have existing features or prototypes"
                checked={details.isFeature === true}
                onChange={() => handleFeatureAvailability(true)}
              />
              <BusinessTypeOption
                value={false}
                label="No"
                sublabel="We're in ideation or early stage"
                checked={details.isFeature === false}
                onChange={() => handleFeatureAvailability(false)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary py-4 text-base w-full mt-2"
          >
            Generate My Personas
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
