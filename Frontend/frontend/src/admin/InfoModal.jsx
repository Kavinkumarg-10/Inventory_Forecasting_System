import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function InfoModal({ open, message, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-card info-modal">
        <h3>Information</h3>
        <p>{message}</p>

        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
