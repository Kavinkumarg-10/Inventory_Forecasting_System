import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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
    alert(err.response?.data || "Customer already exists");
    // ❌ DO NOT navigate anywhere
  }
};



  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Customer Signup</h2>

        <input
          type="text"
          placeholder="Full Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email *" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Create Account</button>

        <p>
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>
    </div>
  );
}
