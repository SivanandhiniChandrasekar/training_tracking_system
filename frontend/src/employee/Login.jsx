import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await API.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      login(res.data.access_token);
      navigate("/employee");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT BRAND PANEL */}
      <div className="login-left">
        <h1>CERITRACK</h1>
        <p>Enterprise Training & Certification Platform</p>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Employee Login</h2>

          {error && <div className="error">{error}</div>}

          <label>Email</label>
          <input
            type="email"
            placeholder="employee@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <span className="hint">
            Authorized employees only
          </span>
        </form>
      </div>
    </div>
  );
}
