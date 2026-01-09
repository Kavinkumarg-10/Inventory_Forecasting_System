import { useEffect, useState } from "react";
import API from "../services/api";
import BuyProductModal from "./BuyProductModal";
import TableSkeleton from "../admin/TableSkeleton";

export default function ViewProducts() {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setTimeout(async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  },1000
  )};

  /* 🔄 LOADING STATE */
  if (products === null) {
    return (
      <>
        <div className="inventory-header">
          <h1>Available Products</h1>

          <div className="date-picker">
            <input
              type="date"
              value={purchaseDate}
              disabled
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="5">
                  <TableSkeleton rows={10} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
  /* 🟡 EMPTY STATE */
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-card">
          <div className="empty-icon">🛒</div>
          <h2>No products found</h2>
          <p>
            There are currently no products available for purchase.
            <br />
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  /* ✅ NORMAL STATE */
  return (
    <>
      <div className="inventory-header">
        <h1>Available Products</h1>

        <div className="date-picker">
          <input
            type="date"
            value={purchaseDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹ {p.unitPrice}</td>
                <td>{p.onHand}</td>
                <td>
                  <button
                    className="primary-btn"
                    disabled={p.onHand <= 0}
                    onClick={() => setSelectedProduct(p)}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <BuyProductModal
          product={selectedProduct}
          purchaseDate={purchaseDate}
          close={() => setSelectedProduct(null)}
          refresh={loadProducts}
        />
      )}
    </>
  );
}
