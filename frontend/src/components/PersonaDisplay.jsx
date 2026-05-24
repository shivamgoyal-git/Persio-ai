import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personaStore from "../store/personaStore";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";

const PersonaDisplay = () => {
  const { details, personas } = personaStore();
  const navigate = useNavigate();

  const [currentPersona, setCurrentPersona] = useState(0);
  const [navIndex, setNavIndex] = useState(0);

  const personaQuery = useQuery({
    queryKey: ["persona"],
    queryFn: async () => {
      try {
        if (!details.brandName) {
          navigate("/persona/details");
          throw new Error("Brand details not available");
        }
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4500";
        const request = {
          url: `${apiBaseUrl}/persona`,
          method: "POST",
          data: {
            ...details,
            numResponse: 3,
          },
        };

        const { data } = await axios(request);
        const personas = data.result;

        for (let i = 0; i < personas.length; i++) {
          const item = personas[i];
          let tempGender = item?.gender?.toLowerCase();
          const profileRes = await axios.get(
            `https://randomuser.me/api/?gender=${tempGender}`
          );
          personas[i].profile_pic = profileRes.data.results[0].picture.large;
        }
        personaStore.setState({ personas });
        return { success: true };
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (Array.isArray(personas)) {
      setCurrentPersona(personas[navIndex]);
    }
  }, [personas, navIndex]);

  if (personaQuery.status === "error") {
    return navigate("/persona/details");
  }

  if (personaQuery.status === "pending" || !currentPersona) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div className="flex flex-col items-center gap-6">
          <GridLoader color="var(--text-primary)" size={12} />
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Generating Persona Profiles...
            </h2>
            <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Our AI is curating deeply rich demographic and behavioral user profiles based on your inputs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleNavigation = (type) => {
    if (type === "next") setNavIndex((prev) => prev + 1);
    if (type === "back") setNavIndex((prev) => prev - 1);
  };

  return (
    personaQuery.status === "success" && currentPersona && (
      <div className="flex flex-col gap-5">

        {/* Navigation Bar */}
        <div className="card flex justify-between items-center" style={{ padding: '16px 24px' }}>
          <div className="flex items-center gap-2">
            {personas.map((_, idx) => (
              <div
                key={idx}
                style={{
                  height: '6px',
                  borderRadius: '999px',
                  width: idx === navIndex ? '28px' : '6px',
                  backgroundColor: idx === navIndex ? 'var(--text-primary)' : 'var(--border)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
            <span className="text-xs font-semibold ml-2" style={{ color: 'var(--text-muted)' }}>
              Profile {navIndex + 1} of {personas.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleNavigation("back")}
              disabled={navIndex === 0}
              className="btn-icon"
              style={{ opacity: navIndex === 0 ? 0.35 : 1 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigation("next")}
              disabled={navIndex === personas.length - 1}
              className="btn-icon"
              style={{ opacity: navIndex === personas.length - 1 ? 0.35 : 1 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Profile Summary */}
          <div className="card flex flex-col gap-5 h-fit">
            <div className="flex items-center gap-4 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
              <img
                src={currentPersona?.profile_pic}
                alt={currentPersona?.name}
                style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--border)' }}
              />
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {currentPersona.name}
                </h2>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {currentPersona?.occupation || "Profession"}
                </p>
              </div>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="card-flat rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>Age</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{currentPersona?.age || "N/A"}</p>
              </div>
              <div className="card-flat rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>Location</p>
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{currentPersona?.location || "N/A"}</p>
              </div>
              <div className="card-flat rounded-xl p-3 col-span-2">
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>Industry</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{currentPersona?.industry || "N/A"}</p>
              </div>
            </div>

            {/* Background Details */}
            <div className="flex flex-col gap-4 pt-4 text-sm" style={{ borderTop: '1px solid var(--border)' }}>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>Education</span>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{currentPersona?.background?.education || "N/A"}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>Work Environment</span>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{currentPersona?.background?.work_environment || "N/A"}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>Income Bracket</span>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{currentPersona?.background?.income || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Behavioral Insights */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Goals & Channels */}
            <div className="card grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ width: '3px', height: '18px', borderRadius: '999px', backgroundColor: 'var(--text-primary)', display: 'inline-block' }} />
                  Core Goals & Objectives
                </h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="card-flat rounded-xl p-3.5">
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Primary Focus</p>
                    <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed">
                      {currentPersona?.professional_goal?.primary_goal}
                    </p>
                  </div>
                  {currentPersona?.professional_goal?.secondary_goal && (
                    <div className="card-flat rounded-xl p-3.5">
                      <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Secondary Focus</p>
                      <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed">
                        {currentPersona?.professional_goal?.secondary_goal}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ width: '3px', height: '18px', borderRadius: '999px', backgroundColor: 'var(--text-secondary)', display: 'inline-block' }} />
                  Communication Channels
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentPersona?.communication_channel?.map((channel, cid) => (
                    <span
                      key={cid}
                      className="badge"
                      style={{ fontSize: '11px' }}
                    >
                      {channel}
                    </span>
                  ))}
                </div>

                <h3 className="text-sm font-bold mt-5 mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ width: '3px', height: '18px', borderRadius: '999px', backgroundColor: 'var(--text-muted)', display: 'inline-block' }} />
                  Personal Interests
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {currentPersona?.hobbies?.personal_interests || "N/A"}
                </p>
              </div>
            </div>

            {/* Pain Points */}
            <div className="card">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span style={{ width: '3px', height: '18px', borderRadius: '999px', backgroundColor: 'var(--text-secondary)', display: 'inline-block' }} />
                Pain Points & Obstacles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPersona?.pain_points?.map((point, index) => (
                  <div key={index} className="card-flat rounded-xl p-3.5">
                    <span className="text-xs font-bold block mb-1" style={{ color: 'var(--text-primary)' }}>
                      {index + 1}. {point?.title}
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {point?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases & Features */}
            <div className="card grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ width: '3px', height: '18px', borderRadius: '999px', backgroundColor: 'var(--text-primary)', display: 'inline-block' }} />
                  Why they'll use {details?.brandName}?
                </h3>
                <div className="flex flex-col gap-3">
                  {currentPersona?.usecase_product?.map((point, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {index + 1}. {point?.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {point?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ width: '3px', height: '18px', borderRadius: '999px', backgroundColor: 'var(--text-secondary)', display: 'inline-block' }} />
                  Key Features They'll Value
                </h3>
                <div className="flex flex-col gap-3">
                  {currentPersona?.features_needed?.map((point, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {index + 1}. {point?.feature}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {point?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  );
};

export default PersonaDisplay;
