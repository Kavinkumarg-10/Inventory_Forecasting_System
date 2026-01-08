import { useEffect } from "react";
import { createPortal } from "react-dom";
import API from "../services/api";

export default function PurchaseOrderModal({ order, close, refresh }) {

  /* 🔒 LOCK BACKGROUND SCROLL */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const purchaseNow = async () => {
    await API.post(`/admin/purchase-orders/${order.id}/complete`);
    refresh();
    close();
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Purchase Order</h2>
          <span className="close-btn" onClick={close}>✕</span>
        </div>

        <div className="modal-body">
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Current Stock:</strong> {order.currentStock}</p>
          <p><strong>Reorder Quantity:</strong> {order.reorderQuantity}</p>

          <span className="status critical">CRITICAL</span>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>
          <button className="primary-btn" onClick={purchaseNow}>
            Purchase Now
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
