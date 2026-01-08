import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function PurchaseOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const res = await API.get(`/admin/purchase-orders/${id}`);
    setOrder(res.data);
  };

  const completeOrder = async () => {
    await API.post(`/admin/purchase-orders/${id}/complete`);
    navigate("/admin/purchase-orders");
  };

  if (!order) return null;

  return (
    <>
      <h1>Purchase Order Details</h1>

      <div className="details-card">
        <p><strong>Product:</strong> {order.productName}</p>
        <p><strong>Current Stock:</strong> {order.currentStock}</p>
        <p><strong>Reorder Quantity:</strong> {order.reorderQuantity}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Created Date:</strong> {order.createdDate}</p>

        <button className="primary-btn" onClick={completeOrder}>
          Purchase Now
        </button>

        <button className="secondary-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </>
  );
}
