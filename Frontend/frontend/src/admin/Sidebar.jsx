import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/inventory"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Inventory
      </NavLink>

      <NavLink
        to="/admin/forecasting"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Forecasting
      </NavLink>

      <NavLink
        to="/admin/purchase-orders"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Purchase Orders
      </NavLink>
    </aside>
  );
}
