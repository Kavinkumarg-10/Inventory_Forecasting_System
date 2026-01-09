import { useEffect, useState } from "react";
import API from "../services/api";
import TableSkeleton from "./TableSkeleton";

export default function Forecasting() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadForecast();
  }, []);

  const loadForecast = async () => {
    setTimeout(async () => {
    const res = await API.get("/admin/forecast");
    setData(res.data);
  }, 1000);
};  

  /* 🔄 LOADING */
  if (data === null) {
  return (
    <>
      <h1 id="forecasting-header">Demand Forecast (Last 7 Days)</h1>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock</th>
              <th>Avg Daily Demand</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Suggested Reorder</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="6">
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
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-card">
          <div className="empty-icon">📦</div>
          <h2>No Products Available</h2>
          <p>Add products to inventory to see forecasting data.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 id="forecasting-header">Demand Forecast (Last 7 Days)</h1>
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock</th>
              <th>Avg Daily Demand</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Suggested Reorder</th>
            </tr>
          </thead>

          <tbody>
            {data.map((f, i) => (
              <tr key={i}>
                <td>{f.productName}</td>
                <td>{f.onHand}</td>
                <td>{f.avgDailyDemand.toFixed(2)}</td>
                <td>
                  {typeof f.daysToStockOut === "number"
                    ? f.daysToStockOut.toFixed(2)
                    : "-"}
                </td>
                <td>
                  <span className={`status ${f.status.toLowerCase()}`}>
                    {f.status}
                  </span>
                </td>
                <td>{f.suggestedReorderQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
