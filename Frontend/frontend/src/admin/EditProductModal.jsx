import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import API from "../services/api";

export default function EditProductModal({ product, close, refresh }) {

  // 🔒 lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const [form, setForm] = useState({
    name: product.name,
    category: product.category,
    unitPrice: product.unitPrice,
    onHand: product.onHand,
    reorderPoint: product.reorderPoint,
    reorderQuantity: product.reorderQuantity,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await API.put(`/products/${product.id}`, {
      ...form,
      unitPrice: Number(form.unitPrice),
      onHand: Number(form.onHand),               // ✅ REPLACE quantity
      reorderPoint: Number(form.reorderPoint),
      reorderQuantity: Number(form.reorderQuantity),
    });

    refresh();
    close();
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Edit Product</h2>
          <span className="close-btn" onClick={close}>✕</span>
        </div>

        <div className="modal-body">
          <input value={form.name} disabled />
          <input name="category" value={form.category} onChange={handleChange} />
          <input name="unitPrice" type="number" value={form.unitPrice} onChange={handleChange} />
          <input name="onHand" type="number" value={form.onHand} onChange={handleChange} />
          <input name="reorderPoint" type="number" value={form.reorderPoint} onChange={handleChange} />
          <input name="reorderQuantity" type="number" value={form.reorderQuantity} onChange={handleChange} />
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button className="primary-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
