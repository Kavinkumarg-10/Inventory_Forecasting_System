import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import API from "../services/api";

export default function AddProductModal({ close, refresh, product }) {
  // 🔒 LOCK SCROLL
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "",
    unitPrice: product?.unitPrice || "",
    onHand: product?.onHand || "",
    reorderPoint: product?.reorderPoint || "",
    reorderQuantity: product?.reorderQuantity || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
      const payload = {
        name: form.name,
        category: form.category,
        unitPrice: Number(form.unitPrice),
        onHand: Number(form.onHand),
        reorderPoint: Number(form.reorderPoint),
        reorderQuantity: Number(form.reorderQuantity),
      };

      if (product) {
        // ✏️ UPDATE
        await API.put(`/products/${product.id}`, payload);
      } else {
        // ➕ CREATE
        await API.post("/products", payload);
      }

      refresh();
      close();
    };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Add New Product</h2>
          <span className="close-btn" onClick={close}>✕</span>
        </div>

        <div className="modal-body">
          <input name="name" placeholder="Product Name *"  value={form.name} onChange={handleChange} />
          <input name="category" placeholder="Category *" value={form.category} onChange={handleChange} />
          <input name="unitPrice" type="number" placeholder="Unit Price *" value={form.unitPrice} onChange={handleChange} />
          <input name="onHand" type="number" placeholder="Available Quantity *"value={form.onHand} onChange={handleChange} />
          <input name="reorderPoint" type="number" placeholder="Reorder Point *" value={form.reorderPoint} onChange={handleChange} />
          <input name="reorderQuantity" type="number" placeholder="Reorder Quantity *" value={form.reorderQuantity} onChange={handleChange} />
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button className="primary-btn" onClick={handleSubmit}>
            {product ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
