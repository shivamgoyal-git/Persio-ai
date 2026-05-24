import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
          <GridLoader color="var(--text-primary)" size={12} />
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Analyzing Buyer Concerns...
            </h2>
            <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Our AI is predicting common customer concerns and generating precise proposed solutions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    Array.isArray(concerns) && (
      <div className="max-w-3xl mx-auto px-6 pb-20" style={{ paddingTop: '2rem' }}>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge mb-4">Customer Concerns</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}>
            Common Objections
            <br />
            <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>& Strategic Solutions</span>
          </h1>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            These are the key barriers preventing conversion and the strategic answers your
            marketing copy or sales reps should use.
          </p>
        </div>

        {/* Concerns List */}
        <div className="flex flex-col gap-5">
          {concerns.map((concern, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                borderColor: concern.is_highlighted ? 'var(--text-muted)' : 'var(--border)',
              }}
            >
              {/* Question */}
              <div className="flex gap-4 items-start pb-4 mb-4"
                   style={{ borderBottom: '1px solid var(--border)' }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Q
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {concern?.question}
                    </h4>
                    {concern.is_highlighted && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Proposed Solution */}
              <div className="flex gap-4 items-start">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  A
                </div>
                <div className="flex-1 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider block mb-1.5"
                        style={{ color: 'var(--text-muted)' }}>
                    Proposed Solution
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
