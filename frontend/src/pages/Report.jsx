import PersonaDisplay from "../components/PersonaDisplay";
import { Link } from "react-router-dom";

export default function Report() {
  return (
    <div className="mesh-bg min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="badge mb-2">Customer Persona Report</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">AI-Generated Profiles</h1>
          </div>
          <Link to={"/persona/report/concerns"}>
            <button className="btn-ghost flex items-center gap-2 text-xs font-semibold py-2.5 px-5">
              <span>View Customer Q&A</span>
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>
        <PersonaDisplay />
      </div>
    </div>
  );
}
