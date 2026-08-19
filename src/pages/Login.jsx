import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Toast from "../components/Toast";

function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");

      return;
    }

    setLoading(true);

    const result = login(email.trim(), password);

    if (!result.success) {
      setError(result.message);

      setLoading(false);

      return;
    }

    setToast({
      message: "Welcome back! Login successful.",

      type: "success",
    });

    setLoading(false);

    setTimeout(function () {
      const from = location.state?.from?.pathname || "/";

      navigate(from, {
        replace: true,
      });
    }, 1000);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-eyebrow">Welcome back</p>

          <h1>Login to GreenCart</h1>

          <p>Continue shopping with your GreenCart account.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function (event) {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={function (event) {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>

          <Link to="/register">Create an account</Link>
        </div>
      </div>

      {/* TOAST */}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={function () {
            setToast(null);
          }}
        />
      )}
    </main>
  );
}

export default Login;
