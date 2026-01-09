import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import API from "../services/api";
import AuthLayout from "../layouts/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[0-9]/.test(password);

  const handleSignup = async () => {
  // 🔐 frontend validation
  if (!name.trim()) {
    alert("Name is required");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!isStrongPassword(password)) {
    alert(
      "Password must be at least 8 characters, include uppercase, lowercase, and number"
    );
    return;
  }

  try {
    await API.post("/auth/signup", {
      name,
      email,
      password,
    });

    alert("Signup successful. Please login.");
    navigate("/login"); // ✅ correct
  } catch (err) {
    alert(err.response?.data || "User already exists");
    // ❌ DO NOT navigate anywhere
  }
};



 return (
    <AuthLayout
      title="Create your account"
      subtitle="Start forecasting inventory like a pro."
    >
      <div className="auth-form">
        <div className="floating-field">
        <input
          type="text"
          required
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Full name</label>
        </div>

        <div className="floating-field">
          <input
            type="email"
            required
            placeholder=" "
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

        <button className="btn-primary large" onClick={handleSignup}>
          Signup
        </button>
      </div>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}