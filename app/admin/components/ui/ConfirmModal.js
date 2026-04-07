"use client";

/**
 * Confirmation modal for user actions requiring confirmation
 */
export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="max-w-md w-full p-8" style={{ background: "#141414", border: "1px solid rgba(237,235,230,0.06)" }}>
        <h3 className="text-lg font-bold uppercase tracking-wide mb-4" style={{ color: "#EDEBE6" }}>{title}</h3>
        <p className="mb-8 text-sm" style={{ color: "rgba(237,235,230,0.5)" }}>{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
            style={{ color: "rgba(237,235,230,0.5)", border: "1px solid rgba(237,235,230,0.1)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#EDEBE6"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,235,230,0.5)"}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
            style={{ background: "#E50914", color: "#FFFFFF" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
