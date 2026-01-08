import { NavLink } from "react-router-dom";

export default function CustomerSidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/customer/products" className="menu-item">
        Products
      </NavLink>

      <NavLink to="/customer/purchases" className="menu-item">
        My Purchases
      </NavLink>
    </aside>
  );
}
