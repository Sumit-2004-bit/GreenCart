import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Toast from "../components/Toast";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");

      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");

      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    setLoading(true);

    const result = register(name.trim(), email.trim(), password);

    if (!result.success) {
      setError(result.message);

      setLoading(false);

      return;
    }

    setToast({
      message: "Account created successfully!",

      type: "success",
    });

    setLoading(false);

    setTimeout(function () {
      navigate("/");
    }, 1000);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-eyebrow">Get started</p>

          <h1>Create your account</h1>

          <p>Join GreenCart and start shopping today.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={function (event) {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function (event) {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <input
              id="register-password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={function (event) {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={function (event) {
                setConfirmPassword(event.target.value);
              }}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>

          <Link to="/login">Login</Link>
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

export default Register;
