import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); // 🔐 backend logout
    } catch (err) {
      // ignore error (session might already be expired)
    } finally {
      localStorage.clear();           // clear role
      window.location.href = "/";     // hard redirect
    }
  };
  return (
    <header className="topbar">
      <div className="topbar-content" style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="logo">
          {/* <div className="logo-box">📦</div> */}
          <div className="logo-box"><img src={logo} alt="Inventra logo" /></div>
          <span>Inventory Forecasting System</span>
        </div>
        <button className="primary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
