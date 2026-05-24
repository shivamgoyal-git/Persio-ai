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
      label: "Email",
      value: "support@personaai.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+1 (555) 123-4567",
    },
  ];

  return (
    <div className="page-wrapper pb-20">
      <div className="container-wide" style={{ maxWidth: '900px' }}>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-6">Contact Us</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
              style={{ color: 'var(--text-primary)' }}>
            We're here to
            <br />
            <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>help you grow</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have questions about Persona AI? Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          {/* Form */}
          <div className="md:col-span-3 card">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Your Name
                  </label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    required
                    rows={5}
                    className="input-dark resize-none"
                  />
                </div>
                <button type="submit" id="contact-submit" className="btn-primary py-3 mt-1">
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                     style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  ✓
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>We'll be in touch within 24 hours.</p>
              </div>
            )}
          </div>

          {/* Contact Methods */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {contactMethods.map((method) => (
              <div key={method.label} className="card">
                <div className="icon-bubble w-10 h-10 rounded-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {method.icon}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  {method.label}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{method.value}</p>
              </div>
            ))}
            <div className="card flex-1 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Response Time
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Typically under 24 hours
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
