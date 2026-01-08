import { Link } from "react-router-dom";
import "../styles/landing.css";
import useReveal from "../hooks/useReveal.js";
import logo from "../assets/logo.png";



export default function Landing() {
  const featuresRef = useReveal();
  const processRef = useReveal();
  return (
    <div className="landing-root page-enter">
      {/* NAVBAR */}
      <header className="landing-navbar">
        <div className="brand">
          <div className="brand-icon"><img src={logo} alt="Inventra logo" /></div>
          {/* <div className="brand-icon">📦</div> */}
          <span>Inventory Forecasting System</span>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Smart Inventory.</span>
            <span>Zero Stockouts.</span>
          </h1>

          <p className="hero-sub">
            Predict demand, monitor inventory in real time, and automate purchase
            orders — before stock runs out.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary large">
              Start Free
            </Link>
            <Link to="/login" className="btn-outline large">
              Admin Login
            </Link>
          </div>
        </div>
      </section>



      {/* FEATURES */}
      <section className="features reveal" ref={featuresRef}>
        <div className="feature-card">
          <h3>📦 Real-Time Inventory</h3>
          <p>
            Track products, stock levels, and categories instantly across
            locations.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Demand Forecasting</h3>
          <p>
            Forecast product demand using last 7 days of real purchase data.
          </p>
        </div>

        <div className="feature-card">
          <h3>⚠️ Low Stock Alerts</h3>
          <p>
            Get notified before inventory reaches critical stock levels.
          </p>
        </div>

        <div className="feature-card">
          <h3>🛒 Auto Purchase Orders</h3>
          <p>
            Automatically generate purchase orders and update inventory.
          </p>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="process reveal" ref={processRef}>
      
        <h2>How It Works</h2>

        <div className="process-steps">
          <div className="step">
            <span>01</span>
            <h4>Track Inventory</h4>
            <p>Monitor stock levels in real time.</p>
          </div>

          <div className="step">
            <span>02</span>
            <h4>Forecast Demand</h4>
            <p>Analyze recent sales to predict future needs.</p>
          </div>

          <div className="step">
            <span>03</span>
            <h4>Auto Replenish</h4>
            <p>Generate purchase orders automatically.</p>
          </div>

          <div className="step">
            <span>04</span>
            <h4>Purchase & Update</h4>
            <p>Inventory updates instantly after purchase.</p>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="landing-footer">
        © 2025 Inventory Forecasting System · Enterprise Edition
      </footer>
    </div>
  );
}
