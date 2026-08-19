import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Toast from "./Toast";

function Navbar({ searchText, handleSearch }) {
  const { user, isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  function handleLogout() {
    const result = logout();

    if (result.success) {
      setToast({
        message: result.message,

        type: "success",
      });

      setTimeout(function () {
        navigate("/");
      }, 1000);
    }
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        GreenCart
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        <a href="/#categories">Categories</a>

        <a href="/#products">Products</a>
      </nav>

      <div className="nav-actions">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleSearch}
        />

        {isLoggedIn ? (
          <>
            <span className="user-name">Hi, {user.name}</span>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}

        <Link to="/cart" className="cart-link">
          Cart
        </Link>
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
    </header>
  );
}

export default Navbar;
