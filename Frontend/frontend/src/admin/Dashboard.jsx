import { useEffect, useState } from "react";
import API from "../services/api";
import useCountUp from "../hooks/useCountUp";
import DashboardSkeleton from "./DashboardSkeleton";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
  setTimeout(async () => {
    const res = await API.get("/admin/dashboard");
    setStats(res.data);
  }, 1000);
};

  /* =========================
     ALWAYS CALL HOOKS
  ========================= */
  const totalProducts = useCountUp(stats?.totalProducts ?? 0);
  const lowStock = useCountUp(stats?.lowStockCount ?? 0);
  const sales = useCountUp(stats?.salesLast7Days ?? 0);
  const pending = useCountUp(stats?.pendingOrders ?? 0);

  /* =========================
     LOADING STATE (UI ONLY)
  ========================= */
  if (!stats) {
    return (
      <div className="dashboard-root page-wrapper">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Overview of inventory health and activity</p>
        </div>

        <DashboardSkeleton />
      </div>
    );
  }

  /* =========================
     INSIGHT LOGIC
  ========================= */
  const insight =
    stats.lowStockCount > 0
      ? {
          type: "warning",
          title: "Attention needed",
          message: `${stats.lowStockCount} product(s) are running low on stock`,
        }
      : stats.pendingOrders > 0
      ? {
          type: "info",
          title: "Pending actions",
          message: `${stats.pendingOrders} purchase order(s) awaiting processing`,
        }
      : {
          type: "success",
          title: "All systems healthy",
          message: "Inventory levels and operations are running smoothly",
        };

  /* =========================
     DASHBOARD UI
  ========================= */
  return (
    <div className="dashboard-root page-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of inventory health and activity</p>
      </div>

      <div className={`insight-strip ${insight.type}`}>
        <div className="insight-content">
          <h3>{insight.title}</h3>
          <p>{insight.message}</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="stat-card blue">
          <span>Total Products</span>
          <strong>{totalProducts}</strong>
        </div>

        <div className="stat-card orange">
          <span>Low Stock</span>
          <strong>{lowStock}</strong>
        </div>

        <div className="stat-card green">
          <span>Sales (7 days)</span>
          <strong>{sales}</strong>
        </div>

        <div className="stat-card purple">
          <span>Pending Orders</span>
          <strong>{pending}</strong>
        </div>
      </div>
    </div>
  );
}
