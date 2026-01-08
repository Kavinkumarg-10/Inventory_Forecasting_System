import { Outlet,useLocation} from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/dashboard.css";

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <Topbar />

      <div className="app-body">
        <Sidebar />

        <main className="content-area">
            <div key={location.pathname} className="page-wrapper">
              <Outlet />
            </div>
          </main>

      </div>
    </div>
  );
}

