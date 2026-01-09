import { useEffect, useState } from "react";
import API from "../services/api";
import PurchaseOrderModal from "./PurchaseOrderModal";
import InfoModal from "./InfoModal";

export default function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [infoOpen, setInfoOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await API.get("/admin/purchase-orders");
    setOrders(res.data);
  };

  const generateOrders = async () => {
    const res = await API.post("/admin/purchase-orders/generate");
    const newOrders = res.data || [];

    if (newOrders.length > 0) {
      // ✅ append new orders only
      setOrders((prev) => {
        const existingIds = new Set(prev.map((o) => o.id));
        const uniqueNew = newOrders.filter(
          (o) => !existingIds.has(o.id)
        );
        return [...prev, ...uniqueNew];
      });
    }

    // ✅ MESSAGE LOGIC (EXACTLY AS REQUIRED)
    if (orders.length === 0 && newOrders.length === 0) {
      setInfoMessage(
        "All products are sufficiently stocked. No purchase orders required."
      );
    } else {
      setInfoMessage("Purchase orders generated successfully.");
    }

    setInfoOpen(true);
  };

  return (
    <>
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-card">
            <div className="empty-icon">🛒</div>
            <h2>No Purchase Orders Found</h2>
            <p>Run auto-replenishment to generate orders.</p>
            <button className="primary-btn" onClick={generateOrders} id ="empty-btn">
              Check Auto-Replenishment
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="inventory-header">
            <h1>Purchase Orders</h1>
            <button className="primary-btn" onClick={generateOrders}>
              Check Auto-Replenishment
            </button>
          </div>

          <div className="card-grid">
            {orders.map((o) => (
              <div key={o.id} className="order-card">
                <h3>{o.productName}</h3>
                <p><strong>Current Stock:</strong> {o.currentStock}</p>
                <p><strong>Reorder Qty:</strong> {o.reorderQuantity}</p>
                <span className="status critical">CRITICAL</span>

                <button
                  className="primary-btn"
                  onClick={() => setSelectedOrder(o)}
                >
                  View Order
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedOrder && (
        <PurchaseOrderModal
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
          refresh={loadOrders}
        />
      )}

      <InfoModal
        open={infoOpen}
        message={infoMessage}
        onClose={() => setInfoOpen(false)}
      />
    </>
  );
}
