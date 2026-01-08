import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await API.post("/auth/login", {
      email,
      password,
    });

    const role = response.data.role;
    localStorage.setItem("role", response.data.role);
    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/customer/products");
    }
  } catch (err) {
    if (err.response?.status === 400 || err.response?.status === 401) {
      alert("Invalid email or password");
    } else {
      alert("Something went wrong");
    }
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

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

        <button onClick={handleLogin}>Login</button>

        <p>
          New customer?
          <span onClick={() => navigate("/signup")}> Sign up</span>
        </p>
      </div>
    </div>
  );
}
