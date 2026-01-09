import { Outlet,useLocation} from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import CustomerTopbar from "./CustomerTopbar";
import "../styles/dashboard.css";

export default function CustomerLayout() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <CustomerTopbar />

      <div className="app-body">
        <CustomerSidebar />

        <main className="content-area">
          <div key={location.pathname} className="page-wrapper">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

