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
          <GridLoader color="#6366f1" size={15} />
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Generating Persona Profiles...</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              Our AI is curating deeply rich demographic and behavioral user profiles based on your inputs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleNavigation = (type) => {
    if (type === "next") {
      setNavIndex((prev) => prev + 1);
    }
    if (type === "back") {
      setNavIndex((prev) => prev - 1);
    }
  };

  return (
    personaQuery.status === "success" && currentPersona && (
      <div className="flex flex-col gap-6">
        
        {/* Navigation / Progress Indicator */}
        <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-2">
            {personas.map((_, idx) => (
              <div
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === navIndex ? "w-8 bg-indigo-500" : "w-2.5 bg-white/10"
                }`}
              />
            ))}
            <span className="text-xs text-slate-400 font-semibold ml-2">
              Profile {navIndex + 1} of {personas.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleNavigation("back")}
              disabled={navIndex === 0}
              className={`p-2.5 rounded-xl border transition-all ${
                navIndex === 0
                  ? "border-white/5 text-slate-600 cursor-not-allowed"
                  : "border-white/10 text-slate-300 hover:bg-white/[0.05]"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigation("next")}
              disabled={navIndex === personas.length - 1}
              className={`p-2.5 rounded-xl border transition-all ${
                navIndex === personas.length - 1
                  ? "border-white/5 text-slate-600 cursor-not-allowed"
                  : "border-white/10 text-slate-300 hover:bg-white/[0.05]"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Profile Summary */}
          <div className="card-dark flex flex-col gap-6 h-fit">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <img
                src={currentPersona?.profile_pic}
                alt={currentPersona?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/30 glow-indigo"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-100">{currentPersona.name}</h2>
                <p className="text-xs text-indigo-400 font-medium mt-1">{currentPersona?.occupation || "Profession"}</p>
              </div>
            </div>

            {/* Demographics Cardlets */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Age</p>
                <p className="text-sm font-semibold text-slate-200">{currentPersona?.age || "N/A"}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Location</p>
                <p className="text-sm font-semibold text-slate-200 truncate">{currentPersona?.location || "N/A"}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 col-span-2">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Industry</p>
                <p className="text-sm font-semibold text-slate-200">{currentPersona?.industry || "N/A"}</p>
              </div>
            </div>

            {/* Quick Details */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-sm">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Education</span>
                <p className="text-slate-300 font-medium leading-relaxed">{currentPersona?.background?.education || "N/A"}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Work Environment</span>
                <p className="text-slate-300 font-medium leading-relaxed">{currentPersona?.background?.work_environment || "N/A"}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Income Bracket</span>
                <p className="text-slate-300 font-medium leading-relaxed">{currentPersona?.background?.income || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Deep Behavioral Insights */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Goals & Channels Card */}
            <div className="card-dark grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
                  Core Goals & Objectives
                </h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <p className="text-xs font-semibold text-indigo-400 mb-1">Primary Focus</p>
                    <p className="text-slate-300 leading-relaxed">{currentPersona?.professional_goal?.primary_goal}</p>
                  </div>
                  {currentPersona?.professional_goal?.secondary_goal && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-500 mb-1">Secondary Focus</p>
                      <p className="text-slate-400 leading-relaxed">{currentPersona?.professional_goal?.secondary_goal}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-violet-500" />
                  Communication Channels
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentPersona?.communication_channel?.map((channel, cid) => (
                    <span
                      key={cid}
                      className="px-3.5 py-2 bg-indigo-500/10 border border-indigo-500/25 rounded-xl text-xs font-semibold text-indigo-300"
                    >
                      {channel}
                    </span>
                  ))}
                </div>

                <h3 className="text-base font-bold text-slate-100 mt-6 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500" />
                  Personal Interests
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {currentPersona?.hobbies?.personal_interests || "N/A"}
                </p>
              </div>
            </div>

            {/* Pain Points */}
            <div className="card-dark">
              <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-rose-500" />
                Pain Points & Obstacles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPersona?.pain_points?.map((point, index) => (
                  <div key={index} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <span className="text-xs font-bold text-rose-400 block mb-1">
                      {index + 1}. {point?.title}
                    </span>
                    <p className="text-slate-400 text-xs leading-relaxed">{point?.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Usecase & Preferred Features */}
            <div className="card-dark grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
                  Why they'll use {details?.brandName}?
                </h3>
                <div className="flex flex-col gap-3">
                  {currentPersona?.usecase_product?.map((point, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold text-slate-200 mb-0.5">
                        {index + 1}. {point?.title}
                      </p>
                      <p className="text-slate-450 text-xs leading-relaxed">{point?.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-violet-500" />
                  Key Features They'll Value
                </h3>
                <div className="flex flex-col gap-3">
                  {currentPersona?.features_needed?.map((point, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold text-slate-200 mb-0.5">
                        {index + 1}. {point?.feature}
                      </p>
                      <p className="text-slate-450 text-xs leading-relaxed">{point?.description}</p>
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
