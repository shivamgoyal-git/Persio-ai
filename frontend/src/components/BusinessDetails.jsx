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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '14px 18px',
        borderRadius: '12px',
        border: checked ? '1.5px solid var(--text-secondary)' : '1px solid var(--border)',
        backgroundColor: checked ? 'var(--surface-2)' : 'var(--surface)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          border: checked ? '2px solid var(--text-primary)' : '2px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}
      >
        {checked && (
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-primary)' }} />
        )}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} readOnly />
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sublabel}</p>
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
    <div className="page-wrapper" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="w-full max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="badge mb-5">Step 1 of 1</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}>
            Tell Us About
            <br />
            <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Your Business</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            These details power the AI to craft deeply tailored personas for your audience.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card flex flex-col gap-6">

          {/* Brand Name */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Brand Name <span style={{ color: 'var(--text-primary)' }}>*</span>
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
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Product Description <span style={{ color: 'var(--text-primary)' }}>*</span>
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
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Industry <span style={{ color: 'var(--text-primary)' }}>*</span>
            </label>
            <select
              value={details.industry}
              onChange={(e) => setDetails({ ...details, industry: e.target.value })}
              className="input-dark"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
              Business Type <span style={{ color: 'var(--text-primary)' }}>*</span>
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
            <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
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
