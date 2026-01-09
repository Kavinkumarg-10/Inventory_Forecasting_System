import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", { email, password });
      const role = response.data.role;
      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/customer/products");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your inventory intelligently."
    >
      <div className="auth-form">
        <div className="floating-field">
            <input
              type="email"
              required
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email address</label>
          </div>
        <div className="floating-field">
        <input
          type="password"
          required
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
        </div>

        <button className="btn-primary large" onClick={handleLogin}>
          Login
        </button>
      </div>

      <p className="auth-footer">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
