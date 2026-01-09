import { useEffect, useState } from "react";
import API from "../services/api";
import TableSkeleton from "../admin/TableSkeleton";

export default function MyPurchases() {
  const [purchases, setPurchases] = useState(null);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    setTimeout(async () => {
    try {
      const res = await API.get("/purchases");
      setPurchases(res.data);
    } catch (err) {
      setPurchases([]);
    }
  },1000
)};

  /* 🔄 LOADING STATE */
  if (purchases === null) {
    return (
      <>
        <h1 id="myPurchase">My Purchases</h1>

        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Purchased Date</th>
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
  if (purchases.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-card">
          <div className="empty-icon">🛒</div>
          <h2>No purchases found</h2>
          <p>
            You haven’t purchased any products yet.
            <br />
            Once you buy a product, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  /* ✅ NORMAL TABLE */
  return (
    <>
      <h1 id="myPurchase">My Purchases</h1>
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Purchased Date</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((p) => (
              <tr key={p.id}>
                <td>{p.productName}</td>
                <td>{p.category}</td>
                <td>{p.quantity}</td>
                <td>₹ {p.totalPrice}</td>
                <td>{p.purchaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
