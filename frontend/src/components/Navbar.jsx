import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { to: "/product", label: "Product" },
    { to: "/how-it-works", label: "How it Works" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 flex justify-center pt-4">
      <div className="w-11/12 max-w-5xl glass flex items-center justify-between px-6 py-3 rounded-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center h-14 w-52 overflow-hidden relative">
          <img src={logo} alt="Persio" className="h-28 w-auto object-contain max-w-none scale-[1.7] translate-x-4" />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-indigo-400'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link to="/persona/details">
          <button className="btn-primary text-xs px-5 py-2.5">
            Get Started
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
