import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email Us",
      value: "support@personaai.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Call Us",
      value: "+1 (555) 123-4567",
    },
  ];

  return (
    <div className="mesh-bg min-h-screen pt-28">
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6">Contact Us</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            We're Here to
            <br />
            <span className="gradient-text">Help You Grow</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Have questions about Persona AI? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3 card-dark">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    required
                    rows={5}
                    className="input-dark resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary py-3.5 mt-2">
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl mb-6">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">We'll be in touch within 24 hours.</p>
              </div>
            )}
          </div>

          {/* Contact Methods */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {contactMethods.map((method) => (
              <div key={method.label} className="card-dark">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  {method.icon}
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{method.label}</p>
                <p className="text-slate-200 font-medium">{method.value}</p>
              </div>
            ))}
            <div className="card-dark flex-1 flex flex-col justify-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Response Time</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 text-sm font-medium">Typically under 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
