"use client";

/**
 * Component to display a list of trainers with delete functionality
 */
export default function TrainersList({ trainers, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-6" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <div className="text-center py-8">
          <div className="inline-block animate-spin h-8 w-8 border-2 border-[#E50914] border-t-transparent"></div>
          <p className="mt-4 text-sm" style={{ color: "rgba(237,235,230,0.4)" }}>Loading trainers...</p>
        </div>
      </div>
    );
  }

  if (!trainers || trainers.length === 0) {
    return (
      <div className="p-8 text-center" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" style={{ color: "rgba(237,235,230,0.15)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-sm" style={{ color: "rgba(237,235,230,0.4)" }}>No trainers added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
      <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#EDEBE6" }}>Trainer List</h3>
      </div>

      <ul>
        {trainers.map((trainer, idx) => (
          <li key={trainer._id} className="p-6" style={{ borderBottom: idx < trainers.length - 1 ? "1px solid rgba(237,235,230,0.06)" : "none" }}>
            <div className="flex items-start">
              {trainer.image ? (
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-14 w-14 object-cover mr-4 flex-shrink-0"
                />
              ) : (
                <div className="h-14 w-14 flex items-center justify-center mr-4 flex-shrink-0" style={{ background: "#1A1A1A" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" style={{ color: "rgba(237,235,230,0.2)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#EDEBE6" }}>{trainer.name}</h4>

                {/* Specializations */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Array.isArray(trainer.specialization) ? (
                    trainer.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: "rgba(229,9,20,0.15)", color: "#E50914" }}
                      >
                        {spec}
                      </span>
                    ))
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(229,9,20,0.15)", color: "#E50914" }}>
                      {trainer.specialization}
                    </span>
                  )}
                </div>

                {trainer.experience && (
                  <p className="mt-2 text-xs" style={{ color: "rgba(237,235,230,0.4)" }}>
                    <span className="font-bold" style={{ color: "rgba(237,235,230,0.6)" }}>Experience:</span> {trainer.experience}
                  </p>
                )}

                {trainer.certifications && trainer.certifications.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {trainer.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: "rgba(237,235,230,0.05)", color: "rgba(237,235,230,0.5)" }}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                )}

                {trainer.bio && (
                  <p className="mt-2 text-xs line-clamp-2" style={{ color: "rgba(237,235,230,0.4)" }}>
                    {trainer.bio}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0 ml-4 flex gap-1">
                <a
                  href={`/admin/trainers/${trainer._id}`}
                  className="p-2 transition-colors"
                  style={{ color: "rgba(237,235,230,0.35)" }}
                  aria-label="Edit trainer"
                  onMouseEnter={(e) => e.currentTarget.style.color = "#F8A348"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.35)"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </a>
                <button
                  onClick={() => onDelete(trainer._id)}
                  className="p-2 transition-colors"
                  style={{ color: "rgba(237,235,230,0.35)" }}
                  aria-label="Delete trainer"
                  onMouseEnter={(e) => e.currentTarget.style.color = "#E50914"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.35)"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
