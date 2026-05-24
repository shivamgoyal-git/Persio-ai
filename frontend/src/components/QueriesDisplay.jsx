import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personaStore from "../store/personaStore";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";

export default function QueriesDisplay() {
  const { concerns, details } = personaStore();
  const navigate = useNavigate();

  const concernQuery = useQuery({
    queryKey: ["concern"],
    queryFn: async () => {
      try {
        if (!details.brandName) {
          navigate("/persona/details");
        }

        if (concerns?.length) return { success: true };

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4500";
        const request = {
          url: `${apiBaseUrl}/concerns`,
          method: "POST",
          data: { ...details, numResponse: 6 },
        };

        const concernRes = await axios(request);
        let nconcerns = concernRes.data.result;
        nconcerns = nconcerns.sort((a, b) => b.is_highlighted - a.is_highlighted);

        personaStore.setState({ concerns: nconcerns });
        return { success: true };
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (concernQuery.status === "error") {
    return navigate("/persona/details");
  }

  if (concernQuery.status === "pending" || concerns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div className="flex flex-col items-center gap-6">
          <GridLoader color="#6366f1" size={15} />
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Analyzing Buyer Concerns...</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              Our AI is predicting common customer concerns and generating precise proposed solutions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    Array.isArray(concerns) && (
      <div className="max-w-4xl mx-auto px-6 pb-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge mb-4">Customer Concerns</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Common Objections
            <br />
            <span className="gradient-text">& Strategic Solutions</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            These are the key barriers preventing conversion and the strategic answers your marketing copy or sales reps should use.
          </p>
        </div>

        {/* Concerns List */}
        <div className="flex flex-col gap-6">
          {concerns.map((concern, idx) => (
            <div
              key={idx}
              className={`card-dark group border transition-all duration-300 ${
                concern.is_highlighted
                  ? "border-indigo-500/30 bg-indigo-500/[0.04] glow-indigo"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {/* Question */}
              <div className="flex gap-4 items-start border-b border-white/5 pb-4 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  concern.is_highlighted
                    ? "bg-indigo-500/25 text-indigo-400 border border-indigo-500/40"
                    : "bg-white/5 text-slate-400 border border-white/10"
                }`}>
                  Q
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {concern?.question}
                    </h4>
                    {concern.is_highlighted && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold text-indigo-400 tracking-wide uppercase">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Proposed Solution */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  A
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Proposed Solution</span>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {concern?.proposed_solution}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    )
  );
}
