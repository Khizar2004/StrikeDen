"use client";

/**
 * Component to display a list of offered classes
 */
export default function ClassesList({ classes, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-6" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <div className="text-center py-8">
          <div className="inline-block animate-spin h-8 w-8 border-2 border-[#E50914] border-t-transparent"></div>
          <p className="mt-4 text-sm" style={{ color: "rgba(237,235,230,0.4)" }}>Loading classes...</p>
        </div>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="p-8 text-center" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" style={{ color: "rgba(237,235,230,0.15)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-sm" style={{ color: "rgba(237,235,230,0.4)" }}>No classes added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#EDEBE6" }}>Current Offered Classes</h3>
      </div>

      <div className="px-6 py-4 space-y-3">
        {classes.map((cls) => (
          <div key={cls._id} className="flex overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(237,235,230,0.06)" }}>
            {cls.image && (
              <div className="w-20 h-20 shrink-0">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold" style={{ color: "#EDEBE6" }}>{cls.title}</h4>
                <div className="flex items-center gap-1">
                  <a
                    href={`/admin/classes/${cls._id}`}
                    className="p-1.5 transition-colors"
                    style={{ color: "rgba(237,235,230,0.35)" }}
                    aria-label="Edit class"
                    onMouseEnter={(e) => e.currentTarget.style.color = "#F8A348"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.35)"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => onDelete(cls._id)}
                    className="p-1.5 transition-colors"
                    style={{ color: "rgba(237,235,230,0.35)" }}
                    aria-label="Delete class"
                    onMouseEnter={(e) => e.currentTarget.style.color = "#E50914"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.35)"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-xs truncate max-w-sm mt-1" style={{ color: "rgba(237,235,230,0.4)" }}>
                {cls.shortDescription || 'No description provided'}
              </p>

              {cls.pricing && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cls.pricing.walkIn > 0 && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(237,235,230,0.05)", color: "rgba(237,235,230,0.5)" }}>
                      Walk-in: ₨{cls.pricing.walkIn.toLocaleString()}
                    </span>
                  )}
                  {cls.pricing.weekly > 0 && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(237,235,230,0.05)", color: "rgba(237,235,230,0.5)" }}>
                      Weekly: ₨{cls.pricing.weekly.toLocaleString()}
                    </span>
                  )}
                  {cls.pricing.monthly > 0 && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(237,235,230,0.05)", color: "rgba(237,235,230,0.5)" }}>
                      Monthly: ₨{cls.pricing.monthly.toLocaleString()}
                    </span>
                  )}
                  {cls.pricing.annual > 0 && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(237,235,230,0.05)", color: "rgba(237,235,230,0.5)" }}>
                      Annual: ₨{cls.pricing.annual.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
