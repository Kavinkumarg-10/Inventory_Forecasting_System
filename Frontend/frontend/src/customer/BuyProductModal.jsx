import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import API from "../services/api";

export default function BuyProductModal({
  product,
  purchaseDate,
  close,
  refresh
}) {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(product.unitPrice);
  const [loading, setLoading] = useState(false);

  /* 🔒 LOCK BACKGROUND SCROLL */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setTotal(quantity * product.unitPrice);
  }, [quantity, product.unitPrice]);

  const handleBuyNow = async () => {
    try {
      setLoading(true);

      await API.post("/purchases", {
        productId: product.id,
        quantity: quantity,
        purchaseDate: purchaseDate,
      });

      refresh(); // 🔄 reload products
      close();   // ❌ close modal
    } catch (err) {
      alert(err.response?.data || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Buy Product</h2>
          <span className="close-btn" onClick={close}>✕</span>
        </div>

        <div className="modal-body">
          <input value={product.name} disabled />
          <input value={product.category} disabled />
          <input value={`₹ ${product.unitPrice}`} disabled />

          <div className="qty-control">
            <button
              className="qty-btn"
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </button>

            <span className="qty-value">{quantity}</span>

            <button
              className="qty-btn"
              disabled={quantity === product.onHand}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <div className="total-box">
            Total Amount: <strong>₹ {total}</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button
            className="primary-btn"
            onClick={handleBuyNow}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
