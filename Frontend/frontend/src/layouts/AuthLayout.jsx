import "../styles/auth-premium.css";
import logo from "../assets/logo.png";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-root page-enter">
      <div className="auth-card">
        <div className="auth-brand">
          <img src={logo} alt="Inventra" />
          <span>Inventra</span>
        </div>

        <h1 className="auth-title">{title}</h1>
        <p className="auth-sub">{subtitle}</p>

        {children}
      </div>
    </div>
  );
}
